import { Component } from "excalibur";

export class PiercingComponent extends Component {
  public hitIds = new Set<number>();

  constructor(public remainingPierces: number) {
    super();
  }
}
