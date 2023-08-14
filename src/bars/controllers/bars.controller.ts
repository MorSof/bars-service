import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BarsService } from '../services/bars.service';
import { Bar } from '../models/bar.model';
import { BarsDtoConverter } from '../services/bars-dto.converter';
import { BarsRequestDto, BarsResponseDto } from '../../api/build';

@Controller('v1/bars')
export class BarsController {
  constructor(
    private readonly barsService: BarsService,
    private readonly barsDtoConverter: BarsDtoConverter,
  ) {}

  @Post()
  async create(
    @Body() barsRequestDto: BarsRequestDto,
  ): Promise<BarsResponseDto> {
    const bar: Bar = await this.barsService.create(
      this.barsDtoConverter.toModel(barsRequestDto),
    );
    return this.barsDtoConverter.toDto(bar);
  }

  @Get()
  async findByValue(
    @Query('name') name: string,
    @Query('barIndex') barIndex: number,
  ): Promise<BarsResponseDto[]> {
    const bars: Bar[] = await this.barsService.findByValues(name, barIndex);
    return bars.map((resource) => this.barsDtoConverter.toDto(resource));
  }
}
