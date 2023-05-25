import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourceRequestDto } from '../dtos/resource-request.dto';
import { ResourceResponseDto } from '../dtos/resource-response.dto';

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
    return new ResourceResponseDto({
      id,
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    });
  }
}
