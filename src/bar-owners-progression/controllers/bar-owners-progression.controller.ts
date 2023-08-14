import { Controller, Post, Body } from '@nestjs/common';
import { BarOwnersProgressionService } from '../services/bar-owners-progression.service';
import { BarOwnersProgressionDtoConverter } from '../services/bar-owners-progression-dto.converter';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';
import {
  BarOwnersProgressionRequestDto,
  BarOwnersProgressionResponseDto,
} from '../../api/build';

@Controller('v1/bars-owners-progression')
export class BarOwnersProgressionController {
  constructor(
    private readonly barOwnersProgressionService: BarOwnersProgressionService,
    private readonly barOwnersProgressionDtoConverter: BarOwnersProgressionDtoConverter,
  ) {}

  @Post()
  async create(
    @Body() barOwnersProgressionRequestDto: BarOwnersProgressionRequestDto,
  ): Promise<BarOwnersProgressionResponseDto> {
    const barOwnersProgression: BarOwnersProgression =
      await this.barOwnersProgressionService.create(
        this.barOwnersProgressionDtoConverter.toModel(
          barOwnersProgressionRequestDto,
        ),
      );
    return this.barOwnersProgressionDtoConverter.toDto(barOwnersProgression);
  }
}
