import {Controller, Post, Body, Get, Query, Delete, Param} from '@nestjs/common';
import { BarsService } from '../services/bars.service';
import { Bar } from '../models/bar.model';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BarsRequestDto } from '../dtos/bars-request.dto';
import { BarsResponseDto } from '../dtos/bars-response.dto';
import { BarsDtoConverter } from '../services/bars-dto.converter';

@ApiTags('bars')
@Controller('v1/bars')
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

  @ApiOkResponse({
    description: 'The bars records',
    type: BarsResponseDto,
    isArray: true,
  })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'barIndex', type: Number, required: false })
  @Get()
  async findByValue(
    @Query('name') name: string,
    @Query('barIndex') barIndex: number,
  ): Promise<BarsResponseDto[]> {
    const bars: Bar[] = await this.barsService.findByValues(name, barIndex);
    return bars.map((resource) => this.barsDtoConverter.toDto(resource));
  }

  @ApiOkResponse({
    description: 'The bar has been deleted',
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const bar: Bar = { id };
    await this.barsService.remove(bar);
  }
}
