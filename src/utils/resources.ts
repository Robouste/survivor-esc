import { FontSource, ImageSource, Loader, Sound } from "excalibur";

export enum FontName {
  Rpg = "rpg",
}

// It is convenient to put your resources in one place
export const Resources = {
  SpriteSheets: {
    WarriorIdle: new ImageSource("./spritesheets/characters/warrior_idle.png"),
    WarriorMove: new ImageSource("./spritesheets/characters/warrior_move.png"),
    Kunai: new ImageSource("./spritesheets/weapons/kunai.png"),
    Knife: new ImageSource("./spritesheets/weapons/knife.png"),
    Fireball: new ImageSource("./spritesheets/weapons/fireball.png"),
    SkullBeetle: new ImageSource("./spritesheets/enemies/skull-beetle.png"),
  },
  Ui: {
    DialogBox: new ImageSource("./ui/dialog-box.png"),
    OptionSelect: new ImageSource("./ui/option-select.png"),
  },
  Sounds: {
    XpPickUp: new Sound("./sounds/xp_pick-up.wav"),
  },
  Fonts: {
    Rpg: new FontSource("./fonts/rpg.ttf", FontName.Rpg),
  },
} as const;

export const loader = new Loader();

for (const key of Object.values(Resources)) {
  for (const res of Object.values(key)) {
    loader.addResource(res);
  }
}
