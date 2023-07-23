export interface BasePart {
  name: string;
  price: number;
  unlock: string;
  weight?: number;
}

interface BaseWeapon {
  name: string;
  price: number;
  weight: number;
  energyDrain: number;
  unlock: string;
}

interface BackWeapon extends BaseWeapon {
  weaponLock: string;
  attackPower: string | number;
  numberOfAmmo: string | number;
  ammoType: string;
  ammoPrice: string | number;
  range: number;
  maximumLock: string | number;
  reloadTime: number | string;
}

interface ArmWeaponL extends BaseWeapon {
  chargeDrain: number;
  attackPower: number;
}

interface ArmWeaponR extends BaseWeapon {
  weaponLock: string;
  attackPower: number;
  numberOfAmmo: number;
  ammoType: string;
  ammoPrice: number;
  range: number;
  maximumLock: number;
  reloadTime: number;
}

export interface BaseArmorPart extends BasePart {
  energyDrain: number;
  armorPoints: number;
  shellDefense: number;
  energyDefense: number;
}

export interface Head extends BaseArmorPart {
  computerType: string;
  mapType: string;
  noiseCanceler: boolean;
  bioSensor: boolean;
  radarFunction: boolean;
  radarRange: string | number;
}

export interface Core extends BaseArmorPart {
  maximumWeight: number;
  antiMissileResponse: number;
  antiMissileAngle: number;
  extensionSlots: number;
}

export interface Arm extends BaseArmorPart {
  weaponLock: string;
  attackPower: string | number;
  numberOfAmmo: string | number;
  ammoType: string | number;
  ammoPrice: string | number;
  range: string | number;
  maximumLock: string | number;
  reloadTime: string | number;
}

export interface Leg extends BaseArmorPart {
  legType: string;
  maximumWeight: number;
  speed: number;
  stability: number;
  jumpFunction: boolean;
}

export interface Generator extends BasePart {
  energyOutput: number;
  maximumCharge: number;
  redzone: number;
}

export interface FCS extends BasePart {
  energyDrain: number;
  maximumLock: number;
  lockType: string;
}

export interface Booster extends BasePart {
  energyDrain: number;
  boostPower: number;
  chargeDrain: number;
}

export interface Parts {
  heads: Record<string, Head>;
  cores: Record<string, Core>;
  arms: Record<string, Arm>;
  legs: Record<string, Leg>;
  generators: Record<string, Generator>;
  firingControlSystems: Record<string, FCS>;
  boosters: Record<string, Booster>;
  backWeapons: Record<string, BackWeapon>;
  armWeaponsL: Record<string, ArmWeaponL>;
  armWeaponsR: Record<string, ArmWeaponR>;
}


