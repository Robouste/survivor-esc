import { Animation, Entity } from "excalibur";

export enum RewardType {
  NewWeapon = "new_weapon",
  WeaponUpgrade = "weapon_upgrade",
  // Future: Passive, PowerUp, etc.
}

export interface Reward {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  rarity?: number;
  getAnimation(): Animation;
}

export interface RewardContext {
  hero: Entity;
}

export interface RewardProvider {
  readonly supportedTypes: RewardType[];
  getAvailableRewards(context: RewardContext): Reward[];
  applyReward(context: RewardContext, reward: Reward): void;
}
