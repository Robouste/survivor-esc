import {
  Keyboard,
  Keys,
  MotionComponent,
  Query,
  System,
  SystemType,
  vec,
  World,
} from "excalibur";
import { HeroMovementComponent } from "../components/hero-movement.component";

export class HeroMovementSystem extends System {
  public systemType = SystemType.Update;
  private _query: Query<typeof HeroMovementComponent | typeof MotionComponent>;

  constructor(world: World, private _keyboard: Keyboard) {
    super();

    this._query = world.query([HeroMovementComponent, MotionComponent]);
  }

  public update(_elapsed: number): void {
    const hero = this._query.entities.at(0);

    if (!hero) {
      console.log("No hero found for movement system");
      return;
    }

    const movementComp = hero.get(HeroMovementComponent);
    const motionComp = hero.get(MotionComponent);

    const speed = movementComp.speed;

    let velX = 0;
    let velY = 0;

    if (this._keyboard.isHeld(Keys.W)) {
      velY += -speed;
    }

    if (this._keyboard.isHeld(Keys.S)) {
      velY += speed;
    }

    if (this._keyboard.isHeld(Keys.A)) {
      velX += -speed;
    }

    if (this._keyboard.isHeld(Keys.D)) {
      velX += speed;
    }

    motionComp.vel = vec(velX, velY);
  }
}
