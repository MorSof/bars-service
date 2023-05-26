import { ApiProperty } from '@nestjs/swagger';
import { BarsResponseDto } from '../../bars/dtos/bars-response.dto';

export class BarOwnersProgressionResponseDto {
  @ApiProperty({
    type: 'number',
    description: 'The id of the bar progression',
  })
  id: number;

  @ApiProperty({
    type: 'number',
    description: 'The value the owner filled in the bar',
  })
  value: number;

  @ApiProperty({
    description: 'The bar name',
  })
  barName: string;

  @ApiProperty({
    description: 'The progression owner type',
  })
  ownerType: string;

  @ApiProperty({
    description: 'The progression owner id',
  })
  ownerId: string;

  @ApiProperty({
    type: BarsResponseDto,
    description:
      'The current bar the owner is at, according to his progression',
  })
  currentBar?: BarsResponseDto;

  constructor(partial: Partial<BarOwnersProgressionResponseDto>) {
    Object.assign(this, partial);
  }
}
