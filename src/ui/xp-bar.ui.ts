import { HeroComponent } from "@components";
import { Hero } from "@entities";
import { Resources } from "@utils";
import {
  Engine,
  NineSlice,
  NineSliceStretch,
  ScreenElement,
  vec,
} from "excalibur";

export class XpBar extends ScreenElement {
  private _xpBar: NineSlice;

  private get _heroComponent(): HeroComponent {
    return this._hero.get(HeroComponent);
  }

  constructor(engine: Engine, private _hero: Hero) {
    const gutters = 32;

    super({
      pos: vec(gutters, 16),
      anchor: vec(0, 0),
      width: engine.drawWidth - gutters * 2,
      height: 6,
      z: 1000,
    });

    this._xpBar = new NineSlice({
      width: this.width,
      height: this.height,
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
  }

  public onInitialize(engine: Engine): void {
    this.graphics.add("xp-bar", this._xpBar);
    this.graphics.use("xp-bar");
  }

  public onPreUpdate(engine: Engine, elapsed: number): void {
    const currentXp = this._heroComponent.xp;
    const requiredXp = this._heroComponent.xpToNextLevel;
    const xpRatio = currentXp / requiredXp;

    const newWidth = this.width * xpRatio;

    this._xpBar.setTargetWidth(newWidth);
  }
}
