export class GetResourcesRequestDto {
  ownerId: number;
  ownerType: string;
  fulfillProbability?: boolean;

  constructor(partial: Partial<GetResourcesRequestDto>) {
    Object.assign(this, partial);
  }
}
