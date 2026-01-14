import {
  AttractedComponent,
  HeroComponent,
  PausableComponent,
} from "@components";
import { Resources } from "@utils";
import {
  Actor,
  Collider,
  CollisionContact,
  Color,
  Engine,
  Side,
  vec,
  Vector,
} from "excalibur";

export class XpDrop extends Actor {
  constructor(pos: Vector, public amount: number) {
    super({
      pos,
      radius: 8,
      color: Color.Yellow,
      anchor: vec(0.5, 0.5),
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new AttractedComponent()).addComponent(
      new PausableComponent()
    );
  }

  public onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner.has(HeroComponent)) {
      other.owner.get(HeroComponent)!.xp += this.amount;
      Resources.Sounds.XpPickUp.play({
        volume: 0.1,
      });
      this.kill();
    }
  }
}
