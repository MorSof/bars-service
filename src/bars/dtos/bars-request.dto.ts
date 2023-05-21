import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceRequestDto } from '../../resources/dtos/resource-request.dto';

/**
  Added the MilestoneRequestDto class just for swagger documentation,
  because it didn't allow me to use the BarsRequestDto type in the ApiModelProperty of the milestones,
  because it's not yet declared.
  Also, this object doesn't include the MilestoneRequestDto too, for the same reason.
  Take a look at the BarsRequestDto and see that the type of milestones is BarsRequestDto and not MilestoneRequestDto,
  so a milestone is also a bar that contains milestones
**/
export class MilestoneRequestDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The max value to fill the milestone bar',
    required: true,
    default: 50,
  })
  maxValue: number;

  @ApiModelProperty({
    isArray: true,
    type: ResourceRequestDto,
    description: 'An array of rewards for the bar',
  })
  rewards?: ResourceRequestDto[];
}

export class BarsRequestDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The max value to fill the bar',
    required: true,
    default: 100,
  })
  maxValue: number;

  @ApiModelProperty({
    description: 'The bar name',
    required: true,
  })
  name?: string;

  @ApiModelProperty({
    type: 'number',
    description: 'The bar index',
    required: true,
  })
  barIndex?: number;

  @ApiModelProperty({
    isArray: true,
    type: MilestoneRequestDto,
    description: 'An array of milestones in the bar',
  })
  milestones?: BarsRequestDto[];

  @ApiModelProperty({
    isArray: true,
    type: ResourceRequestDto,
    description: 'An array of rewards for the bar',
  })
  rewards?: ResourceRequestDto[];
}
