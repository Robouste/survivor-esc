import { Config } from "@utils";
import { Component } from "excalibur";

export class HeroMovementComponent extends Component {
  public get speed(): number {
    return this._speed;
  }

  constructor(private _speed: number = Config.Hero.Speed) {
    super();
  }

  public updateSpeed(newSpeed: number): void {
    this._speed = newSpeed;
  }
}
