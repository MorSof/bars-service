import { Injectable } from '@nestjs/common';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';
import { BarsDtoConverter } from '../../bars/services/bars-dto.converter';
import {
  BarOwnersProgressionRequestDto,
  BarOwnersProgressionResponseDto,
} from '../../api/build';

@Injectable()
export class BarOwnersProgressionDtoConverter {
  constructor(private readonly barsDtoConverter: BarsDtoConverter) {}

  public toModel(dto: BarOwnersProgressionRequestDto): BarOwnersProgression {
    const { barName, ownerType, ownerId } = dto;
    const model: BarOwnersProgression = new BarOwnersProgression({
      barName,
      ownerType,
      ownerId,
    });
    return model;
  }

  public toDto(model: BarOwnersProgression): BarOwnersProgressionResponseDto {
    const { id, ownerType, ownerId, value, currentBar } = model;
    const dto: BarOwnersProgressionResponseDto =
      new BarOwnersProgressionResponseDto();
    dto.id = id;
    dto.barName = model.currentBar.name;
    dto.ownerType = ownerType;
    dto.ownerId = ownerId;
    dto.value = value;
    dto.currentBar = this.barsDtoConverter.toDto(currentBar);
    return dto;
  }
}
