import { Actor, Canvas, CollisionType, Engine, vec } from "excalibur";

export class Background extends Actor {
  private _canvas!: Canvas;

  constructor(private readonly _tileSize = 64) {
    super({
      z: -100,
      anchor: vec(0, 0),
      collisionType: CollisionType.PreventCollision,
    });
  }

  public onInitialize(engine: Engine): void {
    this._canvas = this._makeCanvas(engine);
    this.graphics.use(this._canvas);
  }

  public onPreUpdate(engine: Engine, _elapsed: number): void {
    const viewport = engine.currentScene.camera.viewport;
    const pad = this._tileSize;

    this.pos.x = viewport.left - pad;
    this.pos.y = viewport.top - pad;

    const desiredW = Math.ceil(viewport.width + pad * 2);
    const desiredH = Math.ceil(viewport.height + pad * 2);

    if (this._canvas.width !== desiredW || this._canvas.height !== desiredH) {
      this._canvas = this._makeCanvas(engine);
      this.graphics.use(this._canvas);
    }
  }

  private _makeCanvas(engine: Engine): Canvas {
    const viewport = engine.currentScene.camera.viewport;
    const pad = this._tileSize;

    const width = Math.ceil(viewport.width + pad * 2);
    const height = Math.ceil(viewport.height + pad * 2);

    return new Canvas({
      width,
      height,
      draw: (ctx) => this._drawGrid(ctx, width, height),
    });
  }

  private _drawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    const tile = this._tileSize;

    const originWorldX = this.pos.x;
    const originWorldY = this.pos.y;

    const startWorldX = Math.floor(originWorldX / tile) * tile;
    const startWorldY = Math.floor(originWorldY / tile) * tile;

    const startLocalX = startWorldX - originWorldX;
    const startLocalY = startWorldY - originWorldY;

    ctx.clearRect(0, 0, width, height);

    for (
      let y = startLocalY, row = Math.floor(startWorldY / tile);
      y < height;
      y += tile, row++
    ) {
      for (
        let x = startLocalX, col = Math.floor(startWorldX / tile);
        x < width;
        x += tile, col++
      ) {
        const even = (row + col) % 2 === 0;
        ctx.fillStyle = even ? "#2b2b2b" : "#323232";
        ctx.fillRect(Math.round(x), Math.round(y), tile, tile);
      }
    }

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;

    for (let x = startLocalX; x < width; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.stroke();
    }
    for (let y = startLocalY; y < height; y += tile) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }
  }
}
