import { ApiProperty } from '@nestjs/swagger';

/**
 Added the InnerResourceRequestDto class just for swagger documentation,
 because it didn't allow me to use the BaseResourceRequestDto type in the ApiProperty of the inner resources,
 because it's not yet declared.
 Also, this object doesn't include the InnerResourceRequestDto too, for the same reason.
 Take a look at the BaseResourceRequestDto and see that the type of inner resources is BaseResourceRequestDto and not InnerResourceRequestDto,
 so an inner resource is also a resource that contains inner resources
 **/
export class InnerResourceRequestDto {
  readonly ownerId?: string;

  readonly ownerType?: string;

  readonly groupId?: string;

  @ApiProperty({
    default: 'currency',
  })
  readonly type: string;

  @ApiProperty({
    default: 'coins',
  })
  readonly name: string;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    default: null,
  })
  readonly amount?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 0.5,
  })
  readonly rarenessProbability: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}

export class ResourceRequestDto {
  @ApiProperty({
    description: 'The type of the resource',
    default: 'wrapper',
  })
  readonly type: string;

  @ApiProperty({
    description: 'The name of the resource',
    default: 'chest',
  })
  readonly name: string;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    default: null,
  })
  readonly amount?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 0.5,
  })
  readonly rarenessProbability: number;

  @ApiProperty({
    isArray: true,
    type: InnerResourceRequestDto,
    description: 'An array of resources in the resource',
    required: false,
  })
  resources?: InnerResourceRequestDto[];

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}
