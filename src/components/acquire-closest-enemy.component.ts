import { Component } from "excalibur";

export class AcquireClosestEnemyComponent extends Component {
  constructor(
    public maxRange: number = Infinity,
    public acquireOnce: boolean = true
  ) {
    super();
  }
}
