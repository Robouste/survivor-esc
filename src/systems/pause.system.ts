import { PausableComponent } from "@components";
import { GameState } from "@utils";
import { Query, System, SystemType, World } from "excalibur";

export class PauseSystem extends System {
  public systemType = SystemType.Update;

  private _query: Query<typeof PausableComponent>;

  constructor(world: World) {
    super();

    this._query = world.query([PausableComponent]);
  }

  public update(): void {
    for (const entity of this._query.getEntities()) {
      const pausable = entity.get(PausableComponent);

      if (GameState.isPaused && !pausable.isPaused) {
        pausable.pause();
      } else if (!GameState.isPaused && pausable.isPaused) {
        pausable.resume();
      }
    }
  }
}
