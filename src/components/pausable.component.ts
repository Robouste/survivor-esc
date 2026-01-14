import {
  Animation,
  Component,
  GraphicsComponent,
  MotionComponent,
  Vector,
} from "excalibur";

export class PausableComponent extends Component {
  public isPaused = false;
  public savedVelocity = Vector.Zero;

  public pause(): void {
    if (this.isPaused) {
      return;
    }

    const motion = this.owner?.get(MotionComponent);

    if (motion) {
      this.savedVelocity = motion.vel.clone();
      motion.vel = Vector.Zero;
    }

    this._getAnimation()?.pause();

    this.isPaused = true;
  }

  public resume(): void {
    if (!this.isPaused) {
      return;
    }

    const motion = this.owner?.get(MotionComponent);

    if (motion) {
      motion.vel = this.savedVelocity.clone();
    }

    this._getAnimation()?.play();

    this.isPaused = false;
  }

  private _getAnimation(): Animation | null {
    const graphics = this.owner?.get(GraphicsComponent);

    if (graphics) {
      const current = graphics.current;
      if (current && current instanceof Animation) {
        return current;
      }
    }

    return null;
  }
}
