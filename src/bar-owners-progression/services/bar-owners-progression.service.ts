import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BarOwnersProgressionEntity } from '../../bar-owners-progression/entities/bar-owners-progression.entity';
import { BarOwnersProgressionEntityConverter } from './bar-owners-progression-entity.converter';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';
import { BarsService } from '../../bars/services/bars.service';
import { Bar } from '../../bars/models/bar.model';

@Injectable()
export class BarOwnersProgressionService {
  constructor(
    @InjectRepository(BarOwnersProgressionEntity)
    private readonly repository: Repository<BarOwnersProgressionEntity>,
    private readonly barOwnersProgressionEntityConverter: BarOwnersProgressionEntityConverter,
    private readonly barsService: BarsService,
  ) {}

  async create(
    barOwnersProgression: BarOwnersProgression,
  ): Promise<BarOwnersProgression> {
    const bars: Bar[] = await this.barsService.findByValues(
      barOwnersProgression.barName,
    );
    if (!bars || bars.length == 0) {
      throw new NotFoundException(
        `a bar with name ${barOwnersProgression.barName} was not found`,
      );
    }
    barOwnersProgression.currentBar = bars[0];
    barOwnersProgression.value = 0;
    let entity: BarOwnersProgressionEntity =
      this.barOwnersProgressionEntityConverter.toEntity(barOwnersProgression);
    entity = await this.repository.save(entity);
    return this.barOwnersProgressionEntityConverter.toModel(entity);
  }
}
