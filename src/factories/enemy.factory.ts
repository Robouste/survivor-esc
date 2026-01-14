import { SkullBeetle } from "@entities";
import { GameScene } from "@scenes";
import { Helpers } from "@utils";
import { Timer } from "excalibur";

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
  }
}
