import { HeroMovementComponent } from "@components";
import { GameScene } from "@scenes";
import { Resources } from "@utils";
import {
  Actor,
  Animation,
  Engine,
  range,
  Shape,
  SpriteSheet,
  Timer,
  vec,
  Vector,
} from "excalibur";
import { Kunai } from "./weapons/kunai.entity";

type Direction = "down" | "up" | "left" | "right";
enum HeroAnimation {
  IdleDown = "IdleDown",
  IdleUp = "IdleUp",
  IdleLeft = "IdleLeft",
  IdleRight = "IdleRight",
  MovingDown = "MovingDown",
  MovingUp = "MovingUp",
  MovingLeft = "MovingLeft",
  MovingRight = "MovingRight",
}

const movingMap: Record<Direction, HeroAnimation> = {
  down: HeroAnimation.MovingDown,
  up: HeroAnimation.MovingUp,
  left: HeroAnimation.MovingLeft,
  right: HeroAnimation.MovingRight,
};

const idleMap: Record<Direction, HeroAnimation> = {
  down: HeroAnimation.IdleDown,
  up: HeroAnimation.IdleUp,
  left: HeroAnimation.IdleLeft,
  right: HeroAnimation.IdleRight,
};

export class Hero extends Actor {
  private _lastDirection: Direction = "down";

  constructor(pos: Vector, private _gameScene: GameScene) {
    super({
      pos,
      width: 128,
      height: 128,
      anchor: vec(0.5, 0.5),
      scale: vec(3, 3),
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new HeroMovementComponent());

    this.collider.set(Shape.Box(48, 48));
    this._setupAnimations();

    const projectileTimer = new Timer({
      interval: 5000,
      repeats: true,
      action: () => {
        const projectile = new Kunai(this.pos.clone());
        this._gameScene.add(projectile);
      },
    });

    this._gameScene.add(projectileTimer);
    projectileTimer.start();
  }

  public onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    const isMoving = this.vel.magnitude > 1;

    if (isMoving) {
      if (Math.abs(this.vel.x) > Math.abs(this.vel.y)) {
        this._lastDirection = this.vel.x > 0 ? "right" : "left";
      } else {
        this._lastDirection = this.vel.y > 0 ? "down" : "up";
      }

      this.graphics.use(movingMap[this._lastDirection]);
    } else {
      this.graphics.use(idleMap[this._lastDirection]);
    }
  }

  private _setupAnimations(): void {
    const idleSpritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.WarriorIdle,
      grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 128,
        spriteHeight: 128,
      },
    });

    const animSpeed = 150;

    const idleDown = Animation.fromSpriteSheet(
      idleSpritesheet,
      range(0, 3),
      animSpeed
    );

    const idleLeft = Animation.fromSpriteSheet(
      idleSpritesheet,
      range(4, 7),
      animSpeed
    );

    const idleRight = Animation.fromSpriteSheet(
      idleSpritesheet,
      range(8, 11),
      animSpeed
    );

    const idleUp = Animation.fromSpriteSheet(
      idleSpritesheet,
      range(12, 15),
      animSpeed
    );

    this.graphics.add(HeroAnimation.IdleDown, idleDown);
    this.graphics.add(HeroAnimation.IdleRight, idleRight);
    this.graphics.add(HeroAnimation.IdleLeft, idleLeft);
    this.graphics.add(HeroAnimation.IdleUp, idleUp);

    const movingSpritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.WarriorMove,
      grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 128,
        spriteHeight: 128,
      },
    });

    const movingDown = Animation.fromSpriteSheet(
      movingSpritesheet,
      range(0, 5),
      animSpeed
    );

    const movingLeft = Animation.fromSpriteSheet(
      movingSpritesheet,
      range(6, 11),
      animSpeed
    );

    const movingRight = Animation.fromSpriteSheet(
      movingSpritesheet,
      range(12, 17),
      animSpeed
    );

    const movingUp = Animation.fromSpriteSheet(
      movingSpritesheet,
      range(18, 23),
      animSpeed
    );

    this.graphics.add(HeroAnimation.MovingDown, movingDown);
    this.graphics.add(HeroAnimation.MovingRight, movingRight);
    this.graphics.add(HeroAnimation.MovingLeft, movingLeft);
    this.graphics.add(HeroAnimation.MovingUp, movingUp);

    this.graphics.use(HeroAnimation.IdleDown);
  }
}
