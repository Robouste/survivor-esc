import { HeroComponent } from "@components";
import { Entity, Query, System, SystemType, World } from "excalibur";

export interface LevelUpEvent {
  hero: Entity;
}

export type LevelUpHandler = (event: LevelUpEvent) => void;

export class HeroLevelingSystem extends System {
  public systemType = SystemType.Update;

  private _query: Query<typeof HeroComponent>;
  private _levelUpHandlers: LevelUpHandler[] = [];

  constructor(world: World) {
    super();

    this._query = world.query([HeroComponent]);
  }

  public onLevelUp(handler: LevelUpHandler): void {
    this._levelUpHandlers.push(handler);
  }

  public update(_elapsed: number): void {
    for (const entity of this._query.entities) {
      const heroComp = entity.get(HeroComponent);

      if (heroComp.xp >= heroComp.xpToNextLevel) {
        heroComp.xp -= heroComp.xpToNextLevel;
        heroComp.level++;
        heroComp.xpToNextLevel = HeroComponent.calculateXpForLevel(
          heroComp.level
        );

        for (const handler of this._levelUpHandlers) {
          handler({ hero: entity });
        }
      }
    }
  }
}
