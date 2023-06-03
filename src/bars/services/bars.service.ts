import { IsNull, TreeRepository } from 'typeorm';

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
    await this.validateBarDoesNotExists(barParentEntity);
    barParentEntity = await this.saveBars(barParentEntity);
    bar = this.barsEntityConverter.toModel(barParentEntity);
    await this.resourcesService.createBarResources(bar);
    return bar;
  }

  async remove(bar: Bar): Promise<void> {
    // omris
    //todo: delete all resources of bar
    const barParentEntity: BarEntity = this.barsEntityConverter.toEntity(bar);
    const barExists = await this.isBarExists(barParentEntity);
    if (barExists) {
      //Perform the deletion logic here
      await this.barsRepository.remove(barParentEntity);
    } else {
      ///todo: ask if we have our own 'error' class
      const error = new Error('Resource not found');
      (error as any).statusCode = 404;
      throw error;
    }
  }

  async findByValues(name?: string, barIndex?: number): Promise<Bar[]> {
    const entities = await this.barsRepository.find({
      where: {
        name,
        barIndex,
        parent: IsNull(),
      },
      relations: ['milestones'],
      order: {
        barIndex: 'ASC',
      },
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
          return this.saveBars(milestone);
        }),
      );
      barParentEntity.milestones = milestoneEntities;
    }
    return await this.barsRepository.save(barParentEntity);
  }

  async isBarExists(barParentEntity: BarEntity): Promise<boolean> {
    //todo: use isexist in validate
    // omris
    const entity = await this.barsRepository.findOneBy({
      name: barParentEntity.name,
      barIndex: barParentEntity.barIndex,
      parent: IsNull(),
    });
    if (entity) {
      return true;
    }
    return false;
  }
  private async validateBarDoesNotExists(barParentEntity: BarEntity) {
    const entity = await this.barsRepository.findOneBy({
      name: barParentEntity.name,
      barIndex: barParentEntity.barIndex,
      parent: IsNull(),
    });
    if (entity) {
      throw new ConflictException(
        `bar with name ${barParentEntity.name} and barIndex ${barParentEntity.barIndex} already exists`,
      );
    }
  }
}
