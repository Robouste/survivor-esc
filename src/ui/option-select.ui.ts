import { FontName, Resources } from "@utils";
import {
  Actor,
  ActorEvents,
  Animation,
  Engine,
  EventEmitter,
  Font,
  FontUnit,
  GameEvent,
  Label,
  NineSlice,
  NineSliceStretch,
  Sprite,
  TextAlign,
  vec,
  Vector,
} from "excalibur";

export type OptionSelectEvent = {
  selected: GameEvent<OptionSelect>;
};

export class OptionSelectedEvent extends GameEvent<OptionSelect> {
  constructor(public target: OptionSelect) {
    super();
  }
}

export type OptionSelectOptions = Readonly<{
  pos: Vector;
  width: number;
  height: number;
  name: string;
  image: Sprite | Animation;
  text: string;
}>;

export class OptionSelect extends Actor {
  public events = new EventEmitter<ActorEvents & OptionSelectEvent>();
  public name: string;

  private _name: Label;
  private _text: Label;
  private _image: Actor;
  private _box: NineSlice;

  constructor(options: OptionSelectOptions) {
    super({
      pos: options.pos,
      width: options.width,
      height: options.height,
      anchor: vec(0.5, 0.5),
    });

    this.name = options.name;

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
      pos: vec(0, -this.height / 2 + 48),
      font: new Font({
        size: 18,
        family: FontName.Rpg,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
    });

    this._image = new Actor({
      pos: vec(0, 0),
      width: options.image.width,
      height: options.image.height,
      anchor: vec(0.5, 0.5),
      scale: vec(4, 4),
    });

    this._image.graphics.use(options.image);

    this._text = new Label({
      text: options.text,
      pos: vec(0, this._image.pos.y + this._image.height + 32),
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

    this.on("pointerenter", () => {
      this.scale = vec(1.05, 1.05);
    });

    this.on("pointerleave", () => {
      this.scale = vec(1, 1);
    });

    this.on("pointerdown", () =>
      this.events.emit("selected", new OptionSelectedEvent(this))
    );
  }
}
