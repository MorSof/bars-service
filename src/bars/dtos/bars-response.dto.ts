import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceResponseDto } from '../../resources/dtos/resource-response.dto';

export class BarsResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The id of the bar',
  })
  id: number;

  @ApiModelProperty({
    description: 'The bar name',
  })
  name: string;

  @ApiModelProperty({
    type: 'number',
    description: 'The bar index',
  })
  barIndex: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The max value to fill the bar',
  })
  maxValue: number;

  @ApiModelProperty({
    isArray: true,
    type: BarsResponseDto,
    description: 'An array of milestones in the bar',
  })
  milestones?: BarsResponseDto[];

  @ApiModelProperty({
    isArray: true,
    type: ResourceResponseDto,
    description: 'An array of rewards for the bar',
  })
  rewards?: ResourceResponseDto[];

  constructor(partial: Partial<BarsResponseDto>) {
    Object.assign(this, partial);
  }
}
