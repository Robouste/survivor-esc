import { XpDropComponent } from "@components";
import { SkullBeetle } from "@entities";
import { GameScene } from "@scenes";
import { Helpers } from "@utils";
import { Timer } from "excalibur";
import { XpDrop } from "../actors/xp-drop.actor";

export class EnemyFactory {
  private _timer: Timer;
  private _amount = 1;

  constructor(private _gameScene: GameScene) {
    this._timer = new Timer({
      interval: 1000,
      repeats: true,
      action: () => {
        for (let i = 0; i < this._amount; i++) {
          this._spawnEnemy();
        }
      },
    });

    this._gameScene.add(this._timer);
  }

  public start(): void {
    this._timer.start();
  }

  public stop(): void {
    this._timer.stop();
  }

  private _spawnEnemy(): void {
    const pos = Helpers.getRandomSpawnPosition(this._gameScene.engine);
    const enemy = new SkullBeetle(pos);
    this._gameScene.add(enemy);

    enemy.on("kill", () => {
      this._gameScene.add(
        new XpDrop(enemy.pos.clone(), enemy.get(XpDropComponent)!.amount)
      );
    });
  }
}
