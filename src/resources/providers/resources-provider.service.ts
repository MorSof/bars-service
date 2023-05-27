import { Resource } from '../models/resource.model';

export abstract class ResourcesProvider {
  abstract createResources(resource: Resource[]): Promise<Resource[]>;

  abstract getResourcesByOwnerId(
    ownerId: number,
    fulfillResourcesProbabilities: boolean,
  ): Promise<Resource[]>;
}
