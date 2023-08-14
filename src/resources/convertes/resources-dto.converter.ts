import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceRequestDto, ResourceResponseDto } from '../../api/build';

@Injectable()
export class ResourcesDtoConverter {
  public convertFrom(resourceRequestDto: ResourceRequestDto): Resource {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resourceRequestDto;
    return new Resource({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    });
  }

  public convertTo(resource: Resource): ResourceResponseDto {
    const {
      id,
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resource;
    const resourceResponseDto = new ResourceResponseDto();
    resourceResponseDto.id = id;
    resourceResponseDto.name = name;
    resourceResponseDto.amount = amount;
    resourceResponseDto.type = type;
    resourceResponseDto.receivingProbability = receivingProbability;
    resourceResponseDto.rarenessProbability = rarenessProbability;
    resourceResponseDto.resources = resources;
    resourceResponseDto.extraArgs = extraArgs;
    return resourceResponseDto;
  }
}
