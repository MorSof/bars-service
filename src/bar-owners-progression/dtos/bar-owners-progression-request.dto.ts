import { ApiProperty } from '@nestjs/swagger';

export class BarOwnersProgressionRequestDto {
  @ApiProperty({
    description: 'The bar name',
    required: true,
  })
  barName: string;

  @ApiProperty({
    description: 'The progression owner type',
    required: true,
  })
  ownerType: string;

  @ApiProperty({
    description: 'The progression owner id',
    required: true,
  })
  ownerId: string;
}
