import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarsEntityConverter } from './bars-entity.converter';
import { ResourcesService } from '../../resources/services/resources.service';
import { Resource } from '../../resources/models/resource.model';
import { BarEntity } from '../entities/bar.entity';

@Injectable()
export class BarsService {
  constructor(
    @InjectRepository(BarEntity)
    private readonly barsRepository: Repository<BarEntity>,
    private readonly barsEntityConverter: BarsEntityConverter,
    private readonly resourcesService: ResourcesService,
  ) {}

  async create(bar: Bar): Promise<Bar> {
    let barParentEntity: BarEntity = this.barsEntityConverter.toEntity(bar);
    barParentEntity = await this.saveBar(barParentEntity);
    const savedBar: Bar = this.barsEntityConverter.toModel(barParentEntity);
    return savedBar;
  }

  private async saveBar(barParentEntity: BarEntity): Promise<BarEntity> {
    if (barParentEntity.milestones && barParentEntity.milestones.length > 0) {
      const milestoneEntities: BarEntity[] = barParentEntity.milestones;
      await Promise.all(
        milestoneEntities.map((milestone) => this.saveBar(milestone)),
      );
      barParentEntity.milestones = milestoneEntities;
    }
    const savedBarEntity: BarEntity = await this.barsRepository.save(
      barParentEntity,
    );
    return savedBarEntity;
  }
}
