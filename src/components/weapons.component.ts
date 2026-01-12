import { WeaponConfig, weaponDefinitions, WeaponType } from "@utils";
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

  public addWeapon(type: WeaponType, level: number = 1): void {
    this.weapons.push({
      config: weaponDefinitions[type].base,
      elapsedTime: 0,
      level,
    });
  }
}
