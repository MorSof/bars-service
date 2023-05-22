import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourcesProvider } from '../providers/resources-provider.service';
import { Bar } from '../../bars/models/bar.model';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesProvider: ResourcesProvider) {}

  async createBarResources(bar: Bar): Promise<Resource[]> {
    const resourcesToCreate: Resource[] =
      await this.extractResourcesFromBarRecursively(`${bar.name}`, bar);
    return await this.resourcesProvider.createResources(resourcesToCreate);
  }

  async loadBarsResources(bar: Bar): Promise<Bar> {
    const fulfillResourcesProbabilities = true;
    bar.rewards = await this.resourcesProvider.getResourcesByOwnerId(
      bar.id,
      fulfillResourcesProbabilities,
    );
    for (const milestone of bar.milestones) {
      await this.loadBarsResources(milestone);
    }
    return bar;
  }

  private async extractResourcesFromBarRecursively(
    groupId: string,
    bar: Bar,
  ): Promise<Resource[]> {
    const resourcesToCreate: Resource[] = [];
    resourcesToCreate.push(
      ...this.extractResourcesFromBar(groupId, `${bar.id}`, bar.rewards),
    );
    if (bar.milestones) {
      for (const milestone of bar.milestones) {
        resourcesToCreate.push(
          ...(await this.extractResourcesFromBarRecursively(
            groupId,
            milestone,
          )),
        );
      }
    }
    return resourcesToCreate;
  }

  private extractResourcesFromBar(
    groupId: string,
    ownerId: string,
    rewards: Resource[],
  ) {
    if (rewards) {
      for (const reward of rewards) {
        reward.ownerId = ownerId;
        reward.ownerType = 'bar';
        reward.groupId = groupId;
      }
      return rewards;
    }
    return [];
  }

  // async createLevelResources(level: Level): Promise<Resource[]> {
  //   const resourcesToCreate: Resource[] = [];
  //   resourcesToCreate.push(
  //     ...this.addGroupIdPerBar(
  //       level.combo.bars,
  //       LevelResourcesGroups.COMBO_BAR_REWARDS,
  //     ),
  //   );
  //   resourcesToCreate.push(
  //     ...this.addGroupIdPerBar(level.goals, LevelResourcesGroups.GOALS_REWARDS),
  //   );
  //   return this.resourcesProvider.createResources(resourcesToCreate, level.id);
  // }
  //
  // async getResourcesByLevelId(
  //   levelId: number,
  //   fulfillResourcesProbabilities: boolean,
  // ): Promise<Resource[]> {
  //   return this.resourcesProvider.getResourcesByLevelId(
  //     levelId,
  //     fulfillResourcesProbabilities,
  //   );
  // }
  //
  // async removeResourcesByLevelId(levelId: number): Promise<boolean> {
  //   return this.resourcesProvider.removeLevelsResources(levelId);
  // }
  //
  // private addGroupIdPerBar(
  //   bars: Bar[],
  //   levelResourcesGroups: LevelResourcesGroups,
  // ): Resource[] {
  //   const resourcesToCreate: Resource[] = [];
  //   for (let i = 0; i < bars.length; i++) {
  //     const bar: Bar = bars[i];
  //     bar.resources.forEach(
  //       (resource) => (resource.groupId = `${levelResourcesGroups}-${i}`),
  //     );
  //     resourcesToCreate.push(...bar.resources);
  //   }
  //   return resourcesToCreate;
  // }
}
