import { Actor, Color, Engine, Vector } from "excalibur";
import { HeroMovementComponent } from "../components/hero-movement.component";

export class Hero extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      radius: 20,
      color: Color.Red,
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new HeroMovementComponent());
  }
}
