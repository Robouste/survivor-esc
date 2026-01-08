import { HealthComponent } from "@components";
import { Query, System, SystemType, World } from "excalibur";

export class HealthSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<typeof HealthComponent>;

  constructor(world: World) {
    super();

    this._query = world.query([HealthComponent]);
  }

  public update(_elapsed: number): void {
    for (const entity of this._query.entities) {
      const healthComp = entity.get(HealthComponent);

      if (healthComp.currentHealth <= 0) {
        entity.kill();
      }
    }
  }
}
