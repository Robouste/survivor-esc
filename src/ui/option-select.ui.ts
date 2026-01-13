import { FontName, Resources } from "@utils";
import {
  Actor,
  Animation,
  Engine,
  Font,
  FontUnit,
  Label,
  NineSlice,
  NineSliceStretch,
  ScreenElement,
  Sprite,
  TextAlign,
  vec,
  Vector,
} from "excalibur";

export type OptionSelectOptions = Readonly<{
  pos: Vector;
  width: number;
  height: number;
  name: string;
  image: Sprite | Animation;
  text: string;
}>;

export class OptionSelect extends ScreenElement {
  private _name: Label;
  private _text: Label;
  private _image: Actor;
  private _box: NineSlice;

  constructor(options: OptionSelectOptions) {
    super({
      pos: options.pos,
      width: options.width,
      height: options.height,
      anchor: vec(0, 0),
    });

    this._box = new NineSlice({
      width: options.width,
      height: options.height,
      source: Resources.Ui.OptionSelect,
      sourceConfig: {
        width: 72,
        height: 72,
        topMargin: 20,
        bottomMargin: 20,
        leftMargin: 20,
        rightMargin: 20,
      },
      destinationConfig: {
        drawCenter: true,
        horizontalStretch: NineSliceStretch.TileFit,
        verticalStretch: NineSliceStretch.TileFit,
      },
    });

    this._name = new Label({
      text: options.name,
      pos: vec(this.width / 2, 48),
      font: new Font({
        size: 18,
        family: FontName.Rpg,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
    });

    this._image = new Actor({
      pos: vec(this.width / 2, this.height / 2),
      width: options.image.width,
      height: options.image.height,
      anchor: vec(0.5, 0.5),
      scale: vec(4, 4),
    });

    this._image.graphics.use(options.image);

    this._text = new Label({
      text: options.text,
      pos: vec(this.width / 2, this._image.pos.y + this._image.height + 32),
      font: new Font({
        size: 16,
        family: FontName.Rpg,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
    });
  }

  public onInitialize(engine: Engine): void {
    this.graphics.add("box", this._box);
    this.graphics.use("box");
    this.addChild(this._name);
    this.addChild(this._image);
    this.addChild(this._text);
  }
}
