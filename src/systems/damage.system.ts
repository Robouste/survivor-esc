import { DamageComponent, HealthComponent } from "@components";
import {
  ColliderComponent,
  CollisionStartEvent,
  Entity,
  Query,
  System,
  SystemType,
  World,
} from "excalibur";

export class DamageSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<typeof DamageComponent>;

  constructor(world: World) {
    super();

    this._query = world.query([DamageComponent]);

    this._query.entityAdded$.subscribe((entity) => {
      const collider = entity.get(ColliderComponent);
      collider?.events.on("collisionstart", (evt: CollisionStartEvent) => {
        this._setupCollisionHandler(entity, evt);
      });
    });
  }

  public update(_elapsed: number): void {}

  private _setupCollisionHandler(entity: Entity, event: CollisionStartEvent) {
    const other = event.other.owner;

    if (!other.has(HealthComponent)) {
      return;
    }

    const damageComp = entity.get(DamageComponent);

    if (damageComp.hitIds.has(other.id)) {
      return;
    }

    damageComp.hitIds.add(other.id);

    const healthComp = other.get(HealthComponent);
    healthComp.currentHealth -= damageComp.amount;
  }
}
