export class ResourceResponseDto {
  id: number;
  ownerId: string;
  ownerType: string;
  type: string;
  name: string;
  groupId: string;
  amount?: number;
  receivingProbability?: number;
  rarenessProbability?: number;
  resources: any;
  extraArgs?: object;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
