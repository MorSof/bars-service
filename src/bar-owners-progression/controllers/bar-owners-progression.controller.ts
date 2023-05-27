import { Controller, Post, Body } from '@nestjs/common';
import { BarOwnersProgressionService } from '../services/bar-owners-progression.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BarOwnersProgressionDtoConverter } from '../services/bar-owners-progression-dto.converter';
import { BarOwnersProgressionResponseDto } from '../dtos/bar-owners-progression-response.dto';
import { BarOwnersProgressionRequestDto } from '../dtos/bar-owners-progression-request.dto';
import { BarOwnersProgression } from '../models/bar-owners-progression.model';

@ApiTags('bar owners progression')
@Controller('v1/bars-owners-progression')
export class BarOwnersProgressionController {
  constructor(
    private readonly barOwnersProgressionService: BarOwnersProgressionService,
    private readonly barOwnersProgressionDtoConverter: BarOwnersProgressionDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The bar owners progression record',
    type: BarOwnersProgressionResponseDto,
  })
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
