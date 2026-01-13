import { Kunai } from "@entities";
import { Camera, Engine, ScreenElement, vec, Vector } from "excalibur";
import { DialogBox } from "./dialog-box.ui";
import { OptionSelect } from "./option-select.ui";

export class LevelUpUi extends ScreenElement {
  constructor(camera: Camera) {
    const x = camera.pos.x;
    const y = camera.pos.y;
    const width = Math.max(800, camera.viewport.width * 0.8);

    super({
      pos: vec(x, y),
      anchor: Vector.Half,
      width,
      height: width / 2,
      z: 10000,
    });
  }

  public onInitialize(engine: Engine): void {
    const dialog = new DialogBox({
      width: this.width,
      height: this.height,
      text: "Level Up! Choose your reward:",
    });

    this.addChild(dialog);

    const spacing = 32;
    const optionWidth = (this.width - spacing * 4) / 3; // 4 = gaps, 3 = number of options
    const optionHeight = this.height * 0.75;
    const y = -this.height / 4 - spacing + optionHeight / 2;
    const left = -(this.width / 2) + optionWidth / 2;

    const option1 = new OptionSelect({
      name: "Kunai",
      text: "Increase damage",
      image: Kunai.animation,
      pos: vec(left + spacing, y),
      width: optionWidth,
      height: optionHeight,
    });

    const option2 = new OptionSelect({
      name: "Kunai",
      text: "Increase damage",
      image: Kunai.animation,
      pos: vec(option1.pos.x + optionWidth + spacing, y),
      width: optionWidth,
      height: optionHeight,
    });

    const option3 = new OptionSelect({
      name: "Kunai",
      text: "Increase damage",
      image: Kunai.animation,
      pos: vec(option2.pos.x + optionWidth + spacing, y),
      width: optionWidth,
      height: optionHeight,
    });

    dialog.addChild(option1);
    dialog.addChild(option2);
    dialog.addChild(option3);
  }
}
