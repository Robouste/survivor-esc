import { AutoCleanupComponent } from "@components";
import {
  Engine,
  Query,
  System,
  SystemType,
  TransformComponent,
  World,
} from "excalibur";
import { Config } from "../utils/configs";

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
        pos.x < viewport.left - Config.Engine.MaxDrawLength ||
        pos.x > viewport.right + Config.Engine.MaxDrawLength ||
        pos.y < viewport.top - Config.Engine.MaxDrawLength ||
        pos.y > viewport.bottom + Config.Engine.MaxDrawLength
      ) {
        entity.kill();
      }
    }
  }
}
