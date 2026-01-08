import { Component } from "excalibur";

export class DamageComponent extends Component {
  public hitIds: Set<number> = new Set<number>();

  constructor(public amount: number) {
    super();
  }
}
