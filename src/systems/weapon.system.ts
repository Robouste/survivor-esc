import { EnemyComponent, WeaponsComponent } from "@components";
import { Fireball, Knife, Kunai } from "@entities";
import { FiringPattern, WeaponConfig, WeaponType } from "@utils";
import {
  Entity,
  Query,
  Scene,
  System,
  SystemType,
  TransformComponent,
  Vector,
  World,
} from "excalibur";

export class WeaponSystem extends System {
  public systemType = SystemType.Update;

  private _weaponHolders: Query<
    typeof WeaponsComponent | typeof TransformComponent
  >;
  private _enemies: Query<typeof EnemyComponent | typeof TransformComponent>;

  constructor(world: World, private _scene: Scene) {
    super();

    this._weaponHolders = world.query([WeaponsComponent, TransformComponent]);
    this._enemies = world.query([EnemyComponent, TransformComponent]);
  }

  public update(elapsed: number): void {
    for (const entity of this._weaponHolders.entities) {
      const weaponComponent = entity.get(WeaponsComponent);

      for (const weapon of weaponComponent.weapons) {
        weapon.elapsedTime += elapsed;

        if (weapon.elapsedTime >= weapon.config.fireRate) {
          weapon.elapsedTime = 0;
          this._fireProjectiles(entity, weapon.config);
        }
      }
    }
  }

  private _fireProjectiles(entity: Entity, config: WeaponConfig): void {
    const pos = entity.get(TransformComponent).pos;
    const closestEnemy = this._findClosestEnemy(entity);

    if (!closestEnemy) {
      return;
    }

    const enemyPos = closestEnemy.get(TransformComponent).pos;
    const baseDirection = enemyPos.sub(pos).normalize();

    const count = config.projectileCount;

    for (let i = 0; i < count; i++) {
      const { spawnPos, direction } = this._calculateSpawnPosAndDirection(
        pos,
        baseDirection,
        config,
        i,
        count
      );

      this._spawnProjectile(config.type, spawnPos, direction, config);
    }
  }

  private _calculateSpawnPosAndDirection(
    heroPos: Vector,
    baseDirection: Vector,
    config: WeaponConfig,
    index: number,
    count: number
  ): { spawnPos: Vector; direction: Vector } {
    if (config.firingPattern === FiringPattern.Spread) {
      const spreadAngle = config.spreadAngle ?? Math.PI / 6;
      const angleOffset =
        count === 1
          ? 0
          : -spreadAngle / 2 + (spreadAngle / (count - 1)) * index;

      const direction = baseDirection.rotate(angleOffset);
      return { spawnPos: heroPos.clone(), direction };
    }

    // Parallel pattern
    const perpendicular = baseDirection.perpendicular();
    const offset = (index - (count - 1) / 2) * config.spacing;
    const spawnPos = heroPos.add(perpendicular.scale(offset));

    return { spawnPos, direction: baseDirection };
  }

  private _spawnProjectile(
    type: WeaponType,
    pos: Vector,
    direction: Vector,
    config: WeaponConfig
  ): void {
    switch (type) {
      case WeaponType.Knife:
        const knife = new Knife(pos, config, direction);
        this._scene.add(knife);
        break;
      case WeaponType.Kunai:
        const kunai = new Kunai(pos, config, direction);
        this._scene.add(kunai);
        break;
      case WeaponType.Fireball:
        const fireball = new Fireball(pos, config, direction);
        this._scene.add(fireball);
        break;
    }
  }

  private _findClosestEnemy(seeker: Entity): Entity | null {
    const seekerPos = seeker.get(TransformComponent).pos;

    let best: Entity | null = null;
    let bestDistSq = Infinity;

    for (const enemy of this._enemies.entities) {
      const enemyPos = enemy.get(TransformComponent).pos;
      const distSq = seekerPos.squareDistance(enemyPos);

      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        best = enemy;
      }
    }

    return best;
  }
}
