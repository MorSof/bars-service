import { Resource } from '../../resources/models/resource.model';
import { BadRequestException } from '@nestjs/common';

export class Bar {
  id: number;
  name: string;
  barIndex: number;
  maxValue: number;
  milestones?: Bar[];
  rewards?: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);

    if (this.milestones) {
      this.validateMaxValueSum(this.milestones);
    }
  }

  private validateMaxValueSum(milestones: Bar[]): void {
    let sum = 0;

    for (const milestone of milestones) {
      sum += milestone.maxValue;

      if (milestone.milestones) {
        this.validateMaxValueSum(milestone.milestones);
      }
    }

    if (sum > this.maxValue) {
      throw new BadRequestException(
        "Sum of milestones' maxValue exceeds the parent bar's maxValue.",
      );
    }
  }
}
