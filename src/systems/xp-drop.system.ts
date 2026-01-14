import { XpDropComponent } from "@components";
import { Actor, Query, Scene, System, SystemType, World } from "excalibur";
import { XpDrop } from "../actors/xp-drop.actor";

export class XpDropSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<typeof XpDropComponent>;

  constructor(world: World, private _scene: Scene) {
    super();

    this._query = world.query([XpDropComponent]);

    this._query.entityAdded$.subscribe((entity) => {
      entity.on("kill", () => {
        if (entity instanceof Actor) {
          const xpAmount = entity.get(XpDropComponent)!.amount;
          this._scene.add(new XpDrop(entity.pos.clone(), xpAmount));
        }
      });
    });
  }

  public update(_elapsed: number): void {}
}
