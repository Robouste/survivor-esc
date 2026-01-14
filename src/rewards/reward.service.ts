import { Reward, RewardContext, RewardProvider, RewardType } from "./reward.types";

export class RewardService {
  private _providers: RewardProvider[] = [];

  public registerProvider(provider: RewardProvider): void {
    this._providers.push(provider);
  }

  public generateRewardOptions(context: RewardContext, count: number = 3): Reward[] {
    const allRewards: Reward[] = [];

    for (const provider of this._providers) {
      allRewards.push(...provider.getAvailableRewards(context));
    }

    return this.pickRandom(allRewards, count);
  }

  public applyReward(context: RewardContext, reward: Reward): void {
    const provider = this.findProviderForReward(reward);

    if (provider) {
      provider.applyReward(context, reward);
    }
  }

  private findProviderForReward(reward: Reward): RewardProvider | undefined {
    return this._providers.find((provider) =>
      provider.supportedTypes.includes(reward.type)
    );
  }

  private pickRandom<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}
