// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  int,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

// users
export const user = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id", { length: 256 }),
  },
  (user) => ({
    clerkIndex: uniqueIndex("clerk_idx").on(user.clerkId),
  })
);

// parts
export const head = mysqlTable(
  "heads",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    price: int("price"),
    weight: int("weight"),
    energyDrain: int("energy_drain"),
    armorPoints: int("armor_points"),
    shellDefense: int("shell_defense"),
    energyDefense: int("energy_defense"),
    computerType: varchar("computer_type", { length: 256 }),
    mapType: varchar("map_type", { length: 256 }),
    noiseCanceler: boolean("noise_canceler"),
    bioSensor: boolean("bio_sensor"),
    radarFunction: boolean("radar_function"),
    radarRange: int("radar_range"),
    unlock: varchar("unlock", { length: 256 }),
  },
);

export const core = mysqlTable(
  "cores",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    price: int("price"),
    weight: int("weight"),
    energyDrain: int("energy_drain"),
    armorPoints: int("armor_points"),
    shellDefense: int("shell_defense"),
    energyDefense: int("energy_defense"),
    maximumWeight: int("maximum_weight"),
    antiMissileResponse: int("anti_missile_response"),
    antiMissileAngle: int("anti_missile_angle"),
    extensionSlots: int("extension_slots"),
    unlock: varchar("unlock", { length: 256 }),
  }
);

export const arms = mysqlTable(
  "arms",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    price: int("price"),
    weight: int("weight"),
    energyDrain: int("energy_drain"),
    armorPoints: int("armor_points"),
    shellDefense: int("shell_defense"),
    energyDefense: int("energy_defense"),
    weaponLock: varchar("weapon_lock", { length: 256 }),
    attackPower: int("attack_power"),
    numberOfAmmo: int("number_of_ammo"),
    ammoType: varchar("ammo_type", { length: 256 }),
    ammoPrice: int("ammo_price"),
    range: int("range"),
    maximumLock: int("maximum_lock"),
    reloadTime: int("reload_time"),
    unlock: varchar("unlock", { length: 256 }),
  }
);

export const legs = mysqlTable(
  "legs",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const generator = mysqlTable(
  "generators",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const firingControlSystem = mysqlTable(
  "firing_control_systems",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const boosters = mysqlTable(
  "boosters",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const backWeapon = mysqlTable(
  "back_weapons",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const armWeaponL = mysqlTable(
  "arm_weapons_l",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

export const armWeaponR = mysqlTable(
  "arm_weapons_r",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
);

// builds
export const build = mysqlTable(
  "builds",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }),

    head: varchar("head", { length: 256 }),
    core: varchar("core", { length: 256 }),
    arms: varchar("arms", { length: 256 }),
    legs: varchar("legs", { length: 256 }),

    generator: varchar("generator", { length: 256 }),
    fcs: varchar("fcs", { length: 256 }),
    booster: varchar("booster", { length: 256 }),

    backWeaponL: varchar("back_weapon_l", { length: 256 }),
    backWeaponR: varchar("back_weapon_r", { length: 256 }),

    armWeaponL: varchar("arm_weapon_l", { length: 256 }),
    armWeaponR: varchar("arm_weapon_r", { length: 256 }),

    cost: int("cost"),

    armorPoints: int('armor_points'),
    shellDefense: int('shell_defense'),
    energyDefense: int('energy_defense'),
    maxWeight: int('max_weight'),
    totalWeight: int('total_weight'),
    maxCoreWeight: int('max_core_weight'),
    armWeaponWeight: int('arm_weapon_weight'),
    maxEnergy: int('max_energy'),
    energyDrain: int('energy_drain'),

    legType: varchar("leg_type", { length: 256 }),
    speed: int('speed'),
    stability: int('stability'),
    jump: boolean("jump"),
    boostPower: int('boost_power'),

    mapType: varchar("map_type", { length: 256 }),
    noiseCanceler: boolean("noise_canceler"),
    bioSensor: boolean("bio_sensor"),

    radarSource: varchar("radar_source", { length: 256 }),
    radarRange: int('radar_range'),

    maximumLockFCS: int('maximum_lock_fcs'),
    lockTypeFCS: varchar("lock_type_fcs", { length: 256 }),

    armWeaponLeftChargeDrain: int('arm_weapon_left_charge_drain'),
    armWeaponLeftAttackPower: int('arm_weapon_left_attack_power'),
    armWeaponRightWeaponLock: varchar("arm_weapon_right_weapon_lock", { length: 256 }),
    armWeaponRightAttackPower: int('arm_weapon_right_attack_power'),
    armWeaponRightNumberOfAmmo: int('arm_weapon_right_number_of_ammo'),
    armWeaponRightAmmoType: varchar("arm_weapon_right_ammo_type", { length: 256 }),
    armWeaponRightAmmoPrice: int('arm_weapon_right_ammo_price'),
    armWeaponRightRange: int('arm_weapon_right_range'),
    armWeaponRightMaximumLock: int('arm_weapon_right_maximum_lock'),
    armWeaponRightReloadTime: int('arm_weapon_right_reload_time'),

    backWeaponLeftWeaponLock: varchar("back_weapon_left_weapon_lock", { length: 256 }),
    backWeaponLeftAttackPower: int('back_weapon_left_attack_power'),
    backWeaponLeftNumberOfAmmo: int('back_weapon_left_number_of_ammo'),
    backWeaponLeftAmmoType: varchar("back_weapon_left_ammo_type", { length: 256 }),
    backWeaponLeftAmmoPrice: int('back_weapon_left_ammo_price'),
    backWeaponLeftRange: int('back_weapon_left_range'),
    backWeaponLeftMaximumLock: int('back_weapon_left_maximum_lock'),
    backWeaponLeftReloadTime: int('back_weapon_left_reload_time'),

    backWeaponRightWeaponLock: varchar("back_weapon_right_weapon_lock", { length: 256 }),
    backWeaponRightAttackPower: int('back_weapon_right_attack_power'),
    backWeaponRightNumberOfAmmo: int('back_weapon_right_number_of_ammo'),
    backWeaponRightAmmoType: varchar("back_weapon_right_ammo_type", { length: 256 }),
    backWeaponRightAmmoPrice: int('back_weapon_right_ammo_price'),
    backWeaponRightRange: int('back_weapon_right_range'),
    backWeaponRightMaximumLock: int('back_weapon_right_maximum_lock'),
    backWeaponRightReloadTime: int('back_weapon_right_reload_time'),
  }
);