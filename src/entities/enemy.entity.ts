import { ChaseHeroComponent } from "@components";
import { Actor, Color, Engine, Vector } from "excalibur";

export class Enemy extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      radius: 30,
      color: Color.Red,
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new ChaseHeroComponent(150));
  }
}
