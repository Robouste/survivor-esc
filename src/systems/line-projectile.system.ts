import { LineProjectileComponent, TargetComponent } from "@components";
import { GameState } from "@utils";
import {
  MotionComponent,
  Query,
  System,
  SystemType,
  TransformComponent,
  Vector,
  World,
} from "excalibur";

type QueryType =
  | typeof LineProjectileComponent
  | typeof MotionComponent
  | typeof TransformComponent;

export class LineProjectileSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<QueryType>;

  constructor(world: World) {
    super();

    this._query = world.query([
      LineProjectileComponent,
      MotionComponent,
      TransformComponent,
    ]);
  }

  public update(_elapsed: number): void {
    if (GameState.isPaused) {
      return;
    }

    for (const entity of this._query.entities) {
      const lineProjectile = entity.get(LineProjectileComponent);
      const motionComp = entity.get(MotionComponent);
      const transformComp = entity.get(TransformComponent);

      let direction: Vector | undefined = lineProjectile.direction;

      if (!direction) {
        if (!entity.has(TargetComponent)) {
          continue;
        }

        const targetEntity = entity.get(TargetComponent)!.entity;

        if (targetEntity.isKilled()) {
          entity.kill();
          continue;
        }

        const targetPos = targetEntity.get(TransformComponent).pos;
        direction = targetPos.sub(transformComp.pos).normalize();
      }

      motionComp.vel = direction.scale(lineProjectile.speed);
      transformComp.rotation = direction.toAngle();

      entity.removeComponent(LineProjectileComponent);
    }
  }
}
