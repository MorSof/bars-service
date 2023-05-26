import { Bar } from '../../bars/models/bar.model';

export class BarOwnersProgression {
  id: number;
  barName: string;
  ownerType: string;
  ownerId: string;
  value: number;
  currentBar: Bar;

  constructor(partial: Partial<BarOwnersProgression>) {
    Object.assign(this, partial);
  }
}
