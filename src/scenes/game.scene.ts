import { Engine, Scene, vec } from "excalibur";
import { Hero } from "../entities/hero.entity";
import { HeroMovementSystem } from "../system/hero-movement.system";

export class GameScene extends Scene {
  private _hero!: Hero;

  public onInitialize(engine: Engine): void {
    this._hero = new Hero(vec(engine.drawWidth / 2, engine.drawHeight / 2));
    this.add(this._hero);

    this.world.add(new HeroMovementSystem(this.world, engine.input.keyboard));
  }
}
