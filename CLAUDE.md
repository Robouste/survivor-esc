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
- `ChaseHeroComponent` - Enemy AI behavior data
- `DamageComponent`, `HealthComponent` - Combat stats
- `LineProjectileComponent`, `PiercingComponent` - Projectile behavior
- `TargetComponent`, `AcquireClosestEnemyComponent` - Targeting system data
- `WeaponsComponent` - Holds multiple weapons with their state and levels
- `XpDropComponent`, `AutoCleanupComponent` - Misc entity lifecycle

**Systems** (`src/systems/`) - Logic that processes entities with matching components:

- Systems query the world for entities with specific component combinations
- Use `world.query([ComponentA, ComponentB])` pattern
- Subscribe to entity events like `entityAdded$` for collision setup
- Systems are registered in `GameScene.onInitialize()`

**Entities** (`src/entities/`) - Actors with attached components:

- `Hero` - Player character with movement, animations
- `Enemy`, `SkullBeetle` - Enemy types in `enemies/` subfolder
- `Kunai`, `Knife`, `Fireball` - Weapon projectiles in `weapons/` subfolder

### Path Aliases

Configured in `tsconfig.json` and resolved by `vite-tsconfig-paths`:

- `@components` -> `src/components/index.ts`
- `@entities` -> `src/entities/index.ts`
- `@scenes` -> `src/scenes/index.ts`
- `@systems` -> `src/systems/index.ts`
- `@utils` -> `src/utils/index.ts`

### Key Patterns

- **Factories**: `EnemyFactory` handles spawning enemies on timers
- **Resources**: All assets (sprites, sounds) loaded via `src/utils/resources.ts` using Excalibur's `Loader`
- **Scenes**: `MainMenuScene` and `GameScene` - systems are added to scene's `world`
- **Weapon Config**: `src/utils/weapons.config.ts` defines weapon types, firing patterns, base stats, and level upgrades using a data-driven approach with `WeaponDefinition` records
