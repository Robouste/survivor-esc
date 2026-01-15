export const Config = {
  Engine: {
    MaxDrawLength: 200,
  },
  Hero: {
    XpToLevelUp: 50,
    Speed: 150,
    PickUpRadius: 60,
    ProjectileSpeed: 300,
  },
  XpDrop: {
    Speed: 400,
  },
  Enemy: {
    BaseSpeed: 75,
  },
  ZIndex: {
    Hero: 10,
    Enemy: 5,
    Projectile: 15,
    XpDrop: 8,
    TiledMap: 0,
    TiledMapForeground: 20,
    UiElements: 100,
  },
} as const;
