import { ChaseHeroComponent } from "@components";
import { Hero } from "@entities";
import { GameState } from "@utils";
import {
  BodyComponent,
  MotionComponent,
  Query,
  System,
  SystemType,
  World,
} from "excalibur";

export class ChaseHeroSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<
    typeof ChaseHeroComponent | typeof MotionComponent | typeof BodyComponent
  >;

  constructor(world: World, private _hero: Hero) {
    super();

    this._query = world.query([
      ChaseHeroComponent,
      MotionComponent,
      BodyComponent,
    ]);
  }

  public update(_elapsed: number): void {
    if (GameState.isPaused) {
      return;
    }

    for (const entity of this._query.entities) {
      const chaseComp = entity.get(ChaseHeroComponent);
      const motionComp = entity.get(MotionComponent);
      const bodyComp = entity.get(BodyComponent);

      const speed = chaseComp.speed;

      const heroPos = this._hero.pos;
      const direction = heroPos.sub(bodyComp.pos);
      const velocity = direction.normalize().scale(speed);

      motionComp.vel = velocity;
    }
  }
}
