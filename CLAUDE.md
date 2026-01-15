# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project description

Survivor-style game built with excalibur.js.

## Commands

- **Dev server**: `npm run dev` - Starts Vite dev server with hot reload
- **Build**: `npm run build` - Runs TypeScript compiler then Vite build
- **Tests**: `npm run test` - Builds project then runs Playwright tests
- **Update snapshots**: `npm run test:integration-update` - Update Playwright visual snapshots
- **Preview build**: `npm run serve` - Preview production build locally

## Architecture

This is a survivor-style game built with **Excalibur.js** (v0.32.0) using an **Entity-Component-System (ECS)** pattern.

### ECS Structure

**Components** (`src/components/`) - Data containers attached to entities:

- `HeroMovementComponent`, `HeroComponent` - Hero-specific data
- `ChaseHeroComponent`, `EnemyComponent` - Enemy AI behavior data
- `DamageComponent`, `HealthComponent` - Combat stats
- `LineProjectileComponent`, `PiercingComponent` - Projectile behavior
- `TargetComponent`, `AcquireClosestEnemyComponent` - Targeting system data
- `WeaponsComponent` - Holds multiple weapons with their state and levels
- `XpDropComponent`, `AttractedComponent`, `AutoCleanupComponent` - XP and entity lifecycle
- `PausableComponent` - Marks entities affected by pause system

**Systems** (`src/systems/`) - Logic that processes entities with matching components:

- `HeroMovementSystem`, `HeroLevelingSystem` - Hero controls and progression
- `ChaseHeroSystem` - Enemy AI movement
- `WeaponSystem`, `LineProjectileSystem`, `PiercingSystem` - Weapon firing and projectile behavior
- `TargetingSystem` - Acquires targets for weapons
- `DamageSystem`, `HealthSystem` - Combat damage and death handling
- `XpDropSystem`, `AttractedSystem` - XP drops and pickup attraction
- `PauseSystem` - Game pause functionality
- `AutoCleanupSystem` - Removes off-screen entities
- Systems query the world using `world.query([ComponentA, ComponentB])` pattern
- Subscribe to entity events like `entityAdded$` for collision setup
- Systems are registered in `GameScene.onInitialize()`

**Entities** (`src/entities/`) - Actors with attached components:

- `Hero` - Player character with movement, animations
- `SkullBeetle` - Enemy type in `enemies/` subfolder
- `Kunai`, `Knife`, `Fireball` - Weapon projectiles in `weapons/` subfolder
- `XpDrop` - Experience orbs dropped by enemies

### Path Aliases

Configured in `tsconfig.json` and resolved by `vite-tsconfig-paths`:

- `@components` -> `src/components/index.ts`
- `@entities` -> `src/entities/index.ts`
- `@factories` -> `src/factories/index.ts`
- `@interfaces` -> `src/interfaces/index.ts`
- `@rewards` -> `src/rewards/index.ts`
- `@scenes` -> `src/scenes/index.ts`
- `@systems` -> `src/systems/index.ts`
- `@ui` -> `src/ui/index.ts`
- `@utils` -> `src/utils/index.ts`

### Key Patterns

- **Factories**: `EnemyFactory` spawns enemies on timers, `AnimationFactory` creates sprite animations
- **Resources**: All assets (sprites, sounds, fonts, UI) loaded via `src/utils/resources.ts` using Excalibur's `Loader`
- **Scenes**: `MainMenuScene` and `GameScene` - systems are added to scene's `world`
- **Weapon Config**: `src/utils/weapons.config.ts` defines weapon types, firing patterns, base stats, and level upgrades using a data-driven approach with `WeaponDefinition` records
- **UI**: `src/ui/` contains UI components like `LevelUpUI` for level-up selection screen
- **Rewards**: `src/rewards/` handles reward generation on level up via `RewardService` and providers like `WeaponRewardProvider`
- **Interfaces**: `src/interfaces/` contains shared interfaces like `HasAnimation`

### Coding guidelines

- Clean code
- Type safe (no any or as)
- no one-line if
- private variables and methods start with underscore
- always specify accessor (except for constructor)
- no inferrable types
