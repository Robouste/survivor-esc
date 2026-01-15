import { Config } from "@utils";
import { Component } from "excalibur";

export class HeroComponent extends Component {
  private static readonly BASE_XP = Config.Hero.XpToLevelUp;
  private static readonly GROWTH_RATE = 1.5;

  public xp: number = 0;
  public pickupRadius = Config.Hero.PickUpRadius;
  public level = 1;
  public xpToNextLevel = HeroComponent.calculateXpForLevel(1);

  constructor() {
    super();
  }

  public static calculateXpForLevel(level: number): number {
    return Math.floor(
      HeroComponent.BASE_XP * Math.pow(HeroComponent.GROWTH_RATE, level - 1)
    );
  }
}
