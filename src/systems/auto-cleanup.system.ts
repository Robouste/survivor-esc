import { AutoCleanupComponent } from "@components";
import { EngineConfig } from "@utils";
import {
  Engine,
  Query,
  System,
  SystemType,
  TransformComponent,
  World,
} from "excalibur";

export class AutocleanupSystem extends System {
  public systemType = SystemType.Update;

  private _query: Query<
    typeof AutoCleanupComponent | typeof TransformComponent
  >;

  constructor(world: World, private _engine: Engine) {
    super();

    this._query = world.query([AutoCleanupComponent, TransformComponent]);
  }

  public update(_elapsed: number): void {
    const viewport = this._engine.currentScene.camera.viewport;

    for (const entity of this._query.getEntities()) {
      const pos = entity.get(TransformComponent).pos;

      if (
        pos.x < viewport.left - EngineConfig.maxDrawLength ||
        pos.x > viewport.right + EngineConfig.maxDrawLength ||
        pos.y < viewport.top - EngineConfig.maxDrawLength ||
        pos.y > viewport.bottom + EngineConfig.maxDrawLength
      ) {
        console.log("killing entity");
        entity.kill();
      }
    }
  }
}
