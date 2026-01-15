import { Reward } from "@rewards";
import { Actor, Camera, Engine, vec, Vector } from "excalibur";
import { DialogBox } from "./dialog-box.ui";
import { OptionSelect } from "./option-select.ui";

export interface LevelUpUiOptions {
  camera: Camera;
  engine: Engine;
  rewards: Reward[];
  onSelect: (reward: Reward) => void;
}

export class LevelUpUi extends Actor {
  private _rewards: Reward[];
  private _onSelect: (reward: Reward) => void;

  constructor(options: LevelUpUiOptions) {
    const camera = options.camera;
    const engine = options.engine;
    const width = Math.max(800, engine.drawWidth * 0.8);

    super({
      pos: vec(camera.pos.x, camera.pos.y),
      anchor: Vector.Half,
      width,
      height: width / 2,
      z: 10000,
    });

    this._rewards = options.rewards;
    this._onSelect = options.onSelect;
  }

  public onInitialize(_engine: Engine): void {
    const dialog = new DialogBox({
      width: this.width,
      height: this.height,
      text: "Level Up! Choose your reward:",
    });

    this.addChild(dialog);

    const rewardCount = this._rewards.length;
    const spacing = 32;
    const optionWidth =
      (this.width - spacing * (rewardCount + 1)) / rewardCount;
    const optionHeight = this.height * 0.75;
    const y = -this.height / 4 - spacing + optionHeight / 2;
    const totalWidth = rewardCount * optionWidth + (rewardCount - 1) * spacing;
    const startX = -totalWidth / 2 + optionWidth / 2;

    for (let i = 0; i < rewardCount; i++) {
      const reward = this._rewards[i];
      const option = new OptionSelect({
        name: reward.name,
        text: reward.description,
        image: reward.getAnimation(),
        pos: vec(startX + i * (optionWidth + spacing), y),
        width: optionWidth,
        height: optionHeight,
      });

      option.events.on("selected", () => this._onSelect(reward));
      this.addChild(option);
    }
  }
}
