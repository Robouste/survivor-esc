import { HeroComponent } from "@components";
import { Engine, Query, System, SystemType, World } from "excalibur";

export class HeroLevelingSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<typeof HeroComponent>;

  constructor(world: World, private _engine: Engine) {
    super();

    this._query = world.query([HeroComponent]);
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
      }
    }
  }
}
