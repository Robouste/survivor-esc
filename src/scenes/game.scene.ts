import { Hero, SkullBeetle } from "@entities";
import {
  ChaseHeroSystem,
  HeroMovementSystem,
  LineProjectileSystem,
} from "@systems";
import { Helpers } from "@utils";
import { Engine, Scene, Timer, vec } from "excalibur";
import { Background } from "../actors/background.actor";
import { TargetingSystem } from "../systems/targeting.system";

export class GameScene extends Scene {
  private _hero!: Hero;

  public onInitialize(engine: Engine): void {
    this._hero = new Hero(
      vec(engine.drawWidth / 2, engine.drawHeight / 2),
      this
    );
    this.add(this._hero);

    const timer = new Timer({
      interval: 1000,
      repeats: true,
      action: () => {
        const pos = Helpers.getRandomSpawnPosition(engine);

        const enemy = new SkullBeetle(pos);
        this.add(enemy);
      },
    });

    this.add(timer);
    timer.start();

    this.world.add(new HeroMovementSystem(this.world, engine.input.keyboard));
    this.world.add(new ChaseHeroSystem(this.world, this._hero));
    this.world.add(new LineProjectileSystem(this.world));
    this.world.add(new TargetingSystem(this.world));

    this.camera.strategy.lockToActor(this._hero);

    this.add(new Background(64));
  }
}
