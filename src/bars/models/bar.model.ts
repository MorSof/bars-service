import { Resource } from '../../resources/models/resource.model';
import { BadRequestException } from '@nestjs/common';

export class Bar {
  id: number;
  maxValue: number;
  name?: string;
  barIndex?: number;
  milestones?: Bar[];
  rewards?: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);
    this.setMilestones(partial.name, partial.milestones);
  }

  private setMilestones(barName: string, milestones: Bar[]): void {
    if (barName && milestones) {
      let sum = 0;

      for (let i = 0; i < milestones.length; i++) {
        const milestone = milestones[i];
        if (!milestone.name || !milestone.barIndex) {
          milestone.barIndex = i;
          milestone.name = barName;
        }
        sum += milestone.maxValue;

        if (milestone.milestones) {
          this.setMilestones(milestone.name, milestone.milestones);
        }
      }

      if (sum > this.maxValue) {
        throw new BadRequestException(
          "Sum of milestones' maxValue exceeds the parent bar's maxValue.",
        );
      }
    }
  }
}
