import { Hero } from "@entities";
import {
  AttractedSystem,
  AutocleanupSystem,
  ChaseHeroSystem,
  DamageSystem,
  HealthSystem,
  HeroLevelingSystem,
  HeroMovementSystem,
  LineProjectileSystem,
  PiercingSystem,
  WeaponSystem,
  XpDropSystem,
} from "@systems";
import { Engine, Scene, vec } from "excalibur";
import { Background } from "../actors/background.actor";
import { EnemyFactory } from "../factories/enemy.factory";

export class GameScene extends Scene {
  private _hero!: Hero;
  private _enemyFactory!: EnemyFactory;

  public onInitialize(engine: Engine): void {
    this._hero = new Hero(vec(engine.drawWidth / 2, engine.drawHeight / 2));
    this.add(this._hero);

    this._enemyFactory = new EnemyFactory(this);
    this._enemyFactory.start();

    this.world.add(new HeroMovementSystem(this.world, engine.input.keyboard));
    this.world.add(new HeroLevelingSystem(this.world, engine));
    this.world.add(new ChaseHeroSystem(this.world, this._hero));
    this.world.add(new WeaponSystem(this.world, this));
    this.world.add(new LineProjectileSystem(this.world));
    this.world.add(new PiercingSystem(this.world));
    this.world.add(new DamageSystem(this.world));
    this.world.add(new HealthSystem(this.world));
    this.world.add(new AutocleanupSystem(this.world, engine));
    this.world.add(new XpDropSystem(this.world, this));
    this.world.add(new AttractedSystem(this.world));

    this.camera.strategy.lockToActor(this._hero);

    this.add(new Background(64));

    // const test = new LevelUpUi(this.camera);
    // this.add(test);

    // const temp = new Timer({
    //   interval: 2000,
    //   repeats: true,
    //   action: () => {
    //     console.log("camera", Vector.Half);
    //   },
    // });

    // this.add(temp);
    // temp.start();
  }
}
