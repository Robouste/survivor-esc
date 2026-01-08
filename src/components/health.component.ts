import { Component } from "excalibur";

export class HealthComponent extends Component {
  constructor(public maxHealth: number, public currentHealth: number) {
    super();
  }
}
