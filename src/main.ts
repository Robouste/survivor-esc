import { Color, DisplayMode, Engine, FadeInOut } from "excalibur";
import { GameScene } from "./scenes/game.scene";
import { MainMenuScene } from "./scenes/main-menu.scene";
import { loader } from "./utils/resources";

// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: 800, // Logical width and height in game pixels
  height: 600,
  displayMode: DisplayMode.FillScreen,
  pixelArt: true,
  pixelRatio: 1,
  scenes: {
    mainMenu: MainMenuScene,
    game: GameScene,
  },
});

game
  .start("game", {
    loader,
    inTransition: new FadeInOut({
      // Optional in transition
      duration: 1000,
      direction: "in",
      color: Color.ExcaliburBlue,
    }),
  })
  .then(() => {
    // Do something after the game starts
  });
