import { ApiProperty } from '@nestjs/swagger';

export class ResourceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'The type of the resource',
  })
  type: string;

  @ApiProperty({
    description: 'The name of the resource',
  })
  name: string;

  @ApiProperty({
    nullable: true,
  })
  amount?: number;

  @ApiProperty({
    nullable: true,
  })
  receivingProbability?: number;

  @ApiProperty({
    nullable: true,
  })
  rarenessProbability?: number;

  @ApiProperty({
    nullable: true,
  })
  extraArgs?: object;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
