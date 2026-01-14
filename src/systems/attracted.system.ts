import { AttractedComponent, HeroComponent } from "@components";
import { VariablesConfig } from "@utils";
import {
  MotionComponent,
  Query,
  System,
  SystemType,
  TransformComponent,
  Vector,
  World,
} from "excalibur";

export class AttractedSystem extends System {
  public systemType = SystemType.Update;

  private _heroQuery: Query<typeof HeroComponent | typeof TransformComponent>;
  private _attractedQuery: Query<
    | typeof AttractedComponent
    | typeof TransformComponent
    | typeof MotionComponent
  >;

  constructor(world: World) {
    super();
    this._heroQuery = world.query([HeroComponent, TransformComponent]);
    this._attractedQuery = world.query([
      AttractedComponent,
      TransformComponent,
      MotionComponent,
    ]);
  }

  public update(): void {
    const hero = this._heroQuery.entities[0];

    if (!hero) {
      throw Error("Hero not found in AttractedSystem");
    }

    const radius = hero.get(HeroComponent).pickupRadius;

    for (const attracted of this._attractedQuery.entities) {
      const attractedPos = attracted.get(TransformComponent).pos;
      const heroPos = hero.get(TransformComponent).pos;
      const distance = attractedPos.distance(heroPos);

      if (distance <= radius) {
        attracted.get(MotionComponent).vel = heroPos
          .sub(attractedPos)
          .normalize()
          .scale(VariablesConfig.xpDropSpeed);
      } else {
        attracted.get(MotionComponent).vel = Vector.Zero;
      }
    }
  }
}
