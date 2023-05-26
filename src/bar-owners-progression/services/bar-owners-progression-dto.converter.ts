import { Injectable } from '@nestjs/common';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';
import { BarOwnersProgressionRequestDto } from '../dtos/bar-owners-progression-request.dto';
import { BarOwnersProgressionResponseDto } from '../dtos/bar-owners-progression-response.dto';
import { BarsDtoConverter } from '../../bars/services/bars-dto.converter';

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
      new BarOwnersProgressionResponseDto({
        id,
        barName: model.currentBar.name,
        ownerType,
        ownerId,
        value,
        currentBar: this.barsDtoConverter.toDto(currentBar),
      });
    return dto;
  }
}
