import { Component, Entity } from "excalibur";

export class TargetComponent extends Component {
  constructor(public entity: Entity) {
    super();
  }
}
