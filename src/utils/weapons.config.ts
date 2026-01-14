import {
  AutoCleanupComponent,
  DamageComponent,
  PausableComponent,
  PiercingComponent,
} from "@components";
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
  damage: number;
  piercing: number;
}

export type LevelUpgrade = Partial<Omit<WeaponConfig, "type">>;

export interface WeaponDefinition {
  base: WeaponConfig;
  upgrades: LevelUpgrade[];
}

export const weaponDefinitions: Record<WeaponType, WeaponDefinition> = {
  [WeaponType.Kunai]: {
    base: {
      type: WeaponType.Kunai,
      projectileCount: 1,
      fireRate: 5000,
      spacing: 40,
      firingPattern: FiringPattern.Parallel,
      damage: 10,
      piercing: 1,
    },
    upgrades: [
      { projectileCount: 2, piercing: 2 },
      { projectileCount: 3 },
      { fireRate: 4000, piercing: 3, damage: 15 },
      { projectileCount: 4, fireRate: 3000 },
      { projectileCount: 5, fireRate: 2500, piercing: 4, damage: 20 },
    ],
  },
  [WeaponType.Knife]: {
    base: {
      type: WeaponType.Knife,
      projectileCount: 1,
      fireRate: 4000,
      spacing: 0,
      firingPattern: FiringPattern.Spread,
      spreadAngle: Math.PI / 6,
      damage: 8,
      piercing: 1,
    },
    upgrades: [
      { projectileCount: 2, piercing: 2 },
      { damage: 12 },
      { projectileCount: 3, spreadAngle: Math.PI / 4, piercing: 3 },
      { fireRate: 3000, damage: 16 },
      {
        projectileCount: 4,
        spreadAngle: Math.PI / 3,
        fireRate: 2500,
        piercing: 4,
      },
    ],
  },
  [WeaponType.Fireball]: {
    base: {
      type: WeaponType.Fireball,
      projectileCount: 1,
      fireRate: 3000,
      spacing: 0,
      firingPattern: FiringPattern.Parallel,
      projectileSize: 1,
      damage: 20,
      piercing: Infinity,
    },
    upgrades: [
      { damage: 30 },
      { damage: 40 },
      { fireRate: 2500, projectileSize: 1.5 },
      { damage: 50 },
      { fireRate: 2000, damage: 60, projectileSize: 2 },
    ],
  },
};

export const getWeaponConfig = (
  type: WeaponType,
  level: number
): WeaponConfig => {
  const definition = weaponDefinitions[type];
  let config: WeaponConfig = { ...definition.base };

  for (let i = 0; i < level - 1; i++) {
    const upgrade = definition.upgrades[i];

    if (upgrade) {
      config = { ...config, ...upgrade };
    }
  }

  return config;
};

export const getBaseWeaponComponents = (config: WeaponConfig): Component[] => {
  return [
    new DamageComponent(config.damage),
    new PiercingComponent(config.piercing),
    new AutoCleanupComponent(),
    new PausableComponent(),
  ];
};
