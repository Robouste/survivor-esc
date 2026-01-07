import { Component } from "excalibur";

export class LineProjectileComponent extends Component {
  constructor(public speed: number, public piercing = 1) {
    super();
  }
}
