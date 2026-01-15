import { HeroComponent } from "@components";
import { Hero } from "@entities";
import { Resources } from "@utils";
import {
  Actor,
  Engine,
  NineSlice,
  NineSliceStretch,
  ScreenElement,
  vec,
} from "excalibur";

export class XpBar extends ScreenElement {
  private _topMargin = 15;
  private _leftMargin = 24;
  private _bottomMargin = 18;
  private _rightMargin = 24;
  private _outerBar: NineSlice;
  private _innerBar: NineSlice;
  private _innerBarActor: Actor;

  private get _heroComponent(): HeroComponent {
    return this._hero.get(HeroComponent);
  }

  constructor(engine: Engine, private _hero: Hero) {
    super({
      pos: vec(32, 32),
      anchor: vec(0, 0),
      width: engine.drawWidth - 64,
      height: 34,
      z: 1000,
    });

    this._outerBar = new NineSlice({
      width: this.width,
      height: this.height,
      source: Resources.Ui.XpBarOuter,
      sourceConfig: {
        width: 144,
        height: 34,
        topMargin: this._topMargin,
        leftMargin: this._leftMargin,
        bottomMargin: this._bottomMargin,
        rightMargin: this._rightMargin,
      },
      destinationConfig: {
        drawCenter: true,
        horizontalStretch: NineSliceStretch.TileFit,
        verticalStretch: NineSliceStretch.TileFit,
      },
    });

    this._innerBar = new NineSlice({
      width: this.width - this._leftMargin - this._rightMargin,
      height: this.height - this._topMargin - this._bottomMargin,
      source: Resources.Ui.XpBarInner,
      sourceConfig: {
        width: 96,
        height: 6,
        topMargin: 3,
        leftMargin: 3,
        bottomMargin: 3,
        rightMargin: 3,
      },
      destinationConfig: {
        drawCenter: true,
        horizontalStretch: NineSliceStretch.TileFit,
        verticalStretch: NineSliceStretch.TileFit,
      },
    });

    this._innerBarActor = new Actor({
      pos: vec(this._leftMargin, this._topMargin),
      width: 0,
      height: this._innerBar.height,
      anchor: vec(0, 0),
    });
  }

  public onInitialize(engine: Engine): void {
    this.graphics.add("outer", this._outerBar);
    this.graphics.use("outer");

    this._innerBarActor.graphics.add("inner", this._innerBar);
    this._innerBarActor.graphics.use("inner");

    this.addChild(this._innerBarActor);
  }

  public onPreUpdate(engine: Engine, elapsed: number): void {
    const currentXp = this._heroComponent.xp;
    const requiredXp = this._heroComponent.xpToNextLevel;
    const xpRatio = currentXp / requiredXp;

    const innerBarWidth =
      (this.width - this._leftMargin - this._rightMargin) * xpRatio;

    this._innerBar.setTargetWidth(innerBarWidth);
  }
}
