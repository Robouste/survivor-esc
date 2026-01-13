import { FontName, Resources } from "@utils";
import {
  Engine,
  Font,
  FontUnit,
  Label,
  NineSlice,
  NineSliceStretch,
  ScreenElement,
  TextAlign,
  vec,
} from "excalibur";

export type DialogBoxOptions = Readonly<{
  width: number;
  height: number;
  text: string;
}>;

export class DialogBox extends ScreenElement {
  private readonly _label: Label;
  private _box: NineSlice;

  constructor(options: DialogBoxOptions) {
    super({
      width: options.width,
      height: options.height,
      anchor: vec(0.5, 0.5),
    });

    this._box = new NineSlice({
      width: options.width,
      height: options.height,
      source: Resources.Ui.DialogBox,
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

    const padding = 32;

    this._label = new Label({
      text: options.text,
      // Because ScreenElement origin is at its center by default,
      // we position relative to that.
      pos: vec(0, -options.height / 2 + padding),
      font: new Font({
        size: 24,
        family: FontName.Rpg,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        // You can set color if you want, leaving default otherwise
      }),
    });
  }

  public onInitialize(_engine: Engine): void {
    this.graphics.add("box", this._box);
    this.graphics.use("box");
    this.addChild(this._label);
  }
}
