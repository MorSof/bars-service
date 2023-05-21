export class CreateResourceRequestDto {
  ownerId: string;
  ownerType: string;
  type: string;
  name: string;
  groupId: string;
  amount?: number;
  receivingProbability: number;
  rarenessProbability: number;
  extraArgs: Record<string, any>;

  constructor(partial: Partial<CreateResourceRequestDto>) {
    Object.assign(this, partial);
  }
}
