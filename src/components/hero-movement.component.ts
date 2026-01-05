import { Component } from "excalibur";

export class HeroMovementComponent extends Component {
  public get speed(): number {
    return this._speed;
  }

  constructor(private _speed = 200) {
    super();
  }

  public updateSpeed(newSpeed: number): void {
    this._speed = newSpeed;
  }
}
