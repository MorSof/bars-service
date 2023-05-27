import { Inject, Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';
import { HttpService } from '@nestjs/axios';
import { ResourceResponseDto } from './dtos/resource-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateResourceRequestDto } from './dtos/create-resource-request.dto';
import { GetResourcesRequestDto } from './dtos/get-resources-request.dto';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  private readonly CREATE_RESOURCE_PATH: string = '/v1/resources';
  private readonly GET_RESOURCE_PATH: string = '/v1/resources';
  private readonly REMOVE_RESOURCE_PATH: string = '/v1/resources';

  constructor(
    @Inject('RESOURCES_BASE_URL') private readonly RESOURCES_BASE_URL: string,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async createResources(resources: Resource[]): Promise<Resource[]> {
    const body: CreateResourceRequestDto[] = resources.map((resource) => {
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
      return new CreateResourceRequestDto({
        ownerId,
        ownerType,
        type,
        name,
        groupId,
        amount,
        receivingProbability,
        rarenessProbability,
        resources,
        extraArgs,
      });
    });

    const { data } = await firstValueFrom(
      this.httpService.post<ResourceResponseDto[]>(
        `${this.RESOURCES_BASE_URL}${this.CREATE_RESOURCE_PATH}`,
        body,
      ),
    );
    return data.map(
      (dto) =>
        new Resource({
          id: dto.id,
          type: dto.type,
          name: dto.name,
          groupId: dto.groupId,
          amount: dto.amount,
          receivingProbability: dto.receivingProbability,
          rarenessProbability: dto.rarenessProbability,
          resources,
          extraArgs: dto.extraArgs,
        }),
    );
  }

  async getResourcesByOwnerId(
    ownerId: number,
    fulfillResourcesProbabilities: boolean,
  ): Promise<Resource[]> {
    const getResourcesRequestDto: GetResourcesRequestDto = {
      ownerId: ownerId,
      ownerType: 'level',
    };
    if (fulfillResourcesProbabilities) {
      getResourcesRequestDto.fulfillProbability = fulfillResourcesProbabilities;
    }
    const { data } = await firstValueFrom(
      this.httpService.get<ResourceResponseDto[]>(
        `${this.RESOURCES_BASE_URL}${this.GET_RESOURCE_PATH}`,
        { params: getResourcesRequestDto },
      ),
    );
    return data.map(
      (dto) =>
        new Resource({
          id: dto.id,
          type: dto.type,
          name: dto.name,
          groupId: dto.groupId,
          amount: dto.amount,
          receivingProbability: dto.receivingProbability,
          rarenessProbability: dto.rarenessProbability,
          resources: dto.resources,
          extraArgs: dto.extraArgs,
        }),
    );
  }
}
