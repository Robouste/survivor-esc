import {
  getWeaponConfig,
  WeaponConfig,
  weaponDefinitions,
  WeaponType,
} from "@utils";
import { Component } from "excalibur";

export interface WeaponState {
  config: WeaponConfig;
  level: number;
  elapsedTime: number;
}

export class WeaponsComponent extends Component {
  public weapons: WeaponState[] = [];

  constructor(weapons: { type: WeaponType; level?: number }[] = []) {
    super();

    for (const { type, level = 1 } of weapons) {
      this.addWeapon(type, level);
    }
  }

  public hasWeapon(type: WeaponType): boolean {
    return this.weapons.some((weapon) => weapon.config.type === type);
  }

  public getWeaponLevel(type: WeaponType): number | undefined {
    return this.weapons.find((weapon) => weapon.config.type === type)?.level;
  }

  public addWeapon(type: WeaponType, level: number = 1): void {
    this.weapons.push({
      config: weaponDefinitions[type].base,
      elapsedTime: 0,
      level,
    });
  }

  public canUpgradeWeapon(type: WeaponType): boolean {
    const weapon = this.weapons.find((weapon) => weapon.config.type === type);

    if (!weapon) {
      return false;
    }

    const definition = weaponDefinitions[type];

    return weapon.level < definition.upgrades.length + 1;
  }

  public upgradeWeapon(type: WeaponType): boolean {
    const weapon = this.weapons.find((weapon) => weapon.config.type === type);

    if (!weapon) {
      return false;
    }

    if (!this.canUpgradeWeapon(type)) {
      return false;
    }

    weapon.level += 1;
    weapon.config = getWeaponConfig(type, weapon.level);

    return true;
  }
}
