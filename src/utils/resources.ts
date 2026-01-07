import { ImageSource, Loader } from "excalibur";

// It is convenient to put your resources in one place
export const Resources = {
  SpriteSheets: {
    WarriorIdle: new ImageSource("./spritesheets/characters/warrior_idle.png"),
    WarriorMove: new ImageSource("./spritesheets/characters/warrior_move.png"),
    Kunai: new ImageSource("./spritesheets/weapons/kunai.png"),
  },
} as const;

export const loader = new Loader();

for (const key of Object.values(Resources)) {
  for (const res of Object.values(key)) {
    loader.addResource(res);
  }
}
