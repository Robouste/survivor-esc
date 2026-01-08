import { Component } from "excalibur";

export enum WeaponType {
  Kunai = "kunai",
  Knife = "knife",
  Fireball = "fireball",
}

export enum FiringPattern {
  Parallel = "parallel",
  Spread = "spread",
}

export interface WeaponConfig {
  type: WeaponType;
  projectileCount: number;
  fireRate: number;
  spacing: number;
  firingPattern: FiringPattern;
  spreadAngle?: number;
  projectileSize?: number;
}

const defaultConfigs: Record<WeaponType, WeaponConfig> = {
  [WeaponType.Kunai]: {
    type: WeaponType.Kunai,
    projectileCount: 1,
    fireRate: 5000,
    spacing: 40,
    firingPattern: FiringPattern.Parallel,
  },
  [WeaponType.Knife]: {
    type: WeaponType.Knife,
    projectileCount: 3,
    fireRate: 4000,
    spacing: 0,
    firingPattern: FiringPattern.Spread,
    spreadAngle: Math.PI / 6,
  },
  [WeaponType.Fireball]: {
    type: WeaponType.Fireball,
    projectileCount: 1,
    fireRate: 3000,
    spacing: 0,
    firingPattern: FiringPattern.Parallel,
    projectileSize: 1,
  },
};

export interface WeaponState {
  config: WeaponConfig;
  elapsedTime: number;
}

export class WeaponComponent extends Component {
  public weapons: WeaponState[] = [];

  constructor(weapons: { type: WeaponType; overrides?: Partial<WeaponConfig> }[] = []) {
    super();
    for (const { type, overrides } of weapons) {
      this.addWeapon(type, overrides);
    }
  }

  public addWeapon(type: WeaponType, overrides?: Partial<WeaponConfig>): void {
    this.weapons.push({
      config: { ...defaultConfigs[type], ...overrides },
      elapsedTime: 0,
    });
  }
}
