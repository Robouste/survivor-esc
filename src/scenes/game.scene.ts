import { Hero } from "@entities";
import { RewardService, WeaponRewardProvider } from "@rewards";
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
import { LevelUpUi } from "@ui";
import { Engine, Entity, Scene, vec } from "excalibur";
import { Background } from "../actors/background.actor";
import { EnemyFactory } from "../factories/enemy.factory";

export class GameScene extends Scene {
  private _hero!: Hero;
  private _enemyFactory!: EnemyFactory;
  private _rewardService!: RewardService;
  private _levelUpUi: LevelUpUi | null = null;

  public onInitialize(engine: Engine): void {
    this._hero = new Hero(vec(engine.drawWidth / 2, engine.drawHeight / 2));
    this.add(this._hero);

    this._enemyFactory = new EnemyFactory(this);
    this._enemyFactory.start();

    // Setup reward system
    this._rewardService = new RewardService();
    this._rewardService.registerProvider(new WeaponRewardProvider());

    this.world.add(new HeroMovementSystem(this.world, engine.input.keyboard));

    const levelingSystem = new HeroLevelingSystem(this.world);
    levelingSystem.onLevelUp(({ hero }) => this.showLevelUpUi(engine, hero));
    this.world.add(levelingSystem);

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
  }

  private showLevelUpUi(engine: Engine, hero: Entity): void {
    engine.timescale = 0;

    const context = { hero };
    const rewards = this._rewardService.generateRewardOptions(context, 3);

    if (rewards.length === 0) {
      engine.timescale = 1;
      return;
    }

    this._levelUpUi = new LevelUpUi({
      camera: this.camera,
      rewards,
      onSelect: (reward) => {
        this._rewardService.applyReward(context, reward);
        this.hideLevelUpUi(engine);
      },
    });

    this.add(this._levelUpUi);
  }

  private hideLevelUpUi(engine: Engine): void {
    if (this._levelUpUi) {
      this._levelUpUi.kill();
      this._levelUpUi = null;
    }
    engine.timescale = 1;
  }
}
