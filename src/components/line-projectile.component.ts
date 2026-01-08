import { Component, Vector } from "excalibur";

export class LineProjectileComponent extends Component {
  constructor(
    public speed: number,
    public direction?: Vector
  ) {
    super();
  }
}
