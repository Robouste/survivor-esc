import {
  AcquireClosestEnemyComponent,
  EnemyComponent,
  TargetComponent,
} from "@components";
import {
  Entity,
  Query,
  System,
  SystemType,
  TransformComponent,
  World,
} from "excalibur";

export class TargetingSystem extends System {
  public systemType = SystemType.Update;

  private _seekers: Query<
    typeof AcquireClosestEnemyComponent | typeof TransformComponent
  >;
  private _enemies: Query<typeof EnemyComponent | typeof TransformComponent>;

  constructor(world: World) {
    super();

    this._seekers = world.query([
      AcquireClosestEnemyComponent,
      TransformComponent,
    ]);
    this._enemies = world.query([EnemyComponent, TransformComponent]);
  }

  public update(_elapsed: number): void {
    for (const seeker of this._seekers.entities) {
      const cfg = seeker.get(AcquireClosestEnemyComponent);

      if (seeker.has(TargetComponent) && cfg.acquireOnce) {
        continue;
      }

      const seekerPos = seeker.get(TransformComponent).pos;

      let best: Entity | null = null;
      let bestDistSq = cfg.maxRange * cfg.maxRange;

      for (const enemy of this._enemies.entities) {
        const enemyPos = enemy.get(TransformComponent).pos;
        const distSq = seekerPos.squareDistance(enemyPos);

        if (distSq < bestDistSq) {
          bestDistSq = distSq;
          best = enemy;
        }
      }

      if (!best) {
        seeker.kill();
        continue;
      }

      if (seeker.has(TargetComponent)) {
        seeker.get(TargetComponent)!.entity = best;
      } else {
        seeker.addComponent(new TargetComponent(best));
      }

      if (cfg.acquireOnce) {
        seeker.removeComponent(AcquireClosestEnemyComponent);
      }
    }
  }
}