export const parts: Parts = {
  "heads": {
    "HD-GRY-NX": {
      "name": "HD-GRY-NX",
      "price": 14700,
      "weight": 232,
      "energyDrain": 218,
      "armorPoints": 1004,
      "shellDefense": 194,
      "energyDefense": 134,
      "computerType": "Rough",
      "mapType": "No Memory",
      "noiseCanceler": false,
      "bioSensor": false,
      "radarFunction": false,
      "radarRange": "N/A",
      "unlock": "Starting Part"
    },
    "HD-X1487": {
      "name": "HD-X1487",
      "price": 19000,
      "weight": 166,
      "energyDrain": 420,
      "armorPoints": 975,
      "shellDefense": 160,
      "energyDefense": 185,
      "computerType": "Rough",
      "mapType": "No Memory",
      "noiseCanceler": true,
      "bioSensor": true,
      "radarFunction": false,
      "radarRange": "N/A",
      "unlock": "Guard Freight Train"
    },
    "HD-ZERO": {
      "name": "HD-ZERO",
      "price": 22500,
      "weight": 185,
      "energyDrain": 431,
      "armorPoints": 925,
      "shellDefense": 221,
      "energyDefense": 149,
      "computerType": "Rough",
      "mapType": "No Memory",
      "noiseCanceler": false,
      "bioSensor": false,
      "radarFunction": true,
      "radarRange": 6300,
      "unlock": "Shop"
    },
    "HD-01-SRVT": {
      "name": "HD-01-SRVT",
      "price": 26500,
      "weight": 122,
      "energyDrain": 350,
      "armorPoints": 816,
      "shellDefense": 154,
      "energyDefense": 149,
      "computerType": "Detailed",
      "mapType": "Area Memory",
      "noiseCanceler": false,
      "bioSensor": true,
      "radarFunction": false,
      "radarRange": "N/A",
      "unlock": "Shop"
    },
    "HD-2002": {
      "name": "HD-2002",
      "price": 29000,
      "weight": 156,
      "energyDrain": 457,
      "armorPoints": 787,
      "shellDefense": 140,
      "energyDefense": 154,
      "computerType": "Standard",
      "mapType": "Area Memory",
      "noiseCanceler": false,
      "bioSensor": false,
      "radarFunction": true,
      "radarRange": 6000,
      "unlock": "Shop"
    },
    "HD-08-DISH": {
      "name": "HD-08-DISH",
      "price": 33200,
      "weight": 133,
      "energyDrain": 716,
      "armorPoints": 870,
      "shellDefense": 205,
      "energyDefense": 162,
      "computerType": "Standard",
      "mapType": "Area & Place Name",
      "noiseCanceler": false,
      "bioSensor": false,
      "radarFunction": false,
      "radarRange": "N/A",
      "unlock": "Shop"
    },
    "HD-REDEYE": {
      "name": "HD-REDEYE",
      "price": 41100,
      "weight": 146,
      "energyDrain": 538,
      "armorPoints": 840,
      "shellDefense": 148,
      "energyDefense": 151,
      "computerType": "Detailed",
      "mapType": "Area & Place Name",
      "noiseCanceler": false,
      "bioSensor": false,
      "radarFunction": true,
      "radarRange": 5980,
      "unlock": "Shop"
    },
    "HD-D-9066": {
      "name": "HD-D-9066",
      "price": 43200,
      "weight": 138,
      "energyDrain": 657,
      "armorPoints": 885,
      "shellDefense": 165,
      "energyDefense": 232,
      "computerType": "Standard",
      "mapType": "Area Memory",
      "noiseCanceler": false,
      "bioSensor": true,
      "radarFunction": true,
      "radarRange": 6120,
      "unlock": "Shop"
    },
    "HD-06-RADAR": {
      "name": "HD-06-RADAR",
      "price": 51800,
      "weight": 145,
      "energyDrain": 875,
      "armorPoints": 741,
      "shellDefense": 109,
      "energyDefense": 194,
      "computerType": "Standard",
      "mapType": "Area & Place Name",
      "noiseCanceler": true,
      "bioSensor": false,
      "radarFunction": true,
      "radarRange": 8120,
      "unlock": "Shop"
    },
    "HD-ONE": {
      "name": "HD-ONE",
      "price": 68100,
      "weight": 161,
      "energyDrain": 304,
      "armorPoints": 800,
      "shellDefense": 132,
      "energyDefense": 129,
      "computerType": "Detailed",
      "mapType": "Area Memory",
      "noiseCanceler": true,
      "bioSensor": true,
      "radarFunction": true,
      "radarRange": 7980,
      "unlock": "Shop"
    }
  },
  "cores": {
    "XCA-00": {
      "name": "XCA-00",
      "price": 61500,
      "weight": 1103,
      "energyDrain": 1046,
      "armorPoints": 2710,
      "shellDefense": 530,
      "energyDefense": 505,
      "maximumWeight": 2770,
      "antiMissileResponse": 48,
      "antiMissileAngle": 48,
      "extensionSlots": 8,
      "unlock": "Starting Part"
    },
    "XCH-01": {
      "name": "XCH-01",
      "price": 72000,
      "weight": 1384,
      "energyDrain": 873,
      "armorPoints": 3015,
      "shellDefense": 615,
      "energyDefense": 543,
      "maximumWeight": 3600,
      "antiMissileResponse": 48,
      "antiMissileAngle": 32,
      "extensionSlots": 12,
      "unlock": "Shop"
    },
    "XCL-01": {
      "name": "XCL-01",
      "price": 88000,
      "weight": 885,
      "energyDrain": 1380,
      "armorPoints": 2380,
      "shellDefense": 492,
      "energyDefense": 610,
      "maximumWeight": 2450,
      "antiMissileResponse": 48,
      "antiMissileAngle": 64,
      "extensionSlots": 16,
      "unlock": "Shop"
    }
  },
  "arms": {
    "AN-201": {
      "name": "AN-201",
      "price": 15300,
      "weight": 1054,
      "energyDrain": 877,
      "armorPoints": 1635,
      "shellDefense": 352,
      "energyDefense": 334,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Starting Part"
    },
    "AN-101": {
      "name": "AN-101",
      "price": 19000,
      "weight": 1228,
      "energyDrain": 1006,
      "armorPoints": 1670,
      "shellDefense": 384,
      "energyDefense": 374,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AN-D-7001": {
      "name": "AN-D-7001",
      "price": 23000,
      "weight": 1445,
      "energyDrain": 1512,
      "armorPoints": 1743,
      "shellDefense": 306,
      "energyDefense": 453,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AN-25": {
      "name": "AN-25",
      "price": 28400,
      "weight": 853,
      "energyDrain": 682,
      "armorPoints": 1826,
      "shellDefense": 344,
      "energyDefense": 284,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AN-863-B": {
      "name": "AN-863-B",
      "price": 34000,
      "weight": 1726,
      "energyDrain": 1394,
      "armorPoints": 1880,
      "shellDefense": 517,
      "energyDefense": 406,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AN-3001": {
      "name": "AN-3001",
      "price": 39500,
      "weight": 1726,
      "energyDrain": 1394,
      "armorPoints": 1880,
      "shellDefense": 517,
      "energyDefense": 406,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "ANKS-1A46J": {
      "name": "ANKS-1A46J",
      "price": 42100,
      "weight": 2120,
      "energyDrain": 1415,
      "armorPoints": 1990,
      "shellDefense": 679,
      "energyDefense": 496,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AW-GT2000": {
      "name": "AW-GT2000",
      "price": 48600,
      "weight": 1415,
      "energyDrain": 92,
      "armorPoints": 1132,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Special",
      "attackPower": 305,
      "numberOfAmmo": 300,
      "ammoType": "Solid",
      "ammoPrice": 62,
      "range": 7800,
      "maximumLock": 1,
      "reloadTime": 2,
      "unlock": "Shop"
    },
    "AN-K1": {
      "name": "AN-K1",
      "price": 49000,
      "weight": 905,
      "energyDrain": 930,
      "armorPoints": 1790,
      "shellDefense": 339,
      "energyDefense": 402,
      "weaponLock": "N/A",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": "N/A",
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "AW-MG25/2": {
      "name": "AW-MG25/2",
      "price": 54500,
      "weight": 1193,
      "energyDrain": 78,
      "armorPoints": 812,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Special",
      "attackPower": 158,
      "numberOfAmmo": 400,
      "ammoType": "Solid",
      "ammoPrice": 33,
      "range": 8800,
      "maximumLock": 1,
      "reloadTime": 2,
      "unlock": "Shop"
    },
    "AW-30/3": {
      "name": "AW-30/3",
      "price": 56400,
      "weight": 480,
      "energyDrain": 377,
      "armorPoints": 688,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 80,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 3,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "AW-S60/2": {
      "name": "AW-S60/2",
      "price": 66600,
      "weight": 762,
      "energyDrain": 420,
      "armorPoints": 725,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 120,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 2,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "AW-RF120": {
      "name": "AW-RF120",
      "price": 67200,
      "weight": 1827,
      "energyDrain": 137,
      "armorPoints": 1420,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Narrow & Deep",
      "attackPower": 2120,
      "numberOfAmmo": 50,
      "ammoType": "Solid",
      "ammoPrice": 300,
      "range": 9800,
      "maximumLock": 1,
      "reloadTime": 18,
      "unlock": "Shop"
    },
    "AW-RF105": {
      "name": "AW-RF105",
      "price": 77600,
      "weight": 1530,
      "energyDrain": 106,
      "armorPoints": 1280,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Narrow & Deep",
      "attackPower": 1530,
      "numberOfAmmo": 100,
      "ammoType": "Solid",
      "ammoPrice": 220,
      "range": 9300,
      "maximumLock": 1,
      "reloadTime": 15,
      "unlock": "Shop"
    },
    "AW-XC5500": {
      "name": "AW-XC5500",
      "price": 83600,
      "weight": 1688,
      "energyDrain": 547,
      "armorPoints": 875,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Narrow & Deep",
      "attackPower": 1241,
      "numberOfAmmo": 70,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 12000,
      "maximumLock": 1,
      "reloadTime": 7,
      "unlock": "Shop"
    },
    "AW-XC65": {
      "name": "AW-XC65",
      "price": 98500,
      "weight": 1905,
      "energyDrain": 625,
      "armorPoints": 792,
      "shellDefense": 0,
      "energyDefense": 0,
      "weaponLock": "Narrow & Deep",
      "attackPower": 2322,
      "numberOfAmmo": 40,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 8300,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    }
  },
  "legs": {
    "LC-MOS18": {
      "name": "LC-MOS18",
      "price": 16000,
      "legType": "Tank",
      "energyDrain": 978,
      "armorPoints": 3928,
      "shellDefense": 858,
      "energyDefense": 572,
      "maximumWeight": 8000,
      "speed": 105,
      "stability": 4245,
      "jumpFunction": false,
      "unlock": "Shop"
    },
    "LB-4400": {
      "name": "LB-4400",
      "price": 17300,
      "legType": "Reverse Joint",
      "energyDrain": 1400,
      "armorPoints": 3560,
      "shellDefense": 617,
      "energyDefense": 451,
      "maximumWeight": 4020,
      "speed": 294,
      "stability": 2084,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LB-1000-P": {
      "name": "LB-1000-P",
      "price": 20500,
      "legType": "Reverse Joint",
      "energyDrain": 1228,
      "armorPoints": 3514,
      "shellDefense": 609,
      "energyDefense": 444,
      "maximumWeight": 3775,
      "speed": 286,
      "stability": 2310,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LB-4303": {
      "name": "LB-4303",
      "price": 24000,
      "legType": "Reverse Joint",
      "energyDrain": 1585,
      "armorPoints": 3575,
      "shellDefense": 643,
      "energyDefense": 488,
      "maximumWeight": 4180,
      "speed": 291,
      "stability": 2505,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-1001-PX-0": {
      "name": "LN-1001-PX-0",
      "price": 25000,
      "legType": "Middleweight Humanoid Legs",
      "energyDrain": 1844,
      "armorPoints": 3035,
      "shellDefense": 528,
      "energyDefense": 508,
      "maximumWeight": 4100,
      "speed": 280,
      "stability": 904,
      "jumpFunction": true,
      "unlock": "Starting Part"
    },
    "LC-UKI60": {
      "name": "LC-UKI60",
      "price": 25500,
      "legType": "Tank",
      "energyDrain": 1104,
      "armorPoints": 3822,
      "shellDefense": 812,
      "energyDefense": 589,
      "maximumWeight": 6950,
      "speed": 138,
      "stability": 3710,
      "jumpFunction": false,
      "unlock": "Shop"
    },
    "LBKS-2B45A": {
      "name": "LBKS-2B45A",
      "price": 27000,
      "legType": "Reverse Joint",
      "energyDrain": 1703,
      "armorPoints": 3731,
      "shellDefense": 584,
      "energyDefense": 515,
      "maximumWeight": 3990,
      "speed": 299,
      "stability": 1985,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-1001": {
      "name": "LN-1001",
      "price": 28500,
      "legType": "Middleweight Humanoid Legs",
      "energyDrain": 1725,
      "armorPoints": 3235,
      "shellDefense": 556,
      "energyDefense": 531,
      "maximumWeight": 4470,
      "speed": 277,
      "stability": 1018,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LB-4401": {
      "name": "LB-4401",
      "price": 31800,
      "legType": "Reverse Joint",
      "energyDrain": 1456,
      "armorPoints": 3810,
      "shellDefense": 672,
      "energyDefense": 468,
      "maximumWeight": 4510,
      "speed": 287,
      "stability": 2713,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-SSVR": {
      "name": "LN-SSVR",
      "price": 32400,
      "legType": "Heavyweight Humanoid Legs",
      "energyDrain": 2013,
      "armorPoints": 3606,
      "shellDefense": 805,
      "energyDefense": 532,
      "maximumWeight": 5400,
      "speed": 148,
      "stability": 2150,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-502": {
      "name": "LN-502",
      "price": 35800,
      "legType": "Middleweight Humanoid Legs",
      "energyDrain": 2466,
      "armorPoints": 3343,
      "shellDefense": 538,
      "energyDefense": 592,
      "maximumWeight": 3800,
      "speed": 275,
      "stability": 843,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LC-HTP-AAA": {
      "name": "LC-HTP-AAA",
      "price": 38500,
      "legType": "Tank",
      "energyDrain": 2877,
      "armorPoints": 3688,
      "shellDefense": 728,
      "energyDefense": 694,
      "maximumWeight": 4130,
      "speed": 250,
      "stability": 630,
      "jumpFunction": false,
      "unlock": "Shop"
    },
    "LF-205-SF": {
      "name": "LF-205-SF",
      "price": 42600,
      "legType": "Quadruped",
      "energyDrain": 2810,
      "armorPoints": 2841,
      "shellDefense": 446,
      "energyDefense": 654,
      "maximumWeight": 3450,
      "speed": 483,
      "stability": 580,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-SSVT": {
      "name": "LN-SSVT",
      "price": 44000,
      "legType": "Lightweight Humanoid Legs",
      "energyDrain": 2238,
      "armorPoints": 2795,
      "shellDefense": 482,
      "energyDefense": 507,
      "maximumWeight": 3560,
      "speed": 445,
      "stability": 596,
      "jumpFunction": true,
      "unlock": "Remove Gun Emplacement"
    },
    "LN-1001B": {
      "name": "LN-1001B",
      "price": 45200,
      "legType": "Middleweight Humanoid Legs",
      "energyDrain": 1889,
      "armorPoints": 3383,
      "shellDefense": 585,
      "energyDefense": 543,
      "maximumWeight": 4630,
      "speed": 272,
      "stability": 1320,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LNKS-1B46J": {
      "name": "LNKS-1B46J",
      "price": 48000,
      "legType": "Heavyweight Humanoid Legs",
      "energyDrain": 2304,
      "armorPoints": 3788,
      "shellDefense": 822,
      "energyDefense": 618,
      "maximumWeight": 6100,
      "speed": 146,
      "stability": 3802,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-D-8000R": {
      "name": "LN-D-8000R",
      "price": 49000,
      "legType": "Heavyweight Humanoid Legs",
      "energyDrain": 2350,
      "armorPoints": 3532,
      "shellDefense": 510,
      "energyDefense": 656,
      "maximumWeight": 4720,
      "speed": 269,
      "stability": 1200,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-3001": {
      "name": "LN-3001",
      "price": 52200,
      "legType": "Heavyweight Humanoid Legs",
      "energyDrain": 2206,
      "armorPoints": 3703,
      "shellDefense": 870,
      "energyDefense": 594,
      "maximumWeight": 6600,
      "speed": 153,
      "stability": 2518,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LFH-X3": {
      "name": "LFH-X3",
      "price": 56000,
      "legType": "Quadruped",
      "energyDrain": 2988,
      "armorPoints": 3100,
      "shellDefense": 468,
      "energyDefense": 610,
      "maximumWeight": 3810,
      "speed": 421,
      "stability": 710,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LC-MOS4545": {
      "name": "LC-MOS4545",
      "price": 59000,
      "legType": "Tank",
      "energyDrain": 2609,
      "armorPoints": 3990,
      "shellDefense": 905,
      "energyDefense": 753,
      "maximumWeight": 7400,
      "speed": 211,
      "stability": 5101,
      "jumpFunction": false,
      "unlock": "Shop"
    },
    "LN-3001C": {
      "name": "LN-3001C",
      "price": 64100,
      "legType": "Heavyweight Humanoid Legs",
      "energyDrain": 2418,
      "armorPoints": 3997,
      "shellDefense": 889,
      "energyDefense": 602,
      "maximumWeight": 7100,
      "speed": 151,
      "stability": 2977,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LF-DEX-1": {
      "name": "LF-DEX-1",
      "price": 69000,
      "legType": "Quadruped",
      "energyDrain": 4016,
      "armorPoints": 3179,
      "shellDefense": 557,
      "energyDefense": 553,
      "maximumWeight": 4450,
      "speed": 360,
      "stability": 820,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LN-501": {
      "name": "LN-501",
      "price": 71800,
      "legType": "Middleweight Humanoid Legs",
      "energyDrain": 2910,
      "armorPoints": 2947,
      "shellDefense": 508,
      "energyDefense": 535,
      "maximumWeight": 3990,
      "speed": 451,
      "stability": 854,
      "jumpFunction": true,
      "unlock": "Shop"
    },
    "LFH-X5X": {
      "name": "LFH-X5X",
      "price": 82000,
      "legType": "Quadruped",
      "energyDrain": 3584,
      "armorPoints": 3328,
      "shellDefense": 497,
      "energyDefense": 700,
      "maximumWeight": 5000,
      "speed": 442,
      "stability": 1110,
      "jumpFunction": true,
      "unlock": "Shop"
    }
  },
  "generators": {
    "GPS-VVA": {
      "name": "GPS-VVA",
      "price": 19500,
      "weight": 308,
      "energyOutput": 4728,
      "maximumCharge": 28000,
      "redzone": 7800,
      "unlock": "Starting Part"
    },
    "GRD-RX5": {
      "name": "GRD-RX5",
      "price": 23300,
      "weight": 225,
      "energyOutput": 5300,
      "maximumCharge": 38000,
      "redzone": 4000,
      "unlock": "Shop"
    },
    "GRD-RX6": {
      "name": "GRD-RX6",
      "price": 27800,
      "weight": 286,
      "energyOutput": 6810,
      "maximumCharge": 31500,
      "redzone": 5000,
      "unlock": "Shop"
    },
    "GPS-V6": {
      "name": "GPS-V6",
      "price": 32000,
      "weight": 363,
      "energyOutput": 5600,
      "maximumCharge": 43000,
      "redzone": 5000,
      "unlock": "Shop"
    },
    "GRD-RX7": {
      "name": "GRD-RX7",
      "price": 38700,
      "weight": 348,
      "energyOutput": 6810,
      "maximumCharge": 31500,
      "redzone": 5000,
      "unlock": "Shop"
    },
    "GBG-10000": {
      "name": "GBG-10000",
      "price": 43500,
      "weight": 398,
      "energyOutput": 9988,
      "maximumCharge": 34000,
      "redzone": 2980,
      "unlock": "Shop"
    },
    "GBG-XR": {
      "name": "GBG-XR",
      "price": 56000,
      "weight": 452,
      "energyOutput": 8207,
      "maximumCharge": 48000,
      "redzone": 3250,
      "unlock": "Destroy Plus Escapee"
    }
  },
  "firingControlSystems": {
    "COMDEX-C7": {
      "name": "COMDEX-C7",
      "price": 11100,
      "weight": 14,
      "energyDrain": 24,
      "maximumLock": 4,
      "lockType": "Standard",
      "unlock": "Starting Part"
    },
    "COMDEX-G8": {
      "name": "COMDEX-G8",
      "price": 16400,
      "weight": 14,
      "energyDrain": 24,
      "maximumLock": 6,
      "lockType": "Standard",
      "unlock": "Shop"
    },
    "QX-21": {
      "name": "QX-21",
      "price": 20300,
      "weight": 8,
      "energyDrain": 12,
      "maximumLock": 1,
      "lockType": "Wide & Shallow",
      "unlock": "Shop"
    },
    "COMDEX-G0": {
      "name": "COMDEX-G0",
      "price": 22500,
      "weight": 14,
      "energyDrain": 24,
      "maximumLock": 4,
      "lockType": "Standard",
      "unlock": "Shop"
    },
    "QX-AF": {
      "name": "QX-AF",
      "price": 35700,
      "weight": 10,
      "energyDrain": 16,
      "maximumLock": 2,
      "lockType": "Wide&Shallow",
      "unlock": "Exterminate Organisms"
    },
    "TRYX-BOXER": {
      "name": "TRYX-BOXER",
      "price": 48100,
      "weight": 10,
      "energyDrain": 19,
      "maximumLock": 3,
      "lockType": "Tall/Lengthway",
      "unlock": "Shop"
    },
    "TRYX-QUAD": {
      "name": "TRYX-QUAD",
      "price": 63000,
      "weight": 18,
      "energyDrain": 38,
      "maximumLock": 6,
      "lockType": "Wide/Sideway",
      "unlock": "Shop"
    },
    "QX-9009": {
      "name": "QX-9009",
      "price": 96000,
      "weight": 24,
      "energyDrain": 55,
      "maximumLock": 6,
      "lockType": "Narrow&Deep",
      "unlock": "Shop"
    }
  },
  "boosters": {
    "B-P320": {
      "name": "B-P320",
      "price": 10800,
      "weight": 208,
      "energyDrain": 28,
      "boostPower": 9800,
      "chargeDrain": 4360,
      "unlock": "Starting Part"
    },
    "B-P350": {
      "name": "B-P350",
      "price": 13700,
      "weight": 162,
      "energyDrain": 33,
      "boostPower": 12800,
      "chargeDrain": 4410,
      "unlock": "Shop"
    },
    "B-P351": {
      "name": "B-P351",
      "price": 25500,
      "weight": 288,
      "energyDrain": 41,
      "boostPower": 21000,
      "chargeDrain": 6980,
      "unlock": "Shop"
    },
    "B-T2": {
      "name": "B-T2",
      "price": 31500,
      "weight": 235,
      "energyDrain": 38,
      "boostPower": 14800,
      "chargeDrain": 3850,
      "unlock": "Shop"
    },
    "B-T001": {
      "name": "B-T001",
      "price": 34000,
      "weight": 149,
      "energyDrain": 30,
      "boostPower": 17300,
      "chargeDrain": 4600,
      "unlock": "Guard Factory Entrance"
    },
    "B-VR-33": {
      "name": "B-VR-33",
      "price": 48500,
      "weight": 255,
      "energyDrain": 35,
      "boostPower": 19000,
      "chargeDrain": 5070,
      "unlock": "Shop"
    }
  },
  "backWeapons": {
    "RXA-01WE": {
      "name": "RXA-01WE",
      "price": 12100,
      "weight": 210,
      "energyDrain": 243,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 8650,
      "maximumLock": "N/A",
      "reloadTime": 0,
      "unlock": "Starting Part"
    },
    "RXA-99": {
      "name": "RXA-99",
      "price": 14500,
      "weight": 160,
      "energyDrain": 267,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 8800,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WR-S50": {
      "name": "WR-S50",
      "price": 15900,
      "weight": 218,
      "energyDrain": 8,
      "weaponLock": "None",
      "attackPower": 1310,
      "numberOfAmmo": 50,
      "ammoType": "Solid",
      "ammoPrice": 110,
      "range": 12500,
      "maximumLock": 0,
      "reloadTime": 8,
      "unlock": "Shop"
    },
    "RZ-A0": {
      "name": "RZ-A0",
      "price": 17900,
      "weight": 480,
      "energyDrain": 387,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 11500,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WM-S40/1": {
      "name": "WM-S40/1",
      "price": 18700,
      "weight": 245,
      "energyDrain": 245,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 40,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Starting Part"
    },
    "WM-X5-AA": {
      "name": "WM-X5-AA",
      "price": 19300,
      "weight": 616,
      "energyDrain": 85,
      "weaponLock": "None",
      "attackPower": 675,
      "numberOfAmmo": 10,
      "ammoType": "Solid",
      "ammoPrice": 270,
      "range": 0,
      "maximumLock": 0,
      "reloadTime": 50,
      "unlock": "Shop"
    },
    "RXA-77": {
      "name": "RXA-77",
      "price": 23000,
      "weight": 125,
      "energyDrain": 274,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 8700,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WM-S40/2": {
      "name": "WM-S40/2",
      "price": 23000,
      "weight": 337,
      "energyDrain": 320,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 40,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 2,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WM-X10": {
      "name": "WM-X10",
      "price": 24800,
      "weight": 939,
      "energyDrain": 105,
      "weaponLock": "None",
      "attackPower": 675,
      "numberOfAmmo": 10,
      "ammoType": "Solid",
      "ammoPrice": 560,
      "range": 0,
      "maximumLock": 0,
      "reloadTime": 50,
      "unlock": "Shop"
    },
    "WR-M50": {
      "name": "WR-M50",
      "price": 27600,
      "weight": 677,
      "energyDrain": 13,
      "weaponLock": "None",
      "attackPower": 2240,
      "numberOfAmmo": 50,
      "ammoType": "Solid",
      "ammoPrice": 220,
      "range": 14000,
      "maximumLock": 0,
      "reloadTime": 12,
      "unlock": "Shop"
    },
    "RZT-333": {
      "name": "RZT-333",
      "price": 27700,
      "weight": 343,
      "energyDrain": 451,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 11700,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WM-S60/4": {
      "name": "WM-S60/4",
      "price": 28800,
      "weight": 520,
      "energyDrain": 349,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 4,
      "reloadTime": 10,
      "unlock": "Secret Factory Recon"
    },
    "WR-L24": {
      "name": "WR-L24",
      "price": 29460,
      "weight": 805,
      "energyDrain": 18,
      "weaponLock": "None",
      "attackPower": 3980,
      "numberOfAmmo": 24,
      "ammoType": "Solid",
      "ammoPrice": 417,
      "range": 17700,
      "maximumLock": 0,
      "reloadTime": 16,
      "unlock": "Eliminate Strikers"
    },
    "WM-MVG404": {
      "name": "WM-MVG404",
      "price": 31000,
      "weight": 620,
      "energyDrain": 280,
      "weaponLock": "Standard",
      "attackPower": 1560,
      "numberOfAmmo": 24,
      "ammoType": "Solid",
      "ammoPrice": 252,
      "range": 10000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WR-S100": {
      "name": "WR-S100",
      "price": 32400,
      "weight": 846,
      "energyDrain": 15,
      "weaponLock": "None",
      "attackPower": 1310,
      "numberOfAmmo": 100,
      "ammoType": "Solid",
      "ammoPrice": 110,
      "range": 12500,
      "maximumLock": 0,
      "reloadTime": 12,
      "unlock": "Shop"
    },
    "WC-CN35": {
      "name": "WC-CN35",
      "price": 32750,
      "weight": 593,
      "energyDrain": 11,
      "weaponLock": "Special",
      "attackPower": 338,
      "numberOfAmmo": 250,
      "ammoType": "Solid",
      "ammoPrice": 52,
      "range": 10000,
      "maximumLock": 1,
      "reloadTime": 2,
      "unlock": "Shop"
    },
    "RZ-A1": {
      "name": "RZ-A1",
      "price": 33000,
      "weight": 433,
      "energyDrain": 403,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 15700,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WR-M70": {
      "name": "WR-M70",
      "price": 36500,
      "weight": 718,
      "energyDrain": 24,
      "weaponLock": "None",
      "attackPower": 2240,
      "numberOfAmmo": 70,
      "ammoType": "Solid",
      "ammoPrice": 220,
      "range": 14000,
      "maximumLock": 0,
      "reloadTime": 16,
      "unlock": "Shop"
    },
    "WM-S60/6": {
      "name": "WM-S60/6",
      "price": 38100,
      "weight": 583,
      "energyDrain": 353,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 6,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "RZ-BBP": {
      "name": "RZ-BBP",
      "price": 40900,
      "weight": 454,
      "energyDrain": 566,
      "weaponLock": "Radar",
      "attackPower": "N/A",
      "numberOfAmmo": "N/A",
      "ammoType": "N/A",
      "ammoPrice": "N/A",
      "range": 16300,
      "maximumLock": "N/A",
      "reloadTime": "N/A",
      "unlock": "Shop"
    },
    "WC-LN350": {
      "name": "WC-LN350",
      "price": 41800,
      "weight": 425,
      "energyDrain": 8,
      "weaponLock": "Special",
      "attackPower": 690,
      "numberOfAmmo": 120,
      "ammoType": "Solid",
      "ammoPrice": 108,
      "range": 9000,
      "maximumLock": 1,
      "reloadTime": 6,
      "unlock": "Shop"
    },
    "WM-P4001": {
      "name": "WM-P4001",
      "price": 43800,
      "weight": 755,
      "energyDrain": 320,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WM-MVG802": {
      "name": "WM-MVG802",
      "price": 44000,
      "weight": 718,
      "energyDrain": 220,
      "weaponLock": "Standard",
      "attackPower": 1560,
      "numberOfAmmo": 32,
      "ammoType": "Solid",
      "ammoPrice": 252,
      "range": 10000,
      "maximumLock": 2,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WM-L201": {
      "name": "WM-L201",
      "price": 46200,
      "weight": 835,
      "energyDrain": 180,
      "weaponLock": "Standard",
      "attackPower": 4300,
      "numberOfAmmo": 12,
      "ammoType": "Solid",
      "ammoPrice": 897,
      "range": 12500,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WC-ST120": {
      "name": "WC-ST120",
      "price": 56000,
      "weight": 827,
      "energyDrain": 6,
      "weaponLock": "Special",
      "attackPower": 183,
      "numberOfAmmo": 80,
      "ammoType": "Solid",
      "ammoPrice": 156,
      "range": 8100,
      "maximumLock": 1,
      "reloadTime": 22,
      "unlock": "Shop"
    },
    "WC-XP4000": {
      "name": "WC-XP4000",
      "price": 61000,
      "weight": 318,
      "energyDrain": 364,
      "weaponLock": "Narrow & Deep",
      "attackPower": 770,
      "numberOfAmmo": 100,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 9000,
      "maximumLock": 1,
      "reloadTime": 5,
      "unlock": "Shop"
    },
    "WM-X201": {
      "name": "WM-X201",
      "price": 62250,
      "weight": 720,
      "energyDrain": 250,
      "weaponLock": "Standard",
      "attackPower": 980,
      "numberOfAmmo": 18,
      "ammoType": "Solid",
      "ammoPrice": 1125,
      "range": 12000,
      "maximumLock": 1,
      "reloadTime": 15,
      "unlock": "Shop"
    },
    "WM-PS-2": {
      "name": "WM-PS-2",
      "price": 66700,
      "weight": 1125,
      "energyDrain": 360,
      "weaponLock": "Standard",
      "attackPower": 830,
      "numberOfAmmo": 90,
      "ammoType": "Solid",
      "ammoPrice": 130,
      "range": 9000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WX-S800/2": {
      "name": "WX-S800/2",
      "price": 69400,
      "weight": 1650,
      "energyDrain": 415,
      "weaponLock": "Standard",
      "attackPower": 1120,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 515,
      "range": 11000,
      "maximumLock": 1,
      "reloadTime": 12,
      "unlock": "Shop"
    },
    "WC-01QL": {
      "name": "WC-01QL",
      "price": 69500,
      "weight": 273,
      "energyDrain": 618,
      "weaponLock": "Special",
      "attackPower": 1531,
      "numberOfAmmo": 80,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 12000,
      "maximumLock": 1,
      "reloadTime": 7,
      "unlock": "Shop"
    },
    "WC-GN230": {
      "name": "WC-GN230",
      "price": 75200,
      "weight": 1230,
      "energyDrain": 8,
      "weaponLock": "Narrow & Deep",
      "attackPower": 3520,
      "numberOfAmmo": 15,
      "ammoType": "Solid",
      "ammoPrice": 985,
      "range": 12000,
      "maximumLock": 1,
      "reloadTime": 32,
      "unlock": "Shop"
    },
    "WC-XC8000": {
      "name": "WC-XC8000",
      "price": 78700,
      "weight": 1110,
      "energyDrain": 455,
      "weaponLock": "Narrow & Deep",
      "attackPower": 2065,
      "numberOfAmmo": 50,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 8500,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WX-S800-GF": {
      "name": "WX-S800-GF",
      "price": 90900,
      "weight": 1110,
      "energyDrain": 656,
      "weaponLock": "Standard",
      "attackPower": 1120,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 515,
      "range": 11000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "XCS-9900": {
      "name": "XCS-9900",
      "price": 94500,
      "weight": 1480,
      "energyDrain": 310,
      "weaponLock": "Standard",
      "attackPower": 980,
      "numberOfAmmo": 20,
      "ammoType": "Solid",
      "ammoPrice": 1125,
      "range": 12000,
      "maximumLock": 1,
      "reloadTime": 15,
      "unlock": "Shop"
    }
  },
  "armWeaponsL": {
    "LS-2001": {
      "name": "LS-2001",
      "price": 11500,
      "weight": 123,
      "energyDrain": 28,
      "chargeDrain": 2050,
      "attackPower": 738,
      "unlock": "Starting Part"
    },
    "LS-200G": {
      "name": "LS-200G",
      "price": 29000,
      "weight": 181,
      "energyDrain": 45,
      "chargeDrain": 1700,
      "attackPower": 950,
      "unlock": "Shop"
    },
    "LS-3303": {
      "name": "LS-3303",
      "price": 37200,
      "weight": 224,
      "energyDrain": 43,
      "chargeDrain": 2630,
      "attackPower": 1210,
      "unlock": "Shop"
    },
    "LS-99-MOONLIGHT": {
      "name": "LS-99-MOONLIGHT",
      "price": 54000,
      "weight": 336,
      "energyDrain": 93,
      "chargeDrain": 810,
      "attackPower": 2801,
      "unlock": "Kill \"Struggle\" Leader"
    }
  },
  "armWeaponsR": {
    "WG-RF35": {
      "name": "WG-RF35",
      "price": 11400,
      "weight": 415,
      "energyDrain": 6,
      "weaponLock": "Wide & Shallow",
      "attackPower": 218,
      "numberOfAmmo": 200,
      "ammoType": "Solid",
      "ammoPrice": 18,
      "range": 8500,
      "maximumLock": 1,
      "reloadTime": 5,
      "unlock": "Starting Part"
    },
    "WG-MGA1": {
      "name": "WG-MGA1",
      "price": 14000,
      "weight": 370,
      "energyDrain": 4,
      "weaponLock": "Wide & Shallow",
      "attackPower": 85,
      "numberOfAmmo": 500,
      "ammoType": "Solid",
      "ammoPrice": 9,
      "range": 6300,
      "maximumLock": 1,
      "reloadTime": 1,
      "unlock": "Shop"
    },
    "WG-HG235": {
      "name": "WG-HG235",
      "price": 19000,
      "weight": 170,
      "energyDrain": 22,
      "weaponLock": "Wide & Shallow",
      "attackPower": 226,
      "numberOfAmmo": 100,
      "ammoType": "Solid",
      "ammoPrice": 68,
      "range": 4800,
      "maximumLock": 1,
      "reloadTime": 5,
      "unlock": "Shop"
    },
    "WG-HG512": {
      "name": "WG-HG512",
      "price": 26200,
      "weight": 324,
      "energyDrain": 10,
      "weaponLock": "Wide & Shallow",
      "attackPower": 437,
      "numberOfAmmo": 120,
      "ammoType": "Solid",
      "ammoPrice": 48,
      "range": 5800,
      "maximumLock": 1,
      "reloadTime": 5,
      "unlock": "Shop"
    },
    "WG-MG500": {
      "name": "WG-MG500",
      "price": 28400,
      "weight": 458,
      "energyDrain": 4,
      "weaponLock": "Wide & Shallow",
      "attackPower": 135,
      "numberOfAmmo": 500,
      "ammoType": "Solid",
      "ammoPrice": 15,
      "range": 7800,
      "maximumLock": 1,
      "reloadTime": 2,
      "unlock": "Shop"
    },
    "WG-RF/P": {
      "name": "WG-RF/P",
      "price": 33100,
      "weight": 308,
      "energyDrain": 4,
      "weaponLock": "Special",
      "attackPower": 612,
      "numberOfAmmo": 60,
      "ammoType": "Solid",
      "ammoPrice": 95,
      "range": 16000,
      "maximumLock": 1,
      "reloadTime": 12,
      "unlock": "Shop"
    },
    "WG-RF/5": {
      "name": "WG-RF/5",
      "price": 41500,
      "weight": 295,
      "energyDrain": 5,
      "weaponLock": "Special",
      "attackPower": 530,
      "numberOfAmmo": 80,
      "ammoType": "Solid",
      "ammoPrice": 83,
      "range": 20000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WG-AR1000": {
      "name": "WG-AR1000",
      "price": 42300,
      "weight": 516,
      "energyDrain": 8,
      "weaponLock": "Special",
      "attackPower": 105,
      "numberOfAmmo": 1000,
      "ammoType": "Solid",
      "ammoPrice": 12,
      "range": 7000,
      "maximumLock": 1,
      "reloadTime": 1,
      "unlock": "Shop"
    },
    "WG-XP1000": {
      "name": "WG-XP1000",
      "price": 46000,
      "weight": 188,
      "energyDrain": 246,
      "weaponLock": "Special",
      "attackPower": 302,
      "numberOfAmmo": 180,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 15000,
      "maximumLock": 1,
      "reloadTime": 3,
      "unlock": "Shop"
    },
    "WG-XC4": {
      "name": "WG-XC4",
      "price": 51000,
      "weight": 686,
      "energyDrain": 308,
      "weaponLock": "Special",
      "attackPower": 820,
      "numberOfAmmo": 100,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 8000,
      "maximumLock": 1,
      "reloadTime": 10,
      "unlock": "Shop"
    },
    "WG-FG99": {
      "name": "WG-FG99",
      "price": 58300,
      "weight": 352,
      "energyDrain": 9,
      "weaponLock": "None",
      "attackPower": 512,
      "numberOfAmmo": 500,
      "ammoType": "Solid",
      "ammoPrice": 41,
      "range": 900,
      "maximumLock": 1,
      "reloadTime": 1,
      "unlock": "Destroy Intruders"
    },
    "WG-B2120": {
      "name": "WG-B2120",
      "price": 59740,
      "weight": 778,
      "energyDrain": 13,
      "weaponLock": "Narrow & Deep",
      "attackPower": 1250,
      "numberOfAmmo": 80,
      "ammoType": "Solid",
      "ammoPrice": 163,
      "range": 8200,
      "maximumLock": 1,
      "reloadTime": 16,
      "unlock": "Shop"
    },
    "WG-XP2000": {
      "name": "WG-XP2000",
      "price": 61500,
      "weight": 265,
      "energyDrain": 285,
      "weaponLock": "Special",
      "attackPower": 435,
      "numberOfAmmo": 200,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 18000,
      "maximumLock": 1,
      "reloadTime": 6,
      "unlock": "Shop"
    },
    "WG-1-KARASAWA": {
      "name": "WG-1-KARASAWA",
      "price": 75000,
      "weight": 1000,
      "energyDrain": 422,
      "weaponLock": "Special",
      "attackPower": 1550,
      "numberOfAmmo": 50,
      "ammoType": "Energy",
      "ammoPrice": 0,
      "range": 10000,
      "maximumLock": 1,
      "reloadTime": 8,
      "unlock": "Destroy Fuel Depot"
    },
    "WG-B2180": {
      "name": "WG-B2180",
      "price": 75900,
      "weight": 905,
      "energyDrain": 16,
      "weaponLock": "Narrow & Deep",
      "attackPower": 1930,
      "numberOfAmmo": 50,
      "ammoType": "Solid",
      "ammoPrice": 348,
      "range": 7800,
      "maximumLock": 1,
      "reloadTime": 22,
      "unlock": "Shop"
    }
  }
};