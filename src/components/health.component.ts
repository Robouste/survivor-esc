import { Component } from "excalibur";

export class HealthComponent extends Component {
  public currentHealth: number;

  constructor(public maxHealth: number) {
    super();
    this.currentHealth = maxHealth;
  }
}
