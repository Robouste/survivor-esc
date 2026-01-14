import { Component } from "excalibur";

export class HeroComponent extends Component {
  public xp: number = 0;
  public pickupRadius = 50;

  constructor() {
    super();
  }
}
