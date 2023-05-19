import { Controller, Post, Body } from '@nestjs/common';
import { BarsService } from '../services/bars.service';
import { Bar } from '../models/bar.model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BarsRequestDto } from '../dtos/bars-request.dto';
import { BarsResponseDto } from '../dtos/bars-response.dto';
import { BarsDtoConverter } from '../services/bars-dto.converter';

@ApiTags('bars')
@Controller('bars')
export class BarsController {
  constructor(
    private readonly barsService: BarsService,
    private readonly barsDtoConverter: BarsDtoConverter,
  ) {}

  @ApiOkResponse({
    description: 'The bars record',
    type: BarsResponseDto,
  })
  @Post()
  async create(
    @Body() barsRequestDto: BarsRequestDto,
  ): Promise<BarsResponseDto> {
    const bar: Bar = await this.barsService.create(
      this.barsDtoConverter.toModel(barsRequestDto),
    );
    return this.barsDtoConverter.toDto(bar);
  }
}
