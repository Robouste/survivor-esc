import { EnemyComponent, PiercingComponent } from "@components";
import {
  ColliderComponent,
  CollisionStartEvent,
  Entity,
  Query,
  System,
  SystemType,
  World,
} from "excalibur";

type QueryType = typeof PiercingComponent;

export class PiercingSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<QueryType>;
  private _trackedEntities = new Set<number>();

  constructor(world: World) {
    super();

    this._query = world.query([PiercingComponent]);

    this._query.entityAdded$.subscribe((entity) => {
      const collider = entity.get(ColliderComponent);
      collider?.events.on("collisionstart", (evt: CollisionStartEvent) => {
        this._setupCollisionHandler(entity, evt);
      });
    });
  }

  public update(_elapsed: number): void {}

  private _setupCollisionHandler(
    entity: Entity,
    event: CollisionStartEvent
  ): void {
    const other = event.other.owner;

    // Check if the other entity is an enemy
    if (!other.has(EnemyComponent)) {
      return;
    }

    const piercing = entity.get(PiercingComponent);

    // Check if we've already hit this enemy
    if (piercing.hitIds.has(other.id)) {
      return;
    }

    // Track this hit
    piercing.hitIds.add(other.id);
    piercing.remainingPierces--;

    // Kill the enemy
    other.kill();

    // Kill the projectile if no pierces remaining
    if (piercing.remainingPierces <= 0) {
      entity.kill();
    }
  }
}
