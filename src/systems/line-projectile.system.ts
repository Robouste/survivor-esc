import { LineProjectileComponent, TargetComponent } from "@components";
import {
  MotionComponent,
  Query,
  System,
  SystemType,
  TransformComponent,
  World,
} from "excalibur";

type QueryType =
  | typeof LineProjectileComponent
  | typeof MotionComponent
  | typeof TransformComponent
  | typeof TargetComponent;

export class LineProjectileSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<QueryType>;

  constructor(world: World) {
    super();

    this._query = world.query([
      LineProjectileComponent,
      MotionComponent,
      TransformComponent,
      TargetComponent,
    ]);
  }

  public update(_elapsed: number): void {
    for (const entity of this._query.entities) {
      const speed = entity.get(LineProjectileComponent).speed;
      const motionComp = entity.get(MotionComponent);
      const transformComp = entity.get(TransformComponent);
      const pos = transformComp.pos;
      const targetEntity = entity.get(TargetComponent).entity;

      if (!targetEntity.isKilled()) {
        const targetPos = targetEntity.get(TransformComponent).pos;
        const direction = targetPos.sub(pos).normalize();

        motionComp.vel = direction.scale(speed);
        transformComp.rotation = direction.toAngle();

        entity.removeComponent(LineProjectileComponent);
      } else {
        entity.kill();
      }
    }
  }
}
