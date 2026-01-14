import { WeaponsComponent } from "@components";
import { AnimationFactory, AnimationName } from "@factories";
import { getWeaponConfig, weaponDefinitions, WeaponType } from "@utils";
import { Animation } from "excalibur";
import { Reward, RewardContext, RewardProvider, RewardType } from "./reward.types";

export interface WeaponReward extends Reward {
  weaponType: WeaponType;
  level: number;
}

const weaponDisplayNames: Record<WeaponType, string> = {
  [WeaponType.Kunai]: "Kunai",
  [WeaponType.Knife]: "Knife",
  [WeaponType.Fireball]: "Fireball",
};

const weaponAnimationMap: Record<WeaponType, AnimationName> = {
  [WeaponType.Kunai]: AnimationName.Kunai,
  [WeaponType.Knife]: AnimationName.Knife,
  [WeaponType.Fireball]: AnimationName.Fireball,
};

export class WeaponRewardProvider implements RewardProvider {
  public readonly supportedTypes = [RewardType.NewWeapon, RewardType.WeaponUpgrade];

  public getAvailableRewards(context: RewardContext): Reward[] {
    const weaponsComp = context.hero.get(WeaponsComponent);
    const rewards: Reward[] = [];

    for (const weaponType of Object.values(WeaponType)) {
      if (!weaponsComp.hasWeapon(weaponType)) {
        rewards.push(this.createNewWeaponReward(weaponType));
      } else if (weaponsComp.canUpgradeWeapon(weaponType)) {
        const currentLevel = weaponsComp.getWeaponLevel(weaponType)!;
        rewards.push(this.createUpgradeReward(weaponType, currentLevel + 1));
      }
    }

    return rewards;
  }

  public applyReward(context: RewardContext, reward: Reward): void {
    const weaponsComp = context.hero.get(WeaponsComponent);
    const weaponReward = reward as WeaponReward;

    if (weaponReward.type === RewardType.NewWeapon) {
      weaponsComp.addWeapon(weaponReward.weaponType);
    } else {
      weaponsComp.upgradeWeapon(weaponReward.weaponType);
    }
  }

  private createNewWeaponReward(weaponType: WeaponType): WeaponReward {
    const displayName = weaponDisplayNames[weaponType];
    const baseConfig = weaponDefinitions[weaponType].base;

    return {
      id: `weapon:${weaponType}:new`,
      type: RewardType.NewWeapon,
      weaponType,
      level: 1,
      name: displayName,
      description: this.getNewWeaponDescription(baseConfig),
      getAnimation: (): Animation => AnimationFactory.get(weaponAnimationMap[weaponType]),
    };
  }

  private createUpgradeReward(weaponType: WeaponType, level: number): WeaponReward {
    const displayName = weaponDisplayNames[weaponType];

    return {
      id: `weapon:${weaponType}:upgrade:${level}`,
      type: RewardType.WeaponUpgrade,
      weaponType,
      level,
      name: `${displayName} Lv.${level}`,
      description: this.getUpgradeDescription(weaponType, level),
      getAnimation: (): Animation => AnimationFactory.get(weaponAnimationMap[weaponType]),
    };
  }

  private getNewWeaponDescription(config: { damage: number; piercing: number }): string {
    const parts: string[] = [];
    parts.push(`${config.damage} damage`);
    if (config.piercing > 1 || config.piercing === Infinity) {
      parts.push(config.piercing === Infinity ? "infinite pierce" : `${config.piercing} pierce`);
    }
    return parts.join(", ");
  }

  private getUpgradeDescription(weaponType: WeaponType, level: number): string {
    const currentConfig = getWeaponConfig(weaponType, level - 1);
    const newConfig = getWeaponConfig(weaponType, level);

    const parts: string[] = [];

    const projectileDiff = newConfig.projectileCount - currentConfig.projectileCount;
    if (projectileDiff > 0) {
      parts.push(`+${projectileDiff} projectile${projectileDiff > 1 ? "s" : ""}`);
    }

    const damageDiff = newConfig.damage - currentConfig.damage;
    if (damageDiff > 0) {
      parts.push(`+${damageDiff} damage`);
    }

    const fireRateDiff = currentConfig.fireRate - newConfig.fireRate; // lower is faster
    if (fireRateDiff > 0) {
      const percentFaster = Math.round((fireRateDiff / currentConfig.fireRate) * 100);
      parts.push(`+${percentFaster}% attack speed`);
    }

    if (newConfig.piercing !== currentConfig.piercing) {
      if (newConfig.piercing === Infinity) {
        parts.push("infinite pierce");
      } else {
        const pierceDiff = newConfig.piercing - currentConfig.piercing;
        if (pierceDiff > 0) {
          parts.push(`+${pierceDiff} pierce`);
        }
      }
    }

    if (newConfig.spreadAngle !== currentConfig.spreadAngle) {
      const currentDeg = currentConfig.spreadAngle ? Math.round((currentConfig.spreadAngle * 180) / Math.PI) : 0;
      const newDeg = newConfig.spreadAngle ? Math.round((newConfig.spreadAngle * 180) / Math.PI) : 0;
      const diff = newDeg - currentDeg;
      if (diff > 0) {
        parts.push(`+${diff}° spread`);
      }
    }

    if (newConfig.projectileSize !== currentConfig.projectileSize) {
      const currentSize = currentConfig.projectileSize ?? 1;
      const newSize = newConfig.projectileSize ?? 1;
      const diff = newSize - currentSize;
      if (diff > 0) {
        parts.push(`+${diff * 100}% size`);
      }
    }

    return parts.join(", ") || "Power up!";
  }
}
