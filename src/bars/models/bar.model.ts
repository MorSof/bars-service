import { Resource } from '../../resources/models/resource.model';

export class Bar {
  id: number;
  name: string;
  barIndex: number;
  maxValue: number;
  milestones?: Bar[];
  rewards?: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);
  }
}
