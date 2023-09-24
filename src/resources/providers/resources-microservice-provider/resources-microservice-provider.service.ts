import { Inject, Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';
import {
  BaseResourceRequestDto,
  BaseResourceRequestDtoOwnerTypeEnum,
  DefaultApi,
} from '@morsof/resources-service-api';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  constructor(
    @Inject('ResourcesApi') private readonly resourcesApi: DefaultApi,
  ) {
    super();
  }

  async createResources(resources: Resource[]): Promise<Resource[]> {
    const body: BaseResourceRequestDto[] = resources.map((resource) => {
      const {
        ownerId,
        ownerType,
        type,
        name,
        amount,
        groupId,
        receivingProbability,
        rarenessProbability,
        resources,
        extraArgs,
      } = resource;
      const baseResourceRequestDto = new BaseResourceRequestDto();
      baseResourceRequestDto.ownerId = ownerId;
      baseResourceRequestDto.ownerType =
        ownerType.toString() as BaseResourceRequestDtoOwnerTypeEnum;
      baseResourceRequestDto.type = type;
      baseResourceRequestDto.name = name;
      baseResourceRequestDto.groupId = groupId;
      baseResourceRequestDto.amount = amount;
      baseResourceRequestDto.receivingProbability = receivingProbability;
      baseResourceRequestDto.rarenessProbability = rarenessProbability;
      baseResourceRequestDto.resources = resources;
      baseResourceRequestDto.extraArgs = extraArgs;
      return baseResourceRequestDto;
    });

    return (await this.resourcesApi.v1ResourcesPost(body)).map((dto) => {
      return new Resource({
        id: dto.id,
        type: dto.type,
        name: dto.name,
        groupId: dto.groupId,
        amount: dto.amount,
        receivingProbability: dto.receivingProbability,
        rarenessProbability: dto.rarenessProbability,
        resources,
        extraArgs: dto.extraArgs,
      });
    });
  }

  async getResourcesByOwnerId(
    ownerId: number,
    fulfillResourcesProbabilities: boolean,
  ): Promise<Resource[]> {
    const res = await this.resourcesApi.v1ResourcesGet(
      ownerId.toString(),
      'bar',
      undefined,
      fulfillResourcesProbabilities,
    );

    return res.map((dto) => {
      return new Resource({
        id: dto.id,
        type: dto.type,
        name: dto.name,
        groupId: dto.groupId,
        amount: dto.amount,
        receivingProbability: dto.receivingProbability,
        rarenessProbability: dto.rarenessProbability,
        resources: dto.resources,
        extraArgs: dto.extraArgs,
      });
    });
  }
}
