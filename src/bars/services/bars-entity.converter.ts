import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarEntity } from '../entities/bar.entity';

@Injectable()
export class BarsEntityConverter {
  public toModel(barEntity: BarEntity): Bar {
    const {
      id,
      name,
      barIndex,
      maxValue,
      // rewards,
      milestones,
    } = barEntity;
    const bar: Bar = new Bar({
      id,
      name,
      barIndex,
      maxValue,
      // rewards,
      milestones: milestones?.map((milestone) => this.toModel(milestone)),
    });
    return bar;
  }

  public toEntity(bar: Bar): BarEntity {
    const {
      id,
      name,
      barIndex,
      maxValue,
      // rewards,
      milestones,
    } = bar;
    const barEntity: BarEntity = new BarEntity({
      id,
      name,
      barIndex,
      maxValue,
      // rewards,
      milestones: milestones?.map((milestone) => this.toEntity(milestone)),
    });
    return barEntity;
  }
}
