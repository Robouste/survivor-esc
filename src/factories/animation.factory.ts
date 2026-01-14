import { Resources } from "@utils";
import {
  Animation,
  AnimationStrategy,
  range,
  SpriteSheet,
  SpriteSheetGridOptions,
} from "excalibur";

export enum AnimationName {
  Kunai = "kunai",
  Knife = "knife",
  Fireball = "fireball",
}

interface AnimationConfig {
  spritesheetOptions: SpriteSheetGridOptions;
  animationOptions: {
    spriteSheetIndex: number[];
    durationPerFrame: number;
    strategy: AnimationStrategy;
  };
}

const animationConfigs: Record<AnimationName, AnimationConfig> = {
  [AnimationName.Kunai]: {
    spritesheetOptions: {
      image: Resources.SpriteSheets.Kunai,
      grid: {
        rows: 1,
        columns: 8,
        spriteWidth: 32,
        spriteHeight: 16,
      },
    },
    animationOptions: {
      spriteSheetIndex: range(0, 7),
      durationPerFrame: 50,
      strategy: AnimationStrategy.Loop,
    },
  },
  [AnimationName.Knife]: {
    spritesheetOptions: {
      image: Resources.SpriteSheets.Knife,
      grid: {
        rows: 1,
        columns: 16,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    },
    animationOptions: {
      spriteSheetIndex: range(0, 15),
      durationPerFrame: 50,
      strategy: AnimationStrategy.Loop,
    },
  },
  [AnimationName.Fireball]: {
    spritesheetOptions: {
      image: Resources.SpriteSheets.Fireball,
      grid: {
        rows: 1,
        columns: 10,
        spriteWidth: 72,
        spriteHeight: 32,
      },
    },
    animationOptions: {
      spriteSheetIndex: range(0, 9),
      durationPerFrame: 50,
      strategy: AnimationStrategy.Loop,
    },
  },
};

export class AnimationFactory {
  public static get(name: AnimationName): Animation {
    if (this._cache.has(name)) {
      return this._cache.get(name)!;
    }

    const config = animationConfigs[name];

    const spriteSheet = SpriteSheet.fromImageSource(config.spritesheetOptions);

    const { spriteSheetIndex, durationPerFrame, strategy } =
      config.animationOptions;

    const animation = Animation.fromSpriteSheet(
      spriteSheet,
      spriteSheetIndex,
      durationPerFrame,
      strategy
    );

    this._cache.set(name, animation);

    return animation;
  }

  private static _cache: Map<AnimationName, Animation> = new Map();
}
