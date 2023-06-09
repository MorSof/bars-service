export class Resource {
  id: number;
  type: string;
  name: string;
  ownerId: string;
  ownerType: string;
  groupId: string;
  amount?: number;
  receivingProbability?: number;
  rarenessProbability?: number;
  resources: any;
  extraArgs?: any;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
