import { Injectable } from '@nestjs/common';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';
import { BarOwnersProgressionEntity } from '../entities/bar-owners-progression.entity';
import { BarsEntityConverter } from '../../bars/services/bars-entity.converter';

@Injectable()
export class BarOwnersProgressionEntityConverter {
  constructor(private readonly barsEntityConverter: BarsEntityConverter) {}

  public toModel(entity: BarOwnersProgressionEntity): BarOwnersProgression {
    const { id, ownerType, ownerId, value, currentBar } = entity;
    const model: BarOwnersProgression = new BarOwnersProgression({
      id,
      ownerType,
      ownerId,
      value,
      currentBar: this.barsEntityConverter.toModel(currentBar),
    });
    return model;
  }

  public toEntity(model: BarOwnersProgression): BarOwnersProgressionEntity {
    const { id, ownerType, ownerId, value, currentBar } = model;
    const entity: BarOwnersProgressionEntity = new BarOwnersProgressionEntity({
      id,
      ownerType,
      ownerId,
      value,
      currentBar: this.barsEntityConverter.toEntity(currentBar),
    });
    return entity;
  }
}
