import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { ResourcesDtoConverter } from '../../resources/convertes/resources-dto.converter';
import { BarsRequestDto, BarsResponseDto } from '../../api/build';

@Injectable()
export class BarsDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public toModel(barsRequestDto: BarsRequestDto): Bar {
    const { name, barIndex, maxValue, rewards, milestones } = barsRequestDto;
    return new Bar({
      name,
      barIndex,
      maxValue,
      rewards: rewards?.map((reward) =>
        this.resourcesDtoConverter.convertFrom(reward),
      ),
      milestones: milestones?.map((milestone) => this.toModel(milestone)),
    });
  }

  public toDto(bar: Bar): BarsResponseDto {
    const { id, name, barIndex, maxValue, rewards, milestones } = bar;
    const barResponseDto = new BarsResponseDto();
    barResponseDto.id = id;
    barResponseDto.name = name;
    barResponseDto.barIndex = barIndex;
    barResponseDto.maxValue = maxValue;
    barResponseDto.rewards = rewards?.map((reward) =>
      this.resourcesDtoConverter.convertTo(reward),
    );
    barResponseDto.milestones = milestones?.map((milestone) =>
      this.toDto(milestone),
    );
    return barResponseDto;
  }
}
