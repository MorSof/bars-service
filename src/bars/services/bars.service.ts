import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarsEntityConverter } from './bars-entity.converter';
import { ResourcesService } from '../../resources/services/resources.service';
import { BarEntity } from '../entities/bar.entity';

@Injectable()
export class BarsService {
  constructor(
    @InjectRepository(BarEntity)
    private readonly barsRepository: TreeRepository<BarEntity>,
    private readonly barsEntityConverter: BarsEntityConverter,
    private readonly resourcesService: ResourcesService,
  ) {}

  async create(bar: Bar): Promise<Bar> {
    let barParentEntity: BarEntity = this.barsEntityConverter.toEntity(bar);
    barParentEntity = await this.saveBars(barParentEntity);
    bar = this.barsEntityConverter.toModel(barParentEntity);
    await this.resourcesService.createBarResources(bar);
    return bar;
  }

  async findByValues(name: string, barIndex: number): Promise<Bar[]> {
    const entities = await this.barsRepository.find({
      where: {
        name,
        barIndex,
      },
      relations: ['milestones'],
    });
    if (!entities) {
      throw new NotFoundException(`bar was not found`);
    }

    const bars: Bar[] = [];
    for (const entity of entities) {
      await this.loadNestedMilestones(entity);
      bars.push(
        await this.resourcesService.loadBarsResources(
          this.barsEntityConverter.toModel(entity),
        ),
      );
    }
    return bars;
  }

  private async loadNestedMilestones(bar: BarEntity): Promise<void> {
    if (bar.milestones && bar.milestones.length > 0) {
      for (const milestone of bar.milestones) {
        const nestedMilestone = await this.barsRepository.findOne({
          where: {
            id: milestone.id,
          },
          relations: ['milestones'],
        });
        if (nestedMilestone) {
          milestone.milestones = nestedMilestone.milestones;
          await this.loadNestedMilestones(milestone);
        }
      }
    }
  }

  private async saveBars(barParentEntity: BarEntity): Promise<BarEntity> {
    if (barParentEntity.milestones && barParentEntity.milestones.length > 0) {
      const milestoneEntities: BarEntity[] = barParentEntity.milestones;
      await Promise.all(
        milestoneEntities.map(async (milestone) => {
          await this.validateBarDoesNotExists(milestone);
          return this.saveBars(milestone);
        }),
      );
      barParentEntity.milestones = milestoneEntities;
    }
    await this.validateBarDoesNotExists(barParentEntity);
    return await this.barsRepository.save(barParentEntity);
  }

  private async validateBarDoesNotExists(barParentEntity: BarEntity) {
    const entity = await this.barsRepository.findOneBy({
      name: barParentEntity.name,
      barIndex: barParentEntity.barIndex,
    });
    if (entity) {
      throw new ConflictException(
        `bar with name ${barParentEntity.name} and barIndex ${barParentEntity.barIndex} already exists`,
      );
    }
  }
}
