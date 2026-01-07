import {
  AcquireClosestEnemyComponent,
  EnemyComponent,
  LineProjectileComponent,
} from "@components";
import {
  Actor,
  Collider,
  CollisionContact,
  Engine,
  Side,
  Vector,
} from "excalibur";

export class Projectile extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new LineProjectileComponent(300));
    this.addComponent(new AcquireClosestEnemyComponent());
  }

  public onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner.has(EnemyComponent)) {
      other.owner.kill();
      this.kill();
    }
  }
}
