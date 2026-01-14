export class GameState {
  private static _isPaused = false;

  public static get isPaused(): boolean {
    return this._isPaused;
  }

  public static pause(): void {
    this._isPaused = true;
  }

  public static resume(): void {
    this._isPaused = false;
  }
}
