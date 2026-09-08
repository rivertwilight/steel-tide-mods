const ARMOR_MATRIX = {
  // rapid-fire small arms: shred soft skins, ping off armor plate
  mg: { light: 1.5, medium: 0.8, heavy: 0.4, structure: 0.35, ship: 0.5, air: 0.7 },
  // light autocannons: soft skins and light armor, poor against heavy plate
  autocannon: { light: 1.5, medium: 1, heavy: 0.5, structure: 0.5, ship: 0.7 },
  // tank guns: built for armored duels, over-penetrate soft targets
  cannon: { light: 0.6, medium: 1.3, heavy: 1, structure: 0.8, ship: 0.9 },
  // shaped-charge guided missiles: heavy armor only, wasted on light vehicles
  at: { light: 0.4, medium: 1.1, heavy: 1.8, structure: 0.7, ship: 1 },
  // high explosive: blast shreds soft targets and buildings, heavy plate shrugs
  he: { light: 1.2, medium: 1, heavy: 0.75, structure: 1.6, ship: 1 },
  // unguided rocket pods: vehicles of any weight, poor against bunkers
  rocket: { light: 1.4, medium: 1.4, heavy: 0.9, structure: 0.7, ship: 0.9 },
  // naval guns: general-purpose bombardment of shore and ship
  navgun: { light: 1, medium: 1, heavy: 0.75, structure: 0.75, ship: 1 },
  ashm: { ship: 1.6 },
  torpedo: { ship: 1.3, sub: 1.2 },
  aa: { air: 1 }
};
const w = (def) => ({ ...def, mult: { ...ARMOR_MATRIX[def.cls], ...def.mult } });
const resolveWeapon = w;
const MG = w({
  id: "mg",
  cls: "mg",
  dmg: 7,
  reload: 0.4,
  range: 3.6,
  projectile: "bullet",
  speed: 500,
  targets: ["ground"],
  turret: true,
  muzzleOffset: 9.5,
  sound: "mg"
});
const DEFS = {
  // ================================================================= LAND
  engineer: {
    id: "engineer",
    kind: "unit",
    aliases: ["eng", "builder"],
    domain: "ground",
    tier: 1,
    cost: 90,
    buildTime: 8,
    pop: 1,
    hp: 200,
    armor: "light",
    speed: 70,
    turnRate: 5,
    vision: 7,
    radius: 8,
    weapons: [],
    builds: ["extractor", "power", "factory", "airbase", "navyard", "mgturret", "cannonturret", "aaturret", "interceptor", "repairtower", "radar", "reactor", "nukesilo", "hq"],
    buildRate: 30,
    trail: "tread",
    sprite: "u.engineer"
  },
  buggy: {
    id: "buggy",
    kind: "unit",
    aliases: ["recon", "jeep"],
    domain: "ground",
    tier: 1,
    cost: 60,
    buildTime: 5,
    pop: 1,
    hp: 150,
    armor: "light",
    speed: 120,
    turnRate: 6,
    vision: 10,
    radius: 7,
    weapons: [{ ...MG, sound: "mg" }],
    trail: "tire",
    sprite: "u.buggy"
  },
  ltank: {
    id: "ltank",
    kind: "unit",
    aliases: ["wolf", "light"],
    domain: "ground",
    tier: 1,
    cost: 120,
    buildTime: 9,
    pop: 1,
    hp: 300,
    armor: "medium",
    speed: 75,
    turnRate: 4.5,
    vision: 7,
    radius: 9,
    fireOnMove: true,
    weapons: [w({
      id: "autocannon",
      cls: "autocannon",
      dmg: 18,
      reload: 0.55,
      range: 4,
      projectile: "bullet",
      speed: 520,
      targets: ["ground", "ship"],
      turret: true,
      muzzleOffset: 16.5,
      sound: "autocannon"
    })],
    trail: "tread",
    sprite: "u.ltank",
    turretSprite: "tur.ltank"
  },
  mbt: {
    id: "mbt",
    kind: "unit",
    aliases: ["bison", "tank"],
    domain: "ground",
    tier: 2,
    cost: 280,
    buildTime: 18,
    pop: 2,
    hp: 620,
    armor: "heavy",
    speed: 60,
    turnRate: 3.6,
    vision: 7,
    radius: 10,
    fireOnMove: true,
    weapons: [w({
      id: "cannon",
      cls: "cannon",
      dmg: 60,
      reload: 1.8,
      range: 4.6,
      projectile: "shell",
      speed: 420,
      targets: ["ground", "ship"],
      turret: true,
      muzzleOffset: 23,
      splash: 10,
      sound: "cannon"
    })],
    trail: "tread",
    sprite: "u.mbt",
    turretSprite: "tur.mbt"
  },
  htank: {
    id: "htank",
    kind: "unit",
    aliases: ["mammoth", "heavy"],
    domain: "ground",
    tier: 3,
    cost: 900,
    buildTime: 45,
    pop: 4,
    hp: 1900,
    armor: "heavy",
    speed: 42,
    turnRate: 2.6,
    vision: 7,
    radius: 12,
    requires: ["radar"],
    cargoWeight: 4,
    weapons: [w({
      id: "twincannon",
      cls: "cannon",
      dmg: 55,
      reload: 1.8,
      range: 5.2,
      projectile: "shell",
      speed: 420,
      targets: ["ground", "ship"],
      mult: { heavy: 1.1, structure: 1 },
      turret: true,
      muzzleOffset: 26.5,
      splash: 12,
      burst: 2,
      burstDelay: 0.18,
      sound: "cannon"
    })],
    trail: "tread",
    sprite: "u.htank",
    turretSprite: "tur.htank"
  },
  td: {
    id: "td",
    kind: "unit",
    aliases: ["viper", "at"],
    domain: "ground",
    tier: 2,
    cost: 320,
    buildTime: 20,
    pop: 2,
    hp: 340,
    armor: "medium",
    speed: 65,
    turnRate: 4,
    vision: 8,
    radius: 9,
    fireOnMove: true,
    weapons: [w({
      id: "atgm",
      cls: "at",
      dmg: 120,
      reload: 2.8,
      range: 7,
      projectile: "missile",
      speed: 300,
      targets: ["ground", "ship"],
      turret: true,
      muzzleOffset: 11.5,
      homing: true,
      interceptable: true,
      sound: "missile"
    })],
    trail: "tire",
    sprite: "u.td",
    turretSprite: "tur.td"
  },
  flak: {
    id: "flak",
    kind: "unit",
    aliases: ["flaktrack", "aa"],
    domain: "ground",
    tier: 1,
    cost: 170,
    buildTime: 12,
    pop: 1,
    hp: 280,
    armor: "medium",
    speed: 70,
    turnRate: 4.5,
    vision: 9,
    radius: 9,
    weapons: [w({
      id: "flakgun",
      cls: "aa",
      dmg: 22,
      reload: 0.7,
      range: 5.5,
      projectile: "flak",
      speed: 460,
      targets: ["air"],
      turret: true,
      muzzleOffset: 15,
      sound: "flak"
    })],
    trail: "tread",
    sprite: "u.flak",
    turretSprite: "tur.flak"
  },
  sam: {
    id: "sam",
    kind: "unit",
    aliases: ["hawk", "aalauncher"],
    domain: "ground",
    tier: 2,
    cost: 400,
    buildTime: 22,
    pop: 2,
    hp: 240,
    armor: "medium",
    speed: 60,
    turnRate: 4,
    vision: 10,
    radius: 9,
    weapons: [w({
      id: "sam",
      cls: "aa",
      dmg: 90,
      reload: 2.5,
      range: 11.25,
      projectile: "missile",
      speed: 420,
      targets: ["air"],
      turret: true,
      muzzleOffset: 14,
      homing: true,
      sound: "missile"
    })],
    trail: "tire",
    sprite: "u.sam",
    turretSprite: "tur.sam"
  },
  arty: {
    id: "arty",
    kind: "unit",
    aliases: ["thunder", "howitzer"],
    domain: "ground",
    tier: 2,
    cost: 420,
    buildTime: 24,
    pop: 2,
    hp: 220,
    armor: "light",
    speed: 48,
    turnRate: 3,
    vision: 8,
    radius: 10,
    weapons: [w({
      id: "howitzer",
      cls: "he",
      dmg: 110,
      reload: 5,
      range: 11,
      minRange: 3,
      projectile: "shell",
      speed: 260,
      targets: ["ground", "ship"],
      muzzleOffset: 17,
      splash: 40,
      arc: true,
      spread: 26,
      sound: "arty"
    })],
    trail: "tread",
    sprite: "u.arty"
  },
  mlrs: {
    id: "mlrs",
    kind: "unit",
    aliases: ["tempest", "rockets"],
    domain: "ground",
    tier: 3,
    cost: 760,
    buildTime: 40,
    pop: 3,
    hp: 380,
    armor: "medium",
    speed: 45,
    turnRate: 2.8,
    vision: 8,
    radius: 11,
    requires: ["radar"],
    cargoWeight: 4,
    weapons: [w({
      id: "rockets",
      cls: "he",
      dmg: 54,
      reload: 7,
      range: 13,
      minRange: 4,
      projectile: "rocket",
      speed: 300,
      targets: ["ground", "ship"],
      muzzleOffset: 16.5,
      splash: 40,
      arc: true,
      burst: 8,
      burstDelay: 0.16,
      spread: 36,
      turret: true,
      sound: "rocket"
    })],
    trail: "tread",
    sprite: "u.mlrs",
    turretSprite: "tur.mlrs"
  },
  /**
   * Level 3 of the war factory. The Salamander is the siege piece for the
   * turtle Tier 3 builds — Bastions behind Interrupters, where the Tempest's
   * rockets are shot out of the sky: its round is a *shell*, which point
   * defence never touches, with a blast two tiles across that hits everything
   * in it at full value. The blast does not know whose side it is on
   * (`friendlyFire`): the Mammoths escorting it burn if they stand in the
   * footprint, and its minimum range is what keeps it from catching itself.
   * Out-reached by nearly everything, so it earns its price against clusters
   * and only with something in front of it (salamander.test.ts).
   */
  salamander: {
    id: "salamander",
    kind: "unit",
    aliases: ["sala", "mortar"],
    domain: "ground",
    tier: 3,
    cost: 800,
    buildTime: 42,
    pop: 3,
    hp: 850,
    armor: "heavy",
    speed: 45,
    turnRate: 2.8,
    vision: 7,
    radius: 11,
    requires: ["radar"],
    weapons: [w({
      id: "thermobaric",
      cls: "he",
      dmg: 260,
      reload: 4,
      range: 4.5,
      minRange: 3,
      projectile: "shell",
      speed: 240,
      targets: ["ground", "ship"],
      mult: { heavy: 0.6 },
      turret: true,
      muzzleOffset: 13,
      splash: 64,
      arc: true,
      spread: 16,
      friendlyFire: true,
      sound: "arty"
    })],
    trail: "tread",
    sprite: "u.salamander",
    turretSprite: "tur.salamander"
  },
  /**
   * Point defence on tracks: the Interrupter's magazine on a hull and no gun
   * at all. Weaker than the tower on purpose — six rounds and one back every
   * 1.5 s against the tower's eight and one every 0.75 s — so one Bulwark
   * thins a Tempest's salvo (most of it down, never all of it: a rocket is
   * inside its ring for under a second, and the reload cannot make up two)
   * and two blank it; it never turns a bad fight into a good one alone
   * (bulwark.test.ts). Shells still land.
   */
  bulwark: {
    id: "bulwark",
    kind: "unit",
    aliases: ["interrupter", "pd"],
    domain: "ground",
    tier: 3,
    cost: 650,
    buildTime: 32,
    pop: 2,
    hp: 520,
    armor: "medium",
    speed: 60,
    turnRate: 4,
    vision: 9,
    radius: 10,
    requires: ["radar"],
    weapons: [],
    interceptRange: 5,
    interceptMag: 6,
    interceptReload: 1.5,
    interceptMuzzleOffset: 12,
    trail: "tread",
    sprite: "u.bulwark",
    turretSprite: "tur.bulwark"
  },
  // ================================================================== SEA
  gunboat: {
    id: "gunboat",
    kind: "unit",
    aliases: ["patrol", "boat"],
    domain: "ship",
    tier: 1,
    cost: 130,
    buildTime: 10,
    pop: 1,
    hp: 260,
    armor: "ship",
    speed: 90,
    turnRate: 3.4,
    vision: 9,
    radius: 9,
    weapons: [w({
      id: "autocannon",
      cls: "autocannon",
      dmg: 16,
      reload: 0.5,
      range: 4.2,
      projectile: "bullet",
      speed: 520,
      targets: ["ground", "ship"],
      mult: { ship: 0.8 },
      turret: true,
      muzzleOffset: 6,
      sound: "autocannon"
    })],
    trail: "wake",
    sprite: "u.gunboat",
    turretSprite: "tur.gunboat"
  },
  mboat: {
    id: "mboat",
    kind: "unit",
    aliases: ["missileboat", "corvette"],
    domain: "ship",
    tier: 1,
    cost: 280,
    buildTime: 18,
    pop: 2,
    hp: 300,
    armor: "ship",
    speed: 80,
    turnRate: 3,
    vision: 9,
    radius: 10,
    weapons: [w({
      id: "ashm",
      cls: "ashm",
      dmg: 170,
      reload: 3.5,
      range: 8,
      projectile: "missile",
      speed: 320,
      targets: ["ship"],
      homing: true,
      turret: true,
      sound: "missile"
    })],
    trail: "wake",
    sprite: "u.mboat"
  },
  frigate: {
    id: "frigate",
    kind: "unit",
    aliases: ["aegis", "escort"],
    domain: "ship",
    tier: 2,
    cost: 600,
    buildTime: 30,
    pop: 2,
    hp: 900,
    armor: "ship",
    speed: 65,
    turnRate: 2.6,
    vision: 10,
    radius: 13,
    weapons: [
      w({
        id: "navgun",
        cls: "navgun",
        dmg: 40,
        reload: 1.5,
        range: 5.5,
        projectile: "shell",
        speed: 420,
        targets: ["ground", "ship"],
        turret: true,
        muzzleOffset: 7,
        splash: 8,
        sound: "cannon"
      }),
      w({
        id: "navsam",
        cls: "aa",
        dmg: 80,
        reload: 2,
        range: 8.5,
        projectile: "missile",
        speed: 430,
        targets: ["air"],
        homing: true,
        sound: "missile"
      })
    ],
    trail: "wake",
    sprite: "u.frigate",
    turretSprite: "tur.frigate"
  },
  destroyer: {
    id: "destroyer",
    kind: "unit",
    aliases: ["orca", "dd"],
    domain: "ship",
    tier: 2,
    cost: 700,
    buildTime: 34,
    pop: 3,
    hp: 1300,
    armor: "ship",
    speed: 60,
    turnRate: 2.4,
    vision: 10,
    sonar: 9,
    radius: 15,
    weapons: [
      w({
        id: "navgun",
        cls: "navgun",
        dmg: 70,
        reload: 1.8,
        range: 6.2,
        projectile: "shell",
        speed: 420,
        targets: ["ground", "ship"],
        mult: { medium: 1.1, heavy: 0.8, structure: 0.8 },
        turret: true,
        muzzleOffset: 14.5,
        splash: 10,
        sound: "cannon"
      }),
      w({
        // anti-submarine torpedoes: out-range the sub's own, bite hardest below
        id: "torpedo",
        cls: "torpedo",
        dmg: 160,
        reload: 3.2,
        range: 7,
        projectile: "torpedo",
        speed: 150,
        targets: ["ship", "sub"],
        mult: { ship: 1, sub: 1.9 },
        homing: true,
        sound: "torpedo"
      })
    ],
    trail: "wake",
    sprite: "u.destroyer",
    turretSprite: "tur.destroyer"
  },
  /**
   * The Barracuda is the second launcher: with a radar and a reactor standing
   * it fabricates one warhead of its own, at the silo's price and pace, and
   * fires it from wherever it is lying — the strike nobody can see coming.
   */
  sub: {
    id: "sub",
    kind: "unit",
    aliases: ["barracuda", "submarine"],
    domain: "ship",
    tier: 2,
    cost: 480,
    buildTime: 26,
    pop: 2,
    hp: 550,
    armor: "sub",
    speed: 55,
    turnRate: 2.6,
    vision: 8,
    sonar: 8,
    radius: 12,
    underwater: true,
    nukeCapacity: 1,
    nukeCost: 2500,
    nukeTime: 180,
    weapons: [w({
      id: "torpedo",
      cls: "torpedo",
      dmg: 160,
      reload: 3.5,
      range: 6.5,
      projectile: "torpedo",
      speed: 150,
      targets: ["ship", "sub"],
      homing: true,
      sound: "torpedo"
    })],
    sprite: "u.sub"
  },
  btlship: {
    id: "btlship",
    kind: "unit",
    aliases: ["sovereign", "battleship"],
    domain: "ship",
    tier: 3,
    cost: 1700,
    buildTime: 70,
    pop: 5,
    hp: 3200,
    armor: "ship",
    speed: 45,
    turnRate: 1.6,
    vision: 10,
    radius: 20,
    requires: ["radar"],
    weapons: [w({
      id: "bigguns",
      cls: "he",
      dmg: 120,
      reload: 5,
      range: 14,
      minRange: 2.5,
      projectile: "shell",
      speed: 300,
      targets: ["ground", "ship"],
      mult: { heavy: 1, ship: 1.2 },
      turret: true,
      muzzleOffset: 19,
      splash: 45,
      arc: true,
      burst: 3,
      burstDelay: 0.25,
      spread: 40,
      sound: "arty"
    })],
    trail: "wake",
    sprite: "u.btlship",
    turretSprite: "tur.btlship"
  },
  seatrans: {
    id: "seatrans",
    kind: "unit",
    aliases: ["landingcraft", "lst"],
    domain: "ship",
    tier: 1,
    cost: 220,
    buildTime: 14,
    pop: 1,
    hp: 500,
    armor: "ship",
    speed: 70,
    turnRate: 2.8,
    vision: 8,
    radius: 13,
    transportCap: 4,
    weapons: [],
    trail: "wake",
    sprite: "u.seatrans"
  },
  /**
   * Level 3 of the naval yard. The Kraken shells the shore from under the
   * water — two cruise missiles every six seconds at ground targets only, no
   * torpedo, nothing to fight a ship with. Vision 6 against range 12: it
   * shoots at what the team can see, or force-fires at a point the player
   * remembers. Every missile is `interceptable`, so an Interrupter over the
   * target blanks it the way it blanks a Tempest (kraken.test.ts).
   */
  kraken: {
    id: "kraken",
    kind: "unit",
    aliases: ["cruisesub", "missilesub"],
    domain: "ship",
    tier: 3,
    cost: 1500,
    buildTime: 60,
    pop: 4,
    hp: 620,
    armor: "sub",
    speed: 50,
    turnRate: 2.4,
    vision: 6,
    sonar: 6,
    radius: 13,
    underwater: true,
    requires: ["radar"],
    weapons: [w({
      id: "cruise",
      cls: "he",
      dmg: 150,
      reload: 6,
      range: 12,
      minRange: 3,
      projectile: "missile",
      speed: 260,
      targets: ["ground"],
      homing: true,
      interceptable: true,
      splash: 36,
      burst: 2,
      burstDelay: 0.6,
      sound: "missile"
    })],
    sprite: "u.kraken"
  },
  /**
   * A transport that nobody without sonar can see: a hold of 4 — one
   * Mammoth, two Vipers, four engineers. The beach is the only door: boarding
   * is walking to it, and a ship unloads only onto the tile beside its hull,
   * so it has to nose right up to a shore. Unarmed, and its cargo dies with
   * it (moray.test.ts).
   */
  moray: {
    id: "moray",
    kind: "unit",
    aliases: ["spysub", "infiltrator"],
    domain: "ship",
    tier: 3,
    cost: 700,
    buildTime: 34,
    pop: 2,
    hp: 450,
    armor: "sub",
    speed: 62,
    turnRate: 2.8,
    vision: 6,
    sonar: 5,
    radius: 12,
    underwater: true,
    transportCap: 4,
    requires: ["radar"],
    weapons: [],
    sprite: "u.moray"
  },
  // ================================================================== AIR
  drone: {
    id: "drone",
    kind: "unit",
    aliases: ["scout", "uav"],
    domain: "air",
    tier: 1,
    cost: 40,
    buildTime: 4,
    pop: 1,
    hp: 90,
    armor: "air",
    speed: 130,
    turnRate: 3.2,
    vision: 12,
    radius: 8,
    altitude: 12,
    hovers: true,
    weapons: [],
    sprite: "u.drone"
  },
  fighter: {
    id: "fighter",
    kind: "unit",
    aliases: ["falcon", "cap"],
    domain: "air",
    tier: 2,
    cost: 380,
    buildTime: 22,
    pop: 2,
    hp: 320,
    armor: "air",
    speed: 190,
    turnRate: 2.8,
    vision: 11,
    radius: 9,
    altitude: 14,
    weapons: [w({
      id: "aam",
      cls: "aa",
      dmg: 100,
      reload: 2.2,
      range: 6,
      projectile: "missile",
      speed: 480,
      targets: ["air"],
      homing: true,
      sound: "missile"
    })],
    sprite: "u.fighter"
  },
  heli: {
    id: "heli",
    kind: "unit",
    aliases: ["cobra", "attackheli"],
    domain: "air",
    tier: 1,
    cost: 340,
    buildTime: 20,
    pop: 2,
    hp: 300,
    armor: "air",
    speed: 95,
    turnRate: 3.4,
    vision: 9,
    radius: 9,
    altitude: 11,
    hovers: true,
    weapons: [w({
      // a raider as much as a tank hunter: keeps some bite against soft targets
      id: "atgm",
      cls: "at",
      dmg: 90,
      reload: 2.6,
      range: 5.5,
      projectile: "missile",
      speed: 300,
      targets: ["ground", "ship"],
      mult: { light: 0.6, structure: 0.8 },
      homing: true,
      sound: "missile"
    })],
    sprite: "u.heli"
  },
  jet: {
    id: "jet",
    kind: "unit",
    aliases: ["thunderbolt", "strikejet"],
    domain: "air",
    tier: 2,
    cost: 440,
    buildTime: 25,
    pop: 2,
    hp: 360,
    armor: "air",
    speed: 160,
    turnRate: 2.4,
    vision: 10,
    radius: 10,
    altitude: 14,
    weapons: [w({
      id: "rockets",
      cls: "rocket",
      dmg: 18,
      reload: 2.4,
      range: 4.5,
      projectile: "rocket",
      speed: 340,
      targets: ["ground", "ship"],
      burst: 4,
      burstDelay: 0.1,
      splash: 12,
      spread: 18,
      sound: "rocket"
    })],
    sprite: "u.jet"
  },
  mjet: {
    id: "mjet",
    kind: "unit",
    aliases: ["albatross", "antiship"],
    domain: "air",
    tier: 2,
    cost: 520,
    buildTime: 28,
    pop: 2,
    hp: 380,
    armor: "air",
    speed: 150,
    turnRate: 2.2,
    vision: 11,
    radius: 10,
    altitude: 14,
    weapons: [w({
      id: "ashm",
      cls: "ashm",
      dmg: 170,
      reload: 4.5,
      range: 8,
      projectile: "missile",
      speed: 340,
      targets: ["ship"],
      mult: { ship: 1.7 },
      homing: true,
      sound: "missile"
    })],
    sprite: "u.mjet"
  },
  bomber: {
    id: "bomber",
    kind: "unit",
    aliases: ["vulture", "levelbomber"],
    domain: "air",
    tier: 2,
    // siege from the air is the strongest thing an airbase makes, and it is
    // priced and armoured so a SAM site is a real answer to it
    cost: 1e3,
    buildTime: 40,
    pop: 3,
    hp: 560,
    armor: "air",
    speed: 110,
    turnRate: 1.8,
    vision: 9,
    radius: 12,
    altitude: 16,
    weapons: [w({
      // heavy bombs: nothing on the ground shrugs them off
      id: "bombs",
      cls: "he",
      dmg: 70,
      reload: 6,
      range: 2.4,
      projectile: "bomb",
      speed: 120,
      targets: ["ground", "ship"],
      mult: { medium: 1.2, heavy: 1, ship: 1.1 },
      burst: 5,
      burstDelay: 0.14,
      splash: 35,
      spread: 20,
      sound: "bomb"
    })],
    sprite: "u.bomber"
  },
  theli: {
    id: "theli",
    kind: "unit",
    aliases: ["pelican", "transportheli"],
    domain: "air",
    tier: 1,
    cost: 280,
    buildTime: 16,
    pop: 1,
    hp: 380,
    armor: "air",
    speed: 100,
    turnRate: 3,
    vision: 8,
    radius: 11,
    altitude: 12,
    transportCap: 2,
    hovers: true,
    weapons: [],
    sprite: "u.theli"
  },
  c47: {
    id: "c47",
    kind: "unit",
    aliases: ["skytrain", "dakota"],
    domain: "air",
    tier: 2,
    cost: 650,
    buildTime: 34,
    pop: 3,
    hp: 720,
    armor: "air",
    speed: 120,
    turnRate: 1.9,
    vision: 9,
    radius: 15,
    altitude: 16,
    transportCap: 5,
    landsForCargo: true,
    weapons: [],
    sprite: "u.c47"
  },
  gunship: {
    id: "gunship",
    kind: "unit",
    aliases: ["spectre", "ac130"],
    domain: "air",
    tier: 3,
    cost: 1600,
    buildTime: 60,
    pop: 5,
    hp: 1500,
    armor: "air",
    speed: 90,
    turnRate: 1.6,
    vision: 10,
    radius: 12,
    altitude: 16,
    requires: ["radar"],
    weapons: [w({
      // the T3 generalist: pays for a cannon that has no bad matchup
      id: "gatcannon",
      cls: "autocannon",
      dmg: 35,
      reload: 0.45,
      range: 5.5,
      projectile: "shell",
      speed: 480,
      targets: ["ground", "ship"],
      mult: { light: 1.2, medium: 1.2, heavy: 1.1, structure: 1, ship: 1 },
      // side-firing: the gunship shoots out of its orbit instead of nose-on
      turret: true,
      splash: 8,
      sound: "autocannon"
    })],
    sprite: "u.gunship"
  },
  /**
   * Level 3 of the airbase. The Wraith carries two heavy bombs instead of
   * the Vulture's five: one pass puts 832 onto a building, which is a Radar
   * Station, a SAM Site or an Interrupter in a single run. Its `stealth` is
   * a range: an enemy sees it only within 4 tiles of one of their units or
   * buildings, or 8 of their radar (`detect`), so AA elsewhere in the base
   * never joins in and whatever stands at the target gets its shots late.
   * The counters are the cheap ones — flak and gatlings beside the things
   * worth keeping — and a Falcon patrol over them (wraith.test.ts).
   */
  wraith: {
    id: "wraith",
    kind: "unit",
    aliases: ["stealth", "stealthbomber"],
    domain: "air",
    tier: 3,
    cost: 1400,
    buildTime: 55,
    pop: 4,
    hp: 450,
    armor: "air",
    speed: 135,
    turnRate: 2,
    vision: 9,
    radius: 11,
    altitude: 16,
    stealth: 4,
    requires: ["radar"],
    weapons: [w({
      id: "heavybombs",
      cls: "he",
      dmg: 260,
      reload: 8,
      range: 2.4,
      projectile: "bomb",
      speed: 120,
      targets: ["ground", "ship"],
      mult: { light: 1, medium: 0.9, heavy: 0.6 },
      burst: 2,
      burstDelay: 0.2,
      splash: 36,
      spread: 10,
      sound: "bomb"
    })],
    sprite: "u.wraith"
  },
  /**
   * The first aircraft that can find a submarine: dipping sonar and homing
   * torpedoes that bite hardest below. A torpedo dropped over land fizzles on
   * the spot — the engine does that to every torpedo — so the Cormorant
   * attacks from over the sea, and its reach (5) is inside the Aegis
   * frigate's missiles (8.5), so a screened fleet is closed to it
   * (cormorant.test.ts).
   */
  cormorant: {
    id: "cormorant",
    kind: "unit",
    aliases: ["asw", "aswheli"],
    domain: "air",
    tier: 3,
    cost: 700,
    buildTime: 34,
    pop: 2,
    hp: 340,
    armor: "air",
    // the longest sonar in the game — a tile past the Orca's, so it is the
    // one thing that hears a submarine before the submarine's escort hears it
    speed: 92,
    turnRate: 3.2,
    vision: 9,
    sonar: 10,
    radius: 10,
    altitude: 11,
    hovers: true,
    requires: ["radar"],
    weapons: [w({
      id: "airtorpedo",
      cls: "torpedo",
      dmg: 140,
      reload: 4,
      range: 5,
      projectile: "torpedo",
      speed: 150,
      targets: ["ship", "sub"],
      mult: { ship: 0.9, sub: 1.8 },
      homing: true,
      sound: "torpedo"
    })],
    sprite: "u.cormorant"
  },
  /**
   * The nuclear warhead in flight. Not built at any factory: a silo or an
   * armed submarine launches one, and from then on it is an aircraft with no
   * gun and no orders, flying a straight line at the point it was sent to
   * (`Game.tickWarhead`). Only a *veteran* can shoot it down — a unit of
   * rank 2 or better whose weapons reach the sky (`canEngage` in combat.ts,
   * `WARHEAD_MIN_RANK`); a green unit or any emplacement, which never ranks,
   * cannot lock on to it, fire at it or scratch it with a stray burst. The
   * hit points are the balance among those who can — one veteran Hawk under
   * its path is not enough and a row of them is (nuke.test.ts pins both).
   * Its `requires` is what every launcher needs to fabricate or fire one.
   */
  warhead: {
    id: "warhead",
    kind: "unit",
    aliases: ["nuke", "nuclear"],
    domain: "air",
    tier: 3,
    warhead: true,
    cost: 0,
    buildTime: 0,
    pop: 0,
    hp: 500,
    armor: "air",
    speed: 96,
    turnRate: 0,
    vision: 0,
    radius: 7,
    altitude: 36,
    weapons: [],
    requires: ["radar", "reactor"],
    sprite: "u.warhead"
  },
  // ============================================================ BUILDINGS
  hq: {
    id: "hq",
    kind: "building",
    domain: "none",
    tier: 1,
    isHQ: true,
    cost: 2500,
    buildTime: 60,
    pop: 0,
    hp: 4e3,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 10,
    radius: 60,
    fw: 4,
    fh: 4,
    weapons: [],
    produces: ["engineer"],
    power: 10,
    sprite: "u.hq"
  },
  extractor: {
    id: "extractor",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 120,
    buildTime: 10,
    pop: 0,
    hp: 600,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 5,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    metalRate: 1.4,
    needsDeposit: true,
    power: -4,
    upgradesTo: "extractor2",
    upgradeCost: 190,
    upgradeTime: 16,
    sprite: "u.extractor"
  },
  extractor2: {
    id: "extractor2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 310,
    buildTime: 26,
    pop: 0,
    hp: 950,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 5,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    metalRate: 3,
    needsDeposit: true,
    power: -8,
    upgradesTo: "extractor3",
    upgradeCost: 450,
    upgradeTime: 30,
    sprite: "u.extractor2"
  },
  extractor3: {
    id: "extractor3",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 760,
    buildTime: 56,
    pop: 0,
    hp: 1700,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    metalRate: 8,
    needsDeposit: true,
    power: -15,
    sprite: "u.extractor3"
  },
  power: {
    id: "power",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 140,
    buildTime: 12,
    pop: 0,
    hp: 500,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 5,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    power: 20,
    upgradesTo: "power2",
    upgradeCost: 260,
    upgradeTime: 18,
    sprite: "u.power"
  },
  power2: {
    id: "power2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 400,
    buildTime: 30,
    pop: 0,
    hp: 900,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 5,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    power: 60,
    upgradesTo: "power3",
    upgradeCost: 700,
    upgradeTime: 36,
    sprite: "u.power2"
  },
  power3: {
    id: "power3",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 1100,
    buildTime: 66,
    pop: 0,
    hp: 1800,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    power: 210,
    sprite: "u.power3"
  },
  factory: {
    id: "factory",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 320,
    buildTime: 20,
    pop: 0,
    hp: 1500,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -8,
    produces: ["engineer", "buggy", "ltank", "flak"],
    upgradesTo: "factory2",
    upgradeCost: 420,
    upgradeTime: 25,
    sprite: "u.factory"
  },
  factory2: {
    id: "factory2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 740,
    buildTime: 45,
    pop: 0,
    hp: 2200,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -12,
    produces: ["engineer", "buggy", "ltank", "flak", "mbt", "td", "sam", "arty", "htank", "mlrs"],
    upgradesTo: "factory3",
    upgradeCost: 900,
    upgradeTime: 45,
    sprite: "u.factory2"
  },
  /**
   * Level 3. Each production line upgrades once more, in place, and the
   * upgrade needs a Radar Station (`requires`, checked by `cmdUpgrade` on the
   * target def) — the one gate Tier 3 has always had. The line produces
   * nothing while it upgrades, and 45–48 s at this stage is a wave: that
   * downtime is the real price. `cost` is cumulative, as on every upgraded
   * def, because the sell refund reads it.
   */
  factory3: {
    id: "factory3",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 1640,
    buildTime: 90,
    pop: 0,
    hp: 3e3,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 7,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -20,
    requires: ["radar"],
    produces: ["engineer", "buggy", "ltank", "flak", "mbt", "td", "sam", "arty", "htank", "mlrs", "salamander", "bulwark"],
    sprite: "u.factory3"
  },
  airbase: {
    id: "airbase",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 380,
    buildTime: 24,
    pop: 0,
    hp: 1400,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 55,
    fw: 4,
    fh: 3,
    weapons: [],
    power: -8,
    produces: ["drone", "heli", "theli"],
    upgradesTo: "airbase2",
    upgradeCost: 450,
    upgradeTime: 26,
    sprite: "u.airbase"
  },
  airbase2: {
    id: "airbase2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 830,
    buildTime: 50,
    pop: 0,
    hp: 2e3,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 55,
    fw: 4,
    fh: 3,
    weapons: [],
    power: -12,
    produces: ["drone", "heli", "theli", "fighter", "jet", "mjet", "bomber", "c47", "gunship"],
    upgradesTo: "airbase3",
    upgradeCost: 950,
    upgradeTime: 48,
    sprite: "u.airbase2"
  },
  airbase3: {
    id: "airbase3",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 1780,
    buildTime: 96,
    pop: 0,
    hp: 2700,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 7,
    radius: 55,
    fw: 4,
    fh: 3,
    weapons: [],
    power: -20,
    requires: ["radar"],
    produces: ["drone", "heli", "theli", "fighter", "jet", "mjet", "bomber", "c47", "gunship", "wraith", "cormorant"],
    sprite: "u.airbase3"
  },
  navyard: {
    id: "navyard",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 350,
    buildTime: 22,
    pop: 0,
    hp: 1500,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -8,
    produces: ["gunboat", "mboat", "seatrans"],
    upgradesTo: "navyard2",
    upgradeCost: 450,
    upgradeTime: 26,
    sprite: "u.navyard"
  },
  navyard2: {
    id: "navyard2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 800,
    buildTime: 48,
    pop: 0,
    hp: 2200,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -12,
    produces: ["gunboat", "mboat", "seatrans", "frigate", "destroyer", "sub", "btlship"],
    upgradesTo: "navyard3",
    upgradeCost: 950,
    upgradeTime: 48,
    sprite: "u.navyard2"
  },
  navyard3: {
    id: "navyard3",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 1750,
    buildTime: 96,
    pop: 0,
    hp: 3e3,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 7,
    radius: 45,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -20,
    requires: ["radar"],
    produces: ["gunboat", "mboat", "seatrans", "frigate", "destroyer", "sub", "btlship", "kraken", "moray"],
    sprite: "u.navyard3"
  },
  mgturret: {
    id: "mgturret",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 130,
    buildTime: 10,
    pop: 0,
    hp: 400,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 8,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -2,
    weapons: [w({
      id: "turretmg",
      cls: "mg",
      dmg: 10,
      reload: 0.35,
      range: 4.5,
      projectile: "bullet",
      speed: 500,
      targets: ["ground", "ship", "air"],
      mult: { ship: 0.6, structure: 0.3 },
      turret: true,
      muzzleOffset: 26,
      sound: "mg"
    })],
    upgradesTo: "gatling",
    upgradeCost: 260,
    upgradeTime: 16,
    sprite: "u.mgturret",
    turretSprite: "tur.mg"
  },
  gatling: {
    id: "gatling",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 390,
    buildTime: 26,
    pop: 0,
    hp: 700,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 8,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -4,
    weapons: [w({
      id: "gatling",
      cls: "mg",
      dmg: 10,
      reload: 0.14,
      range: 5,
      projectile: "bullet",
      speed: 520,
      targets: ["ground", "ship", "air"],
      mult: { medium: 0.9, heavy: 0.5, air: 0.8, ship: 0.7, structure: 0.3 },
      turret: true,
      muzzleOffset: 27.5,
      sound: "mg"
    })],
    sprite: "u.gatling",
    turretSprite: "tur.gatling"
  },
  cannonturret: {
    id: "cannonturret",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 320,
    buildTime: 18,
    pop: 0,
    hp: 700,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 8,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -3,
    weapons: [w({
      // static guns hit buildings softer than tanks do — no turret creep
      id: "cannon",
      cls: "cannon",
      dmg: 65,
      reload: 1.9,
      range: 6,
      projectile: "shell",
      speed: 420,
      targets: ["ground", "ship"],
      mult: { heavy: 1.1, structure: 0.6, ship: 1 },
      turret: true,
      muzzleOffset: 29,
      splash: 10,
      sound: "cannon"
    })],
    upgradesTo: "cannonturret2",
    upgradeCost: 420,
    upgradeTime: 22,
    sprite: "u.cannonturret",
    turretSprite: "tur.cannon"
  },
  cannonturret2: {
    id: "cannonturret2",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 740,
    buildTime: 40,
    pop: 0,
    hp: 1200,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 9,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -5,
    weapons: [w({
      id: "twincannon",
      cls: "cannon",
      dmg: 60,
      reload: 2,
      range: 7.5,
      projectile: "shell",
      speed: 420,
      targets: ["ground", "ship"],
      mult: { heavy: 1.2, structure: 0.6, ship: 1.1 },
      turret: true,
      muzzleOffset: 40,
      splash: 12,
      burst: 2,
      burstDelay: 0.2,
      sound: "cannon"
    })],
    sprite: "u.cannonturret2",
    turretSprite: "tur.cannon2"
  },
  aaturret: {
    id: "aaturret",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 240,
    buildTime: 14,
    pop: 0,
    hp: 500,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 9,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -3,
    weapons: [w({
      id: "aaflak",
      cls: "aa",
      dmg: 30,
      reload: 0.8,
      range: 7,
      projectile: "flak",
      speed: 480,
      targets: ["air"],
      turret: true,
      muzzleOffset: 28.5,
      sound: "flak"
    })],
    upgradesTo: "samsite",
    upgradeCost: 320,
    upgradeTime: 20,
    sprite: "u.aaturret",
    turretSprite: "tur.aa"
  },
  samsite: {
    id: "samsite",
    kind: "building",
    domain: "none",
    tier: 2,
    upgradeOnly: true,
    cost: 560,
    buildTime: 34,
    pop: 0,
    hp: 800,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 11,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -6,
    weapons: [w({
      id: "samsite",
      cls: "aa",
      dmg: 110,
      reload: 2.6,
      range: 10,
      projectile: "missile",
      speed: 460,
      targets: ["air"],
      turret: true,
      muzzleOffset: 20.5,
      homing: true,
      sound: "missile"
    })],
    sprite: "u.samsite",
    turretSprite: "tur.samsite"
  },
  /**
   * Point defence. It cannot shoot at anything on the ground: its rounds are
   * spent on incoming rockets and Viper missiles, one round per round shot
   * down. A nuclear warhead is not its business at either tier — that is an
   * aircraft, and anti-air shoots it down or nothing does.
   * The magazine is one Tempest salvo (8 rockets) so a barrage is absorbed
   * whole, and the reload is what sets the duel: one launcher throws 8
   * rockets every 7s (1.14/s) and one tower replaces 1.33 rounds a second,
   * so a single Tempest never lands a rocket and a second one breaks
   * through. Anything faster here makes the tower unanswerable; anything
   * slower and one launcher grinds it down alone. See interceptor.test.ts.
   */
  interceptor: {
    id: "interceptor",
    kind: "building",
    domain: "none",
    tier: 2,
    cost: 450,
    buildTime: 24,
    pop: 0,
    hp: 600,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 9,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -8,
    weapons: [],
    interceptRange: 7,
    interceptMag: 8,
    interceptReload: 0.75,
    interceptMuzzleOffset: 19,
    upgradesTo: "interceptor2",
    upgradeCost: 650,
    upgradeTime: 36,
    sprite: "u.interceptor",
    turretSprite: "tur.interceptor"
  },
  interceptor2: {
    id: "interceptor2",
    kind: "building",
    domain: "none",
    tier: 3,
    upgradeOnly: true,
    cost: 1100,
    buildTime: 60,
    pop: 0,
    hp: 900,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 11,
    radius: 14,
    fw: 1,
    fh: 1,
    power: -12,
    weapons: [],
    interceptRange: 9,
    interceptMag: 12,
    interceptReload: 0.75,
    interceptMuzzleOffset: 21.5,
    sprite: "u.interceptor2",
    turretSprite: "tur.interceptor2"
  },
  repairtower: {
    id: "repairtower",
    kind: "building",
    domain: "none",
    tier: 1,
    cost: 360,
    buildTime: 20,
    pop: 0,
    hp: 750,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 7,
    radius: 30,
    fw: 2,
    fh: 2,
    weapons: [],
    power: -8,
    repairRange: 5.5,
    repairRate: 20,
    repairTargets: 3,
    sprite: "u.repairtower"
  },
  /**
   * The radar lifts the fog for 24 tiles round it — three times a turret's
   * sight and the largest circle in the game, so one in the base shows the
   * whole approach and every gun and battery inside the circle fires at
   * what it could never see for itself. Short of power it falls back to a
   * turret's sight (`updateFog`).
   */
  radar: {
    id: "radar",
    kind: "building",
    domain: "none",
    tier: 2,
    cost: 400,
    buildTime: 20,
    pop: 0,
    hp: 800,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 24,
    radius: 30,
    fw: 2,
    fh: 2,
    // and it sees through stealth: a Wraith is visible within 8 tiles of it
    weapons: [],
    power: -8,
    detect: 8,
    sprite: "u.radar",
    turretSprite: "tur.radar"
  },
  /**
   * The reactor breeds the cores a warhead is built round: with a radar it is
   * what a silo needs to be built, and what a silo or a submarine needs to
   * fabricate and fire. It feeds the grid as well, though dearer per unit of
   * power than the plant line, which it does not replace.
   */
  reactor: {
    id: "reactor",
    kind: "building",
    domain: "none",
    tier: 3,
    cost: 1400,
    buildTime: 60,
    pop: 0,
    hp: 2200,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 6,
    radius: 44,
    fw: 3,
    fh: 3,
    weapons: [],
    power: 100,
    requires: ["radar"],
    sprite: "u.reactor"
  },
  nukesilo: {
    id: "nukesilo",
    kind: "building",
    domain: "none",
    tier: 3,
    cost: 1800,
    buildTime: 75,
    pop: 0,
    hp: 1800,
    armor: "structure",
    speed: 0,
    turnRate: 0,
    vision: 7,
    radius: 44,
    fw: 3,
    fh: 3,
    weapons: [],
    power: -40,
    requires: ["radar", "reactor"],
    nukeCapacity: 2,
    nukeCost: 2500,
    nukeTime: 180,
    sprite: "u.nukesilo"
  }
};
const ALL_DEF_IDS = Object.keys(DEFS);
const STRINGS = {
  // ------------------------------------------------------------- app
  "app.title": ["Steel Tide", "钢铁浪潮"],
  "app.gameTitle": ["{0} | {1} Players | Steel Tide", "{0} | {1} 名玩家 | 钢铁浪潮"],
  "boot.systems": ["Preparing command systems…", "正在准备指挥系统…"],
  "boot.art": ["Generating unit artwork…", "正在生成单位图像…"],
  "boot.terrain": ["Building terrain textures…", "正在构建地形纹理…"],
  "boot.sprites": ["Loading unit sprites…", "正在加载单位图像…"],
  "boot.mods": ["Loading mods…", "正在加载模组…"],
  "boot.interface": ["Fitting interface panels…", "正在装载界面面板…"],
  "boot.ready": ["Opening command center…", "正在开启指挥中心…"],
  "boot.tipTitle": ["Did you know?", "你知道吗？"],
  // ------------------------------------------------------------- boot tips
  // One of these is picked at random for the loading screen. They are read by
  // their `tip.` prefix (`showBootTip` in main.ts) rather than by name, so a
  // new fact is one line here and nothing else — and equally, a key scan for
  // `t('...')` will never find a call site for any of them.
  "tip.engine": [
    "The whole engine is hand-rolled. The game ships with zero runtime dependencies.",
    "整个引擎都是手写的——游戏没有任何运行时依赖。"
  ],
  "tip.audio": [
    "Every sound effect has a synthesized twin. Pull the recordings and the game plays its chiptune self.",
    "每个音效都有一个合成的孪生版本：拿掉录音，游戏就用自己的芯片音色照常开打。"
  ],
  "tip.maps": [
    "Random maps are drawn to order for the seats at the table. Size is elbow room, never a cap on players.",
    "随机地图是按入座人数现画的：尺寸决定的是回旋余地，从不限制谁能入座。"
  ],
  "tip.tick": [
    "The simulation runs at a fixed 30 ticks a second. Everything you see between them is interpolation.",
    "模拟以固定的每秒 30 拍推进，你在两拍之间看到的一切都是插值。"
  ],
  "tip.save": [
    "A save carries its own map, so improvements to the generator never shift an old battlefield.",
    "存档里包含了独立的地图信息，即使地图下架也可以继续游玩。"
  ],
  "tip.pwa": [
    "Steel Tide installs. Once the shell is cached it starts and plays a skirmish with no network at all.",
    "钢铁浪潮可以装到桌面。外壳缓存之后，完全断网也能打一局遭遇战。"
  ],
  "tip.bot": [
    "A language model can take a seat. It plays through the same fog-filtered frames and the same orders you do.",
    "大语言模型也能参战：它和你一样只看得到被迷雾过滤的战场，也只能通过同一套指令下令。"
  ],
  "tip.transport": [
    "Transports carry weight, not head count. A Mammoth takes four capacity — no helicopter will lift it.",
    "运输载具算的是重量，不是人头。猛犸占 4 点载重，直升机无法吊运。"
  ],
  "tip.cargoplane": [
    "The C-47 parks. An idle cargo plane puts its wheels down instead of circling, and passengers walk to it.",
    "C-47 会停下来：闲着的运输机是把轮子放到地上，而不是在天上盘旋，乘员自己走过去登机。"
  ],
  "tip.intercept": [
    "The Missile Interrupter stops rockets, never shells — and never a nuclear warhead. That is a flying target, and a veteran anti-air unit's job.",
    "导弹拦截塔只拦火箭弹，从不拦炮弹，也不拦核弹头：核弹头是空中目标，归老兵级防空单位管。"
  ],
  "tip.rockets": [
    "One rocket launcher never lands a rocket on a point-defended base. Two get through.",
    "一辆火箭炮永远打不穿有一座拦截器的基地，两辆就能。"
  ],
  "tip.terrain": [
    "Forest, rock and every cliff face stop a ground vehicle. Aircraft ignore all three.",
    "森林、岩石和所有崖面都挡住地面载具，飞机对这三样视若无睹。"
  ],
  "tip.build": [
    "Grass, sand, snow and asphalt will hold a foundation. Mud, marsh and rubble are drivable, not buildable.",
    "草地、沙地、雪地和柏油路都能修建筑。泥地、沼泽和瓦砾能走，但不能建。"
  ],
  "tip.startMetal": [
    "Work begins once you have 75% of the price in hand, and bills the rest as it goes.",
    "凑够所需金属的 75% 就能开工，剩下的边造边付。"
  ],
  "tip.slots": [
    "Units sent at the same target fan out along a firing ring instead of queueing behind whoever arrived first.",
    "攻击同一目标的部队会沿着射击环散开，而不是挤在先到者身后。"
  ],
  "tip.wreck": [
    "Every wreck is sized to what died and lies on the heading it was facing. A flattened building leaves a crater far longer.",
    "每具残骸的倒下的朝向就是它生前的朝向；被夷平的建筑留下的弹坑要久得多。"
  ],
  "tip.repair": [
    "A repair tower works on three damaged allies at once, worst hit first. Multiple towers repair a shared target faster.",
    "维修塔同时修三个受损友军，先修伤得最重的。多座塔同时维修同一个目标时，维修速度会叠加。"
  ],
  "tip.engineerRepair": [
    "Engineers consume metal when repairing buildings.",
    "工程师维修建筑时会消耗金属。"
  ],
  "tip.shift": [
    "Hold Shift to queue orders. On a touchscreen, a long press is an attack-move.",
    "按住 Shift 可以排队下令；在触屏上，长按就是攻击移动。"
  ],
  "tip.route": [
    "Hold Ctrl (Cmd on a Mac) and right-click to lay a patrol: the unit walks the blue path for good, back and forth — or round and round if you close it on its first point.",
    "按住 Ctrl（Mac 上是 Cmd）右键点击可以铺设巡逻路线：单位会沿着这条蓝色路径往返巡逻——若终点回到起点，则绕圈巡逻。"
  ],
  "tip.console": [
    "The backquote key opens the admin console.",
    "按反引号键（`）打开管理员控制台。"
  ],
  "tip.spectate": [
    "Anyone in a lobby can sit in the stands instead of taking a seat, and watch the whole map.",
    "大厅里的人可以不入座，坐到看台上观战——看到的是整张地图。"
  ],
  "mode.campaign": ["Campaign", "战役"],
  "mode.sandbox": ["Sandbox", "沙盒"],
  // ------------------------------------------------------------- menu
  "menu.campaign": ["Campaign", "战役"],
  "menu.sandbox": ["Sandbox", "沙盒"],
  "menu.singlePlayer": ["Single Player", "单人游戏"],
  "menu.multiplayer": ["Multiplayer", "多人游戏"],
  "menu.load": ["Load Game", "载入存档"],
  "menu.mapEditor": ["Map Editor", "地图编辑器"],
  "menu.settings": ["Settings", "设置"],
  "menu.about": ["About", "关于"],
  "menu.exit": ["Exit game", "退出游戏"],
  "menu.continue": ["Continue", "继续游戏"],
  "menu.version": ["v{0}", "v{0}"],
  "dev.enabled": ["Developer mode on — every mission unlocked.", "已开启开发者模式——全部关卡解锁。"],
  // the developer tools (home menu, developer mode only)
  "menu.devTools": ["Developer Tools", "开发者工具"],
  "menu.cuts": ["Cuts", "过场镜头"],
  "menu.cuts.sub": ["The menu reel on its own · PgUp/PgDn switch cuts · arrows pan · Space pauses · Esc leaves", "全屏播放菜单背景镜头 · PgUp/PgDn 切换镜头 · 方向键移动镜头 · 空格暂停 · Esc 退出"],
  "menu.showcase": ["Showcase", "展示地图"],
  "menu.showcase.sub": ["Every unit and building on one map", "一张地图放下全部单位与建筑"],
  // ------------------------------------------------------------- common
  "common.back": ["Back", "返回"],
  "common.start": ["Start", "开始"],
  "common.cancel": ["Cancel", "取消"],
  "common.ok": ["OK", "确定"],
  "common.close": ["Close", "关闭"],
  "common.done": ["Done", "完成"],
  "common.delete": ["Delete", "删除"],
  "common.reset": ["Reset", "重置"],
  "common.empty": ["Empty", "空"],
  "common.on": ["On", "开"],
  "common.off": ["Off", "关"],
  "common.player": ["Player", "玩家"],
  "common.confirmDelete": ["Delete this save?", "确定删除该存档？"],
  "common.overwrite": ["Overwrite this slot?", "覆盖该存档位？"],
  // ------------------------------------------------------------- save slots
  "save.auto": ["Autosave", "自动存档"],
  "save.quick": ["Quicksave", "快速存档"],
  "save.slot": ["Slot {0}", "存档位 {0}"],
  // ------------------------------------------------------------- difficulty
  "diff.relaxed": ["Relaxed", "轻松"],
  "diff.standard": ["Standard", "标准"],
  "diff.veteran": ["Veteran", "老兵"],
  "diff.relaxed.desc": ["A calm opponent that attacks rarely.", "进攻节奏缓慢的温和对手。"],
  "diff.standard.desc": ["A balanced opponent for most players.", "适合多数玩家的均衡对手。"],
  "diff.veteran.desc": ["Aggressive, expands fast, counters your army.", "扩张迅速、针对性极强的凶猛对手。"],
  // ------------------------------------------------------------- sandbox setup
  "setup.title": ["Sandbox", "沙盒"],
  "setup.map": ["Map", "地图"],
  "setup.factions": ["Factions", "阵营"],
  "setup.rules": ["Game config", "对局设置"],
  "setup.startMetal": ["Starting metal", "初始金属"],
  "setup.fog": ["Fog of war", "战争迷雾"],
  "setup.popCap": ["Unit cap", "人口上限"],
  "setup.you": ["You", "你"],
  "setup.seat": ["Your faction — it decides which spawn you start from.", "你的阵营——决定你从哪个出生点开局。"],
  "setup.playHere": ["Play this faction", "改玩此阵营"],
  "setup.mapSize": ["Map size", "地图尺寸"],
  "setup.symmetric": ["Mirrored map", "镜像地图"],
  "setup.symmetricTip": ["Both halves of a generated map are the same ground turned half a turn, so no homeland has better country than another. Turned off, the generator draws every corner on its own — livelier, and not a fair fight.", "生成的地图两半互为半圈旋转的同一片地形，任何家园都不会占到地利。关闭后生成器让各处自行成形——更有看头，但谈不上公平。"],
  "setup.seed": ["Seed", "随机种子"],
  "setup.reseed": ["Roll a new seed", "重新生成种子"],
  "setup.mapSize.s": ["Small", "小型"],
  "setup.mapSize.m": ["Medium", "中型"],
  "setup.mapSize.l": ["Large", "大型"],
  "setup.mapSize.xl": ["Huge", "巨型"],
  "setup.players": ["{0} players", "{0} 人"],
  "setup.slots": ["{0} slots", "{0} 席"],
  "setup.customMap": ["Custom map", "自定义地图"],
  "setup.uploadMap": ["Upload map…", "上传地图…"],
  "setup.uploadMapTip": ["A map exported from the Map Editor (.steel-tide-map)", "从地图编辑器导出的地图（.steel-tide-map）"],
  "setup.deleteMap": ["Remove this map", "移除此地图"],
  "setup.mapInvalid": ["Could not read that map: {0}", "无法读取该地图：{0}"],
  "setup.mapLoaded": ["Map loaded: {0}", "已载入地图：{0}"],
  "map.custom.style": ["Your own map, played exactly as it was painted in the editor.", "你自己的地图，与编辑器中绘制的完全一致。"],
  // ------------------------------------------------------------- multiplayer
  "mp.title": ["Multiplayer", "多人游戏"],
  "mp.server": ["Server IP or address", "服务器 IP 或地址"],
  "mp.name": ["Commander name", "指挥官名称"],
  "mp.joinCode": ["Join code", "加入码"],
  "mp.hostKey": ["Host key (host only)", "主机密钥（仅房主）"],
  "mp.connect": ["Connect", "连接"],
  "mp.showKey": ["Show host key", "显示主机密钥"],
  "mp.hideKey": ["Hide host key", "隐藏主机密钥"],
  "mp.connecting": ["Connecting…", "正在连接…"],
  // a store build cannot be sent to the server's own origin the way a browser
  // tab can — that navigation would replace the bundled game with a web page
  "mp.needsTls": [
    "This app can only reach servers secured with HTTPS. Ask the host for an https:// address, or join from a web browser.",
    "本应用只能连接使用 HTTPS 的服务器。请向房主索取 https:// 地址，或改用网页浏览器加入。"
  ],
  "mp.lobby": ["Server Lobby", "服务器大厅"],
  "mp.waiting": ["Waiting for the host to assign a human slot.", "等待房主分配玩家席位。"],
  "mp.ready": ["Ready", "准备"],
  "mp.notReady": ["Not ready", "取消准备"],
  "mp.human": ["Human", "玩家"],
  "mp.ai": ["AI", "AI"],
  "mp.closed": ["Closed", "关闭"],
  "mp.slot": ["Faction {0}", "阵营 {0}"],
  "mp.spectator": ["Spectator", "观战者"],
  "mp.spectators": ["Spectators", "观战者"],
  "mp.rosterUnknown": ["This server does not report who else is here.", "此服务器不提供在场玩家列表。"],
  "mp.watch": ["Watch as spectator", "作为观战者观看"],
  "mp.takeSeat": ["Wait for a seat", "等待席位"],
  "mp.youWatch": ["You will watch the match from the start, with the whole map in view.", "你将从一开始观战本局，并能看到整张地图。"],
  "mp.youWatchNow": ["Joining the match as a spectator…", "正在以观战者身份加入对局…"],
  "mp.team": ["Team {0}", "队伍 {0}"],
  "mp.loadSave": ["Load local save", "载入本地存档"],
  "mp.gameSave": ["Game save", "游戏存档"],
  "mp.selectSave": ["Select save…", "选择存档…"],
  "mp.clearSave": ["Clear", "清除"],
  "mp.clearSaveTip": [
    "Drop the loaded save. The lobby goes back to a generated map, and the factions reset.",
    "移除已载入的存档。大厅将回到随机生成的地图，阵营重置。"
  ],
  "mp.uploadSave": ["Upload a file…", "上传文件…"],
  "mp.tabJoin": ["Join", "加入"],
  "mp.tabHost": ["Host", "架设"],
  "mp.hostIntro": [
    "Run this on any Linux machine with a public address and it becomes a Steel Tide server. It prints two links: one for the host, one for the players.",
    "在任意一台有公网地址的 Linux 机器上运行这条命令，它就会变成一台钢铁浪潮服务器，并打印两个链接：一个给房主，一个给玩家。"
  ],
  "mp.hostNote": [
    "Open TCP port 28785 in the firewall. The guide covers TLS, updates and removal.",
    "请在防火墙中开放 TCP 端口 28785。指南中还有 TLS、更新与卸载的说明。"
  ],
  "mp.serverGuide": ["How to set up a server", "如何架设服务器"],
  "mp.copyCommand": ["Copy command", "复制命令"],
  "mp.startMatch": ["Start match", "开始对局"],
  "mp.disconnect": ["Disconnect", "断开连接"],
  "mp.hostPaused": ["HOST PAUSED", "房主已暂停"],
  "mp.unreachable": ["Could not reach {0}.", "无法连接到 {0}。"],
  "mp.checkPort": [
    "Check the address and port — a server listens on {0} unless it was changed.",
    "请检查地址与端口——除非另行更改，服务器监听 {0}。"
  ],
  "mp.continueHttp": ["Continue without encryption", "不加密继续"],
  "mp.continueHttpHint": [
    "Opens {0}. You will leave this page, and saves stored here do not follow.",
    "将打开 {0}。你会离开此页面，此处的存档不会一同带走。"
  ],
  "mp.players": ["Players", "玩家"],
  "mp.ping": ["Ping", "延迟"],
  "mp.you": ["you", "你"],
  "mp.defeated": ["Defeated", "已淘汰"],
  "mp.disconnected": ["Disconnected", "已断开"],
  "mp.measuring": ["measuring…", "测量中…"],
  "mp.behind": ["behind", "滞后"],
  "mp.connectionLost": ["Connection lost", "连接已断开"],
  "mp.exportSave": ["Export", "导出"],
  "mp.downloadSave": ["Download server save", "下载服务器存档"],
  "mp.returnLobby": ["Return everyone to lobby", "所有人返回大厅"],
  "mp.lanAddress": ["Your address on this network — players here join with it. Click to copy.", "你在本网络中的地址——同一网络的玩家用它加入。点击复制。"],
  "mp.copied": ["Copied", "已复制"],
  "mp.chat": ["Lobby chat", "大厅聊天"],
  "mp.chatEmpty": ["Nobody has said anything yet.", "还没有人说话。"],
  "mp.chatPlaceholder": ["Say something… (/t for team only)", "说点什么…（/t 仅队伍可见）"],
  "mp.chatSend": ["Send", "发送"],
  "chat.teamTag": ["[Team]", "[队伍]"],
  "mp.spectating": ["SPECTATING", "观战中"],
  "mp.kicked": ["Removed from the match by the host.", "已被房主移出对局。"],
  "mp.mapChosen": ["The host picks the map.", "由房主选择地图。"],
  "mp.tooManyFactions": ["This map holds {0} factions — close the rest.", "此地图最多 {0} 个阵营——请关闭其余席位。"],
  "mp.needFaction": ["Open at least one faction to play.", "至少开放一个阵营才能开局。"],
  "mp.needPlayer": ["Faction {0} has nobody in it — seat a player, or set it to AI or Closed.", "阵营 {0} 无人就座——请安排玩家，或将其改为 AI 或关闭。"],
  "mp.needReady": ["Waiting for {0} to press Ready.", "等待 {0} 点击准备。"],
  // the connect modal in a store shell: a game hosted on this device, and
  // the games announced on the local network
  "mp.tabLan": ["LAN", "局域网"],
  // a browser sees the LAN page too, as a signpost: the network is the app's to see
  "mp.lanBrowserIntro": [
    "Games hosted on this network can only be found from the app. The desktop version scans for them and joins with one click, and hosts games of its own — so do the phone apps.",
    "本网络中架设的对局只能在应用内找到。桌面版会自动扫描并一键加入，也能自己架设对局——手机应用同样如此。"
  ],
  "mp.getDesktop": ["Get the desktop version", "获取桌面版"],
  "mp.lanEmpty": ["Scanning… games hosted on this network appear here.", "正在扫描…本网络中架设的对局会显示在这里。"],
  // the scan that finds nothing: a subnet, a guest network or a firewall
  // eating multicast, and the address form is the way through all three
  "mp.lanNotFound": [
    "Cannot find your game? Some networks hide the announcement — ask the host for their address and type it in.",
    "找不到你的对局？有些网络会屏蔽广播——向房主要地址后手动输入。"
  ],
  "mp.lanManual": ["Enter an address", "手动输入地址"],
  "mp.lanPlayers": ["{0} players", "玩家 {0}"],
  "mp.lanLocked": ["Needs a join code", "需要加入码"],
  "mp.lanVersion": ["A different game version — both copies must be updated to play together.", "游戏版本不同——双方都更新后才能一起游戏。"],
  "mp.phase.lobby": ["In lobby", "大厅中"],
  "mp.phase.playing": ["Match in progress", "对局进行中"],
  "mp.phase.paused": ["Paused", "已暂停"],
  "mp.phase.ended": ["Match over", "对局结束"],
  "mp.hostLanIntro": [
    "Host a game on this device. Players on your network find it under LAN; anyone else joins with the address the lobby shows.",
    "在此设备上架设对局。同一网络的玩家可在“局域网”页找到它；其他人用大厅中显示的地址加入。"
  ],
  "mp.hostName": ["Server name", "服务器名称"],
  "mp.hostNameDefault": ["{0}'s game", "{0} 的对局"],
  "mp.hostJoinCode": ["Join code (optional)", "加入码（可选）"],
  "mp.hostJoinCodeHint": ["Leave empty to let anyone on the network join", "留空则本网络中任何人都可加入"],
  "mp.hostVisible": ["Visible on this network", "在本网络中可见"],
  "mp.startHosting": ["Start hosting", "开始架设"],
  "mp.starting": ["Starting the server…", "正在启动服务器…"],
  "mp.hostFailed": ["Could not start the server: {0}", "无法启动服务器：{0}"],
  // ------------------------------------------------------------- maps
  "map.greenfield": ["Greenfield", "绿野"],
  "map.greenfield.style": ["Open pasture with room to manoeuvre — few natural walls, so the line you hold is the one you build.", "开阔牧野，回旋余地充足；天然屏障稀少，防线全靠自己修。"],
  "map.twinBays": ["Twin Bays", "双子湾"],
  "map.twinBays.style": ["Two sheltered bays cut the land in half: a gunboat here is worth a tank column.", "两处避风海湾把陆地一分为二，一艘炮艇顶得上一队坦克。"],
  "map.archipelago": ["Archipelago", "群岛"],
  "map.archipelago.style": ["Scattered islands and narrow straits — nothing crosses without a hull or a wing.", "岛屿零散、海峡狭窄，没有船翼便寸步难行。"],
  "map.riftValley": ["Rift Valley", "裂谷"],
  "map.riftValley.style": ["Rock ridges channel every advance into a handful of passes worth garrisoning.", "岩脊把每一次推进都逼进少数几处隘口，值得驻防。"],
  "map.burnoutHighway": ["Burnout Highway", "燃速公路"],
  "map.burnoutHighway.style": ["Fast road lanes reward early map control and rapid flanking.", "高速公路奖励前期控图与快速包抄。"],
  "map.blackMarsh": ["Black Marsh", "黑泽"],
  "map.blackMarsh.style": ["Mud and marsh punish heavy columns; dry routes and waterways become lifelines.", "泥地与沼泽拖慢重装纵队，旱路和水道成为生命线。"],
  "map.frostline": ["Frostline", "冻土战线"],
  "map.frostline.style": ["A frozen front with three contested passes and long-range firing lanes.", "三处隘口横贯冻原，远程火力拥有广阔射界。"],
  "map.shatteredCity": ["Shattered City", "破碎城区"],
  "map.shatteredCity.style": ["A tight street grid built for ambushes, artillery angles, and block-by-block fights.", "紧凑街区适合伏击、炮击角度与逐街争夺。"],
  "map.caldera": ["Caldera Crown", "火山王冠"],
  "map.caldera.style": ["Four-way conflict around an impassable lava ring and a rich central prize.", "四方势力围绕熔岩环与富饶中心展开争夺。"],
  "map.leviathanStrait": ["Leviathan Strait", "巨舰海峡"],
  "map.leviathanStrait.style": ["Isolated homelands and resource islets force fleet control, transport raids, and coastal bombardment.", "孤立本土与资源岛迫使双方争夺制海权、实施运输突袭与岸轰。"],
  "map.sixCrowns": ["Six Crowns", "六冠"],
  "map.sixCrowns.style": ["Six homelands ring a lake; a rock spoke with a single pass separates each pair of neighbours, and the shore holds the ore worth fighting over.", "六座家园环绕中央湖泊，相邻两家之间各有一道仅留单一隘口的岩脊，湖岸的矿脉值得一战。"],
  "map.fourClimes": ["Four Climes", "四境"],
  "map.fourClimes.style": ["The big one: four homelands, four ecologies, one inland sea between them. Every border is a gate worth holding, every coast is within reach of a fleet, and the island in the middle has no ore on it — bring a transport.", "最大的一张图：四方家园、四种生态，中央一片内海。每处边境都是值得死守的隘口，每段海岸都在舰队射程之内，而正中的孤岛上没有矿——想要它就带运输机来。"],
  "map.ironmouth": ["Ironmouth", "铁口"],
  "map.ironmouth.style": ["Nothing here is mirrored. A cliff-ringed shelf, a river delta with a harbour, ruined flats full of ore and an open steppe — one river between them, fordable above the rapids and navigable below.", "此图毫无对称：崖环台地、带港口的三角洲、遍地矿藏的废墟平原、一望无际的草原——一条大河穿行其间，急滩之上可涉水而过，之下可行船。"],
  "map.saltboneReach": ["Saltbone Reach", "盐骨海域"],
  "map.saltboneReach.style": ["Six seats on the rim of a drowned range and two thirds of the ore out in the water between them — thirty-odd islets, four islands worth a second base, and no bridge anywhere. A homeland feeds one base, never an army: whoever will not put engineers on boats loses to whoever will.", "六方据点环列于沉没山脉的边缘，三分之二的矿藏散落在其间的海面上——三十余座礁屿、四座足以立第二基地的岛屿，全图不见一座桥。本岛的产出只够养一座基地，绝养不出一支军队：不肯把工程车送上船的一方，终将败给肯的一方。"],
  "map.random": ["Random Map", "随机地图"],
  "map.random.style": ["A fresh layout every match, with exactly as many homelands as there are players in the game.", "每局都是全新布局，家园数量与参战人数一致。"],
  // the climates a generated map is drawn in (game/biomes.ts) — the name it is
  // announced under, and the promise of what the ground will be like
  "climate.heartland": ["Heartland", "腹地"],
  "climate.taiga": ["Taiga", "泰加林"],
  "climate.badlands": ["Badlands", "荒原"],
  "climate.ashlands": ["Ashlands", "焦土"],
  "climate.coastland": ["Coastland", "滨海"],
  "climate.fenlands": ["Fenlands", "沼原"],
  "climate.frozenSea": ["Frozen Sea", "冰海"],
  "climate.archipelago": ["Island Chain", "岛链"],
  // ------------------------------------------------------------- campaign
  "campaign.title": ["Campaign", "战役"],
  "campaign.mission": ["Mission {0}", "第 {0} 关"],
  "campaign.locked": ["Complete the previous mission to unlock.", "完成上一关后解锁。"],
  "campaign.completed": ["Completed", "已完成"],
  "campaign.replay": ["Replay", "重玩"],
  "campaign.missions": ["Missions", "任务列表"],
  "campaign.brief": ["Briefing", "任务简报"],
  "campaign.objectives": ["Objectives", "任务目标"],
  "campaign.progress.reset": ["Reset progress", "重置进度"],
  "campaign.progress.resetConfirm": ["Reset all campaign progress?", "确定重置全部战役进度？"],
  "m1.name": ["First Contact", "初次交锋"],
  "m1.brief": [
    "A rogue militia has raided our northern mining outposts. Establish a base, secure the metal fields, and wipe out their camp. Command HQ will walk you through the basics.",
    "叛乱武装袭击了我方北部矿区。建立基地、控制金属矿脉，摧毁敌方营地。总部将指导你掌握基础操作。"
  ],
  "m2.name": ["Hold the Line", "坚守防线"],
  "m2.brief": [
    "Our forward base sits in a mountain pass and the enemy wants it back. Fortify with turrets and armor, and survive their assault waves until reinforcements arrive.",
    "我方前哨基地扼守山口，敌军誓要夺回。用炮塔和装甲部队构筑防线，坚守到援军抵达。"
  ],
  "m3.name": ["Across the Strait", "跨越海峡"],
  "m3.brief": [
    "The militia fled to an island stronghold across the strait. Build a naval yard, win the water, and land an armored force to finish them.",
    "敌军残部退守海峡对岸的岛屿要塞。建造船坞、夺取制海权，再登陆装甲部队将其歼灭。"
  ],
  "m4.name": ["Iron Skies", "钢铁天空"],
  "m4.brief": [
    "Enemy bombers are hammering our positions from a fortified airfield. Weather the raids, build air defense, then take the fight to their skies.",
    "敌方轰炸机正从坚固机场轮番空袭我方阵地。顶住空袭、构建防空网，然后夺回天空。"
  ],
  "m5.name": ["Pincer", "钳形攻势"],
  "m5.brief": [
    "Two enemy strongholds guard the valley. They will squeeze us from both sides — strike with combined arms before the pincer closes.",
    "敌军两座要塞扼守山谷，正准备两面夹击。在钳口合拢之前，以多兵种协同将其各个击破。"
  ],
  "m6.name": ["Fortress", "最后堡垒"],
  "m6.brief": [
    "The militia high command hides in a coastal fortress bristling with defenses. Land, sea and air — bring everything. End this war.",
    "敌军指挥部藏身于防御森严的滨海要塞。海陆空全面出击，终结这场战争。"
  ],
  // ------------------------------------------------------------- objectives
  "obj.destroyEnemy": ["Destroy all enemy forces", "消灭所有敌军"],
  "obj.destroyHQ": ["Destroy the enemy headquarters", "摧毁敌方总部"],
  "obj.protectHQ": ["Your HQ must survive", "保卫我方总部"],
  "obj.survive": ["Survive for {0}", "坚守 {0}"],
  "obj.buildExtractors": ["Build {0} metal extractors", "建造 {0} 座采矿场"],
  "obj.buildFactory": ["Build a war factory", "建造战车工厂"],
  "obj.trainArmy": ["Build {0} combat units", "生产 {0} 个战斗单位"],
  "obj.buildNavyard": ["Build a naval yard", "建造造船厂"],
  "obj.destroyAirbases": ["Destroy the enemy airbases", "摧毁敌方空军基地"],
  // ------------------------------------------------------------- game HUD
  "hud.metal": ["Metal", "金属"],
  "hud.power": ["Power", "电力"],
  "hud.pop": ["Units", "单位"],
  "hud.income": ["+{0}/s", "+{0}/秒"],
  // the economy strip's breakdown popover
  "hud.economy": ["Economy", "经济"],
  "hud.eco.hint": ["Hover for the full breakdown", "悬停查看详细收支"],
  "hud.eco.balance": ["Balance", "余额"],
  "hud.eco.committed": ["Committed", "已承诺"],
  "hud.eco.available": ["Available", "可动用"],
  "hud.eco.incomeTotal": ["Income", "收入"],
  "hud.eco.noIncome": ["No extractors standing", "没有正在运转的采矿设施"],
  "hud.eco.brownout": ["Low power — mining and work at {0}%", "电力不足 — 开采与作业降至 {0}%"],
  "hud.eco.surplus": ["Surplus", "盈余"],
  "hud.eco.deficit": ["Deficit", "缺口"],
  "hud.eco.noPower": ["Nothing generating or drawing power", "没有发电或耗电设施"],
  "hud.eco.other": ["Other ×{0}", "其他 ×{0}"],
  "hud.eco.count": ["{0} ×{1}", "{0} ×{1}"],
  "hud.paused": ["PAUSED", "已暂停"],
  "hud.speed": ["Speed ×{0}", "速度 ×{0}"],
  "hud.menu": ["Menu", "菜单"],
  "hud.objectives": ["Objectives", "任务目标"],
  "hud.queue": ["Queue", "生产队列"],
  "hud.queueEmpty": ["Queue is empty", "队列为空"],
  "hud.queueReorder": ["Drag to reorder", "拖动调整顺序"],
  "hud.kills": ["Kills: {0}", "击杀：{0}"],
  "hud.rank": ["Rank {0} — {1}", "等级 {0} — {1}"],
  "rank.2": ["Veteran", "老兵"],
  "rank.3": ["Elite", "精英"],
  "hud.cargo": ["Cargo {0}/{1}", "载员 {0}/{1}"],
  "hud.warheads": ["Warheads {0}/{1}", "核弹头 {0}/{1}"],
  "hud.rounds": ["Rounds {0}/{1}", "备弹 {0}/{1}"],
  "hud.roundReady": ["Interceptor ready", "拦截弹已就绪"],
  "hud.roundReloading": ["Reloading", "装填中"],
  "hud.nukeReady": ["Warhead ready", "核弹头已就绪"],
  "hud.nukeFabricating": ["Fabricating warhead — click to cancel", "正在制造核弹头 — 点击取消"],
  "hud.nukeEmpty": ["Empty warhead slot", "空核弹槽位"],
  "hud.watchHint": ["Select a faction's HQ to watch its economy", "选择某阵营的指挥中心以查看其经济"],
  "hud.tab.map": ["Map", "地图"],
  "hud.battleMap": ["Battle map", "战场地图"],
  "hud.tab.command": ["Command", "指挥"],
  "hud.chat": ["Chat", "聊天"],
  "hud.chatEmpty": ["Press Enter to say something.", "按 Enter 发言。"],
  "hud.chatPlaceholder": ["Message… (/t = team)", "输入消息…（/t = 队伍）"],
  "hud.groups": ["Army Groups", "编队"],
  "hud.groupsAdd": ["Add to Group", "加入编队"],
  "hud.groupsHint": ["Select units, then put them in a group.", "选中单位后将其加入编队。"],
  "hud.groupSelect": ["Group {0} — {1} units. Click to select, again to jump there.", "编队 {0} — {1} 个单位。点击选中，再次点击跳转。"],
  "hud.groupDisband": ["Disband group {0}", "解散编队 {0}"],
  "hud.groupAdd": ["Add the selection to group {0}", "将所选单位加入编队 {0}"],
  "hud.groupRemove": ["Take the selection out of group {0}", "将所选单位移出编队 {0}"],
  // ------------------------------------------------------- quick selection
  "quick.title": ["Quick unit selection", "快速选择单位"],
  "quick.land": ["LAND", "陆军"],
  "quick.air": ["AIR", "空军"],
  "quick.sea": ["SEA", "海军"],
  "quick.all": ["ALL", "全部"],
  "quick.hint": ["MOVE · RELEASE {0}", "移动 · 松开 {0}"],
  // ------------------------------------------------------------- commands
  "cmd.repair": ["Repair", "维修"],
  "cmd.move": ["Move", "移动"],
  "cmd.attack": ["Attack", "攻击"],
  "cmd.attackMove": ["Attack-move", "攻击移动"],
  "cmd.stop": ["Stop", "停止"],
  "cmd.hold": ["Hold position", "原地驻守"],
  "cmd.build": ["Build", "建造"],
  "cmd.sell": ["Sell", "出售"],
  "cmd.upgrade": ["Upgrade", "升级"],
  "cmd.fabricateNuke": ["Fabricate warhead", "制造核弹头"],
  "cmd.launchNuke": ["Launch nuke", "发射核弹"],
  "cmd.resume": ["Resume construction", "继续建造"],
  "cmd.unload": ["Unload all", "全部卸载"],
  "cmd.sellRefund": ["Sell (+{0})", "出售 (+{0})"],
  // ------------------------------------------------------------- alerts
  "alert.underAttack": ["{0} under attack!", "{0} 遭到攻击！"],
  "alert.unitsUnderAttack": ["{0} under attack!", "{0} 遭到攻击！"],
  "alert.lowPower": ["Power shortage — production slowed", "电力短缺——生产减速"],
  "alert.powerRestored": ["Power restored", "电力已恢复"],
  "alert.metalStalled": ["Out of metal — work paused", "金属耗尽——工程暂停"],
  "alert.noPop": ["Unit cap reached", "已达人口上限"],
  "alert.unitReady": ["{0} ready", "{0} 就绪"],
  "alert.constructionDone": ["{0} built", "{0} 建造完成"],
  "alert.upgradeDone": ["Upgrade complete: {0}", "升级完成：{0}"],
  "alert.nukeReady": ["Nuclear warhead ready", "核弹头已就绪"],
  "alert.nukeLaunched": ["Nuclear launch detected", "检测到核弹发射"],
  "alert.nukeIntercepted": ["Nuclear warhead shot down", "核弹头已被击落"],
  "alert.promoted": ["{0} promoted to {1}", "{0} 晋升为{1}"],
  "alert.respawned": ["{0} has been given a new headquarters", "{0} 获得了新的总部"],
  "alert.kicked": ["{0} was removed by the host", "{0} 已被房主移出"],
  "alert.speed": ["Game speed set to ×{0}", "游戏速度设为 ×{0}"],
  "alert.waveIncoming": ["Enemy attack wave incoming!", "敌军进攻波即将来袭！"],
  "alert.playerDefeated": ["{0} has been eliminated", "{0} 已被消灭"],
  "alert.playerSurrendered": ["{0} has surrendered", "{0} 已投降"],
  "alert.cannotBuildHere": ["Cannot build here", "无法在此建造"],
  "alert.notEnoughMetal": ["Not enough metal — three quarters of the price is needed to start", "金属不足——需备齐四分之三造价才能开工"],
  "alert.lastStand": ["No base left — your forces fight on for {0}s", "基地已失——部队将再坚持 {0} 秒"],
  "alert.needsDeposit": ["Must be built on a metal deposit", "必须建在金属矿脉上"],
  "alert.noProductionSlot": ["No free production slot — a Headquarters pays for three lines; build another for three more", "没有空余生产席位——每座总部提供三条生产线的席位，再建一座总部可多出三席"],
  "alert.requiresTech": ["Requires: {0}", "需要：{0}"],
  "alert.saved": ["Game saved", "游戏已保存"],
  "alert.autosaved": ["Autosaved", "已自动保存"],
  // ------------------------------------------------------------- pause menu
  "pause.title": ["Paused", "暂停"],
  "pause.resume": ["Resume", "继续"],
  "pause.save": ["Save game", "保存游戏"],
  "pause.settings": ["Settings", "设置"],
  "pause.guide": ["Beginner guide", "新手指南"],
  "pause.restart": ["Restart", "重新开始"],
  "pause.quit": ["Quit to menu", "退出到主菜单"],
  "pause.restartConfirm": ["Restart this game? Unsaved progress is lost.", "重新开始？未保存的进度将丢失。"],
  "pause.quitConfirm": ["Quit to menu? Unsaved progress is lost.", "退出到主菜单？未保存的进度将丢失。"],
  "pause.surrender": ["Surrender", "投降"],
  "pause.surrenderConfirm": [
    "Surrender the match? Everything you own is destroyed and you are out — you can stay and watch.",
    "确定投降？你的一切都会被摧毁，你也随之出局——你可以留下来观战。"
  ],
  // ------------------------------------------------------------- victory / defeat
  "end.victory": ["VICTORY", "胜利"],
  "end.defeat": ["DEFEAT", "战败"],
  "end.time": ["Time", "用时"],
  "end.unitsBuilt": ["Units built", "生产单位"],
  "end.unitsLost": ["Units lost", "损失单位"],
  "end.unitsKilled": ["Units destroyed", "击毁单位"],
  "end.buildingsLost": ["Buildings lost", "损失建筑"],
  "end.buildingsKilled": ["Buildings destroyed", "摧毁建筑"],
  "end.metalMined": ["Metal mined", "开采金属"],
  "end.nextMission": ["Next mission", "下一关"],
  "end.retry": ["Retry", "重试"],
  "end.toMenu": ["Main menu", "主菜单"],
  "end.continuePlay": ["Keep playing", "继续游玩"],
  "end.matchOver": ["MATCH OVER", "对局结束"],
  "end.winner": ["{0} wins", "{0} 获胜"],
  "end.eliminated": ["ELIMINATED", "已淘汰"],
  "end.eliminatedBody": ["Your faction is out of the fight. You can keep watching the match, or leave it.", "你的阵营已退出战斗。你可以继续观战，或离开对局。"],
  "end.spectate": ["Keep watching", "继续观战"],
  // ------------------------------------------------------------- settings
  "settings.title": ["Settings", "设置"],
  "settings.language": ["Language", "语言 / Language"],
  "settings.lang.auto": ["Auto", "自动"],
  "settings.music": ["Music volume", "音乐音量"],
  "settings.sfx": ["Sound effects", "音效音量"],
  "settings.voice": ["Voice", "语音音量"],
  "settings.voiceLang": ["Narrator language", "语音播报语言"],
  "settings.voiceLang.auto": ["Same as interface", "与界面语言一致"],
  "settings.edgeScroll": ["Edge scrolling", "屏幕边缘滚动"],
  "settings.healthBars": ["Always show health bars", "始终显示血条"],
  "settings.showFps": ["Show FPS", "显示帧率"],
  "settings.uiScale": ["UI scale", "界面缩放"],
  "settings.section.device": ["Device", "设备"],
  "settings.touchUi": ["Touch controls", "触屏操作"],
  "settings.touchUi.auto": ["Auto", "自动"],
  "settings.touchUi.desc": ["On-screen order buttons and tap-to-command.", "屏幕指令按钮与点触下令。"],
  "settings.sidebarSide": ["Sidebar position", "侧边栏位置"],
  "settings.sidebarSide.left": ["Left", "左侧"],
  "settings.sidebarSide.right": ["Right", "右侧"],
  "settings.renderScale": ["Render sharpness", "渲染精度"],
  "settings.renderScale.auto": ["Auto", "自动"],
  "settings.renderScale.desc": ["Higher is crisper on dense screens, and costs frames.", "在高像素密度屏幕上更锐利，但更耗性能。"],
  "settings.keepAwake": ["Keep screen awake", "保持屏幕常亮"],
  "settings.autoFullscreen": ["Fullscreen in battle", "战斗时全屏"],
  "settings.haptics": ["Vibration feedback", "振动反馈"],
  // the campaign row (its title is `campaign.title`): what a reset throws away
  "settings.progress.desc": ["{0} of {1} missions completed.", "已完成 {0}/{1} 关。"],
  "settings.section.dev": ["Developer", "开发者"],
  // ------------------------------------------------------------- mods (ui/modsPage.ts)
  "mods.title": ["Mods", "模组"],
  "mods.pending": ["Changes take effect after this match.", "更改将在本场结束后生效。"],
  "mods.installed": ["Installed", "已安装"],
  "mods.adds": ["{0} units, {1} buildings", "{0} 个单位，{1} 座建筑"],
  "mods.by": ["by {0}", "作者：{0}"],
  "mods.source.registry": ["from the registry", "来自官方仓库"],
  "mods.source.url": ["from {0}", "来自 {0}"],
  "mods.source.file": ["from {0}", "来自文件 {0}"],
  "mods.source.folder": ["from the folder {0}", "来自文件夹 {0}"],
  "mods.failed": ["Not loaded", "未加载"],
  "mods.newerGame": ["Needs game {0} or newer", "需要游戏版本 {0} 或更新"],
  "mods.reload": ["Reload", "重新读取"],
  "mods.reloadTip": ["Read the mod again from where it came", "从来源重新读取模组"],
  "mods.update": ["Update to {0}", "更新到 {0}"],
  "mods.remove": ["Remove", "移除"],
  "mods.removeConfirm": ["Remove this mod? Saves that use it will not load until it is back.", "移除该模组？使用它的存档在重新安装前无法读取。"],
  "mods.registry": ["Official registry", "官方仓库"],
  "mods.registry.lead": ["Every mod in the public steel-tide-mods repository.", "公开仓库 steel-tide-mods 中的全部模组。"],
  "mods.registry.loading": ["Fetching the list…", "正在获取列表…"],
  "mods.registry.offline": ["The registry could not be reached.", "无法连接到模组仓库。"],
  "mods.registry.empty": ["No mods published yet.", "尚无已发布的模组。"],
  "mods.registry.browse": ["Browse on the website", "在官网浏览"],
  "mods.search": ["Search", "搜索"],
  "mods.searchHint": ["Name, author, unit…", "名称、作者、单位…"],
  "mods.searchNone": ['Nothing matches "{0}".', "没有匹配“{0}”的模组。"],
  "mods.install": ["Install", "安装"],
  "mods.installing": ["Installing…", "安装中…"],
  "mods.installedMark": ["Installed", "已安装"],
  "mods.add": ["Add your own", "添加自制模组"],
  "mods.add.lead": ["A mod is a folder with a mod.json and its sprite sheets. Upload the folder, a zip of it, or a .steel-tide-mod file.", "一个模组就是一个包含 mod.json 和精灵图的文件夹。可上传文件夹、其压缩包，或 .steel-tide-mod 文件。"],
  "mods.add.file": ["Upload file…", "上传文件…"],
  "mods.add.fileTip": ["A .steel-tide-mod file, or a zip of the mod folder", ".steel-tide-mod 文件，或模组文件夹的压缩包"],
  "mods.add.folder": ["Open folder…", "打开文件夹…"],
  "mods.add.folderTip": ["Pick the mod folder itself; Chrome keeps it open so Reload re-reads your edits", "选择模组文件夹本身；Chrome 会记住它，修改后可点“重新读取”"],
  "mods.add.url": ["Add from URL…", "从网址添加…"],
  "mods.add.urlPrompt": ["The address of a mod folder (where mod.json is) or of a .steel-tide-mod file", "模组文件夹（mod.json 所在处）或 .steel-tide-mod 文件的网址"],
  "mods.add.guide": ["How to make one", "如何制作"],
  "mods.installed.toast": ["{0} installed: {1}", "已安装 {0}：{1}"],
  "mods.updated.toast": ["{0} reloaded", "已重新读取 {0}"],
  "mods.error.title": ["The mod could not be loaded", "模组无法加载"],
  "mods.warnings": ["Notes", "提示"],
  "mods.enabled": ["Enabled", "启用"],
  "mods.badge": ["Mod", "模组"],
  // ------------------------------------------------------------- the beginner guide (ui/guide.ts)
  "guide.title": ["Getting started", "新手上路"],
  "guide.intro": ["Your first minutes in a match: what to build, in what order, and why.", "开局的头几分钟：建什么、按什么顺序、为什么。"],
  "guide.engineers": ["Queue engineers", "排队生产工程师"],
  "guide.engineers.body": ["Your headquarters starts the match producing engineers. Queue two or three — they are the only units that can build.", "总部开局即可生产工程师。排两三个——只有它们能建造。"],
  "guide.metal": ["Claim metal", "占领矿点"],
  "guide.metal.body": ["Send the first engineer to the nearest deposit and place an extractor. Deposits are the only income there is, so an idle one is money left on the table.", "把第一个工程师派到最近的矿点建一座采矿站。矿点是唯一的收入来源，空着的矿点就是白白流失的钱。"],
  "guide.power": ["Add power", "补充电力"],
  "guide.power.body": ["The second engineer builds a power plant. The headquarters covers about one extractor by itself; after that every building you add needs power behind it.", "第二个工程师建一座发电厂。总部自身的电力大约只够一座采矿站，之后每加一座建筑都要有电力支撑。"],
  "guide.factory": ["A factory", "建造工厂"],
  "guide.factory.body": ["Place a war factory facing the enemy and set its rally point with a {0}. Build a buggy first and send it around the map to see what you are up against.", "把战车工厂建在面向敌人的一侧，用{0}设置集结点。先造一辆越野车绕地图侦察，看看对手在做什么。"],
  "guide.expand": ["Keep expanding", "持续扩张"],
  "guide.expand.body": ["Alternate extractors and power plants, and never let the factory sit idle. Heading into a fight, attack-move ({1}) rather than move, so units engage on the way.", "采矿站和发电厂交替建造，别让工厂闲着。进入战斗时用攻击移动（{1}）而不是移动，单位会一路交战。"],
  "guide.learnMore": ["Learn more on the website", "在官网了解更多"],
  "guide.learnMore.sub": ["The full guide: the economy, the counter web, the tech tree.", "完整指南：经济与电力、克制关系、科技树。"],
  "settings.devMode": ["Developer mode", "开发者模式"],
  "settings.devMode.desc": [
    "Every campaign mission unlocked. Switch it off to go back to your own progress.",
    "解锁全部战役关卡。关闭后恢复按进度解锁。"
  ],
  // ------------------------------------------------------------- controller
  "settings.tab.general": ["General", "常规"],
  "settings.tab.audio": ["Audio", "音频"],
  "settings.section.pad": ["Controller", "手柄"],
  "settings.padGlyphs": ["Button glyphs", "按键图标"],
  "settings.padGlyphs.auto": ["Auto", "自动"],
  "settings.padGlyphs.desc": ["Steam Input presents every pad as an Xbox one; choose your own here.", "Steam 输入会把所有手柄都当作 Xbox 手柄，可在此手动指定。"],
  "settings.padStickSpeed": ["Stick pan speed", "摇杆平移速度"],
  "settings.padRumble": ["Vibration", "手柄震动"],
  "pause.speed": ["Game speed", "游戏速度"],
  // the bindings (core/controls.ts, settingsUi.ts)
  "settings.tab.keys": ["Controls", "按键"],
  "settings.keys.keyboard": ["Keyboard", "键盘"],
  "settings.keys.mouse": ["Mouse", "鼠标"],
  "settings.keys.pad": ["Buttons", "按键"],
  "settings.keys.group.orders": ["Orders", "指令"],
  "settings.keys.group.camera": ["Camera and view", "视角"],
  "settings.keys.group.game": ["Game", "游戏"],
  "settings.keys.reset": ["Reset to default", "恢复默认"],
  "settings.keys.press": ["Press a key…", "请按键…"],
  "settings.keys.pressPad": ["Press a button…", "请按手柄键…"],
  "settings.keys.clear": ["Clear", "清除"],
  "settings.keys.hint": ["Click a key to change it; a key may serve more than one action. Escape and the number row are fixed.", "点击按键即可更改；一个键可用于多个操作。Esc 与数字行固定不变。"],
  "settings.mouse.command": ["Command button", "指令键"],
  "settings.mouse.command.desc": ["Gives orders; the other button selects.", "用于下令，另一键用于选择。"],
  "settings.mouse.right": ["Right", "右键"],
  "settings.mouse.left": ["Left", "左键"],
  "settings.mouse.panDrag": ["Pan by dragging", "拖动平移"],
  "settings.mouse.panDrag.desc": ["With the command button, a click still gives the order.", "选指令键时，单击仍为下令。"],
  "settings.mouse.middle": ["Middle button", "中键"],
  "settings.mouse.commandBtn": ["Command button", "指令键"],
  "settings.mouse.none": ["Off", "关"],
  "settings.mouse.invertZoom": ["Invert zoom", "反转缩放"],
  "bind.attackMove": ["Attack-move", "攻击移动"],
  "bind.move": ["Move, ignoring targets", "移动（忽略目标）"],
  "bind.stop": ["Stop", "停止"],
  "bind.hold": ["Hold position", "原地待命"],
  "bind.unload": ["Unload", "卸载"],
  "bind.launch": ["Launch warhead", "发射核弹"],
  "bind.selfDestruct": ["Self-destruct", "自毁"],
  "bind.quickSelect": ["Quick select (hold)", "快速选择（按住）"],
  "bind.panUp": ["Pan up", "视角上移"],
  "bind.panDown": ["Pan down", "视角下移"],
  "bind.panLeft": ["Pan left", "视角左移"],
  "bind.panRight": ["Pan right", "视角右移"],
  "bind.jumpHq": ["Jump to headquarters", "跳转到总部"],
  "bind.follow": ["Follow the selection", "跟随所选单位"],
  "bind.map": ["Battle map (hold to peek)", "战场地图（按住查看）"],
  "bind.sidebar": ["Toggle the sidebar", "展开 / 收起侧边栏"],
  "bind.xray": ["Health bars and see-through (hold)", "血条与透视（按住）"],
  "bind.pause": ["Pause", "暂停"],
  "bind.speedDown": ["Slower", "减速"],
  "bind.speedUp": ["Faster", "加速"],
  "bind.quickSave": ["Quick save", "快速保存"],
  "bind.quickLoad": ["Quick load", "快速读取"],
  "bind.help": ["Beginner guide", "新手指南"],
  "bind.scoreboard": ["Player list (hold)", "玩家列表（按住）"],
  "bind.chat": ["Chat", "聊天"],
  "bind.console": ["Admin console", "管理控制台"],
  "bind.pad.confirm": ["Select / confirm", "选择 / 确认"],
  "bind.pad.cancel": ["Cancel / back", "取消 / 返回"],
  "bind.pad.command": ["Command", "下令"],
  "bind.pad.attackMove": ["Attack-move", "攻击移动"],
  "bind.pad.modifier": ["Modifier (hold: queue, add)", "修饰键（按住：排队、加选）"],
  "bind.pad.wheel": ["Command wheel (hold)", "指令轮盘（按住）"],
  "bind.pad.quickSelect": ["Quick select (hold)", "快速选择（按住）"],
  "bind.pad.focus": ["Camera to the selection", "视角跳转到所选"],
  "bind.pad.map": ["Battle map", "战场地图"],
  "bind.pad.menu": ["Pause menu", "暂停菜单"],
  "bind.pad.hq": ["Jump to headquarters", "跳转到总部"],
  "bind.pad.sidebar": ["Sidebar focus", "操作侧边栏"],
  "help.leftClickShort": ["left click", "左键"],
  "help.rightClickShort": ["right click", "右键"],
  "pad.more": ["More…", "更多…"],
  "pad.hint.select": ["Select", "选择"],
  "pad.hint.boxSelect": ["Hold: box-select", "按住：框选"],
  "pad.hint.boxRelease": ["Release to select", "松开完成选择"],
  "pad.hint.quickSelect": ["Quick select", "快速选择"],
  "pad.hint.groups": ["Groups", "编队"],
  "pad.hint.map": ["Battle map", "战场地图"],
  "pad.hint.menu": ["Menu", "菜单"],
  "pad.hint.orders": ["Orders", "指令"],
  "pad.hint.build": ["Build", "建造"],
  "pad.hint.produce": ["Produce", "生产"],
  "pad.hint.deselect": ["Deselect", "取消选择"],
  "pad.hint.place": ["Place", "放置"],
  "pad.hint.keepPlacing": ["Hold: keep placing", "按住：连续放置"],
  "pad.hint.nudge": ["Nudge", "微调"],
  "pad.hint.cancel": ["Cancel", "取消"],
  "pad.hint.confirm": ["Confirm", "确认"],
  "pad.hint.choose": ["Choose", "选取"],
  "pad.hint.release": ["Release to confirm", "松开确认"],
  "pad.hint.page": ["Next page", "下一页"],
  "pad.hint.aim": ["Aim", "瞄准"],
  "pad.hint.look": ["Look there", "跳转视角"],
  "pad.hint.orderHere": ["Order here", "在此下令"],
  "pad.hint.close": ["Close", "关闭"],
  "pad.hint.move": ["Navigate", "导航"],
  "pad.hint.back": ["Back", "返回"],
  "pad.hint.tabs": ["Tabs", "切换页签"],
  "pad.verb.rally": ["Set rally point", "设置集结点"],
  "pad.verb.attack": ["Attack", "攻击"],
  "pad.verb.assist": ["Help build", "协助建造"],
  "pad.verb.board": ["Board", "登乘"],
  "pad.verb.pickup": ["Pick up", "接载"],
  // ------------------------------------------------------------- PWA updates
  "pwa.updateReady": ["A new version is ready.", "新版本已就绪。"],
  "pwa.reload": ["Reload", "重新载入"],
  // ------------------------------------------------------------- touch play
  "touch.boxSelect": ["Box select", "框选"],
  "touch.selectArmy": ["Select army", "选择全军"],
  "touch.deselect": ["Deselect", "取消选择"],
  "touch.confirm": ["Place", "放置"],
  "touch.cancel": ["Cancel", "取消"],
  "touch.rotateTitle": ["Rotate your device", "请横屏游玩"],
  "touch.rotateBody": ["Steel Tide is played in landscape.", "钢铁浪潮需要横屏操作。"],
  "touch.hintPlace": ["Drag to aim, then confirm", "拖动定位，然后确认"],
  "touch.hintBox": ["Drag to select · tap ▣ again to pan", "拖动框选 · 再次点击 ▣ 恢复平移"],
  "touch.hintRepair": ["Tap a friendly building to repair or finish construction", "点击友军建筑以维修或继续建造"],
  "touch.hintMove": ["Tap where to move", "点击移动目的地"],
  "touch.hintAttackMove": ["Tap where to attack-move", "点击攻击移动目的地"],
  "touch.hintNuke": ["Tap the map to choose the nuclear target", "点击地图选择核打击目标"],
  // ------------------------------------------------------------- about / help
  "about.title": ["About", "关于"],
  "about.body": [
    "Steel Tide is a love letter to classic real-time strategy — build a base, mine metal, keep the power on, and field land, sea and air forces with rock-paper-scissors counters. Made with a hand-rolled TypeScript engine; every sprite and sound is generated in code.",
    "《钢铁浪潮》致敬经典即时战略：建造基地、开采金属、维持电力，指挥海陆空三军相互克制的现代化部队。游戏采用自研 TypeScript 引擎，所有像素图与音效均由代码生成。"
  ],
  "about.website": ["Official website", "官方网站"],
  "about.libs": ["Open source", "开源组件"],
  "about.libsIntro": ["The engine has no runtime dependencies; these build it and dress it.", "引擎没有运行时依赖，以下是构建与界面所用的开源组件。"],
  "about.author": ["About the author", "关于作者"],
  "about.authorBody": ["Steel Tide is made by Rene Wang.", "《钢铁浪潮》由 Rene Wang 制作。"],
  "help.shiftDesc": ["Queue orders · add to selection", "排队指令 · 加选单位"],
  // ------------------------------------------------------------- stats labels (tooltips)
  "stat.cost": ["Cost", "造价"],
  "stat.time": ["Build time", "建造时间"],
  "stat.hp": ["HP", "耐久"],
  "stat.dps": ["DPS", "每秒伤害"],
  "stat.range": ["Range", "射程"],
  "stat.repair": ["Repair", "维修"],
  "stat.speed": ["Speed", "速度"],
  "stat.pop": ["Unit cap", "人口"],
  "stat.power": ["Power", "电力"],
  "stat.productionSlots": ["Production slots: {0} of {1} in use", "生产席位：已用 {0} / 共 {1}"],
  "hud.slotsFull": ["Production slots {0}/{1} — build another Headquarters for three more", "生产席位 {0}/{1}——再建一座总部可多出三席"],
  "stat.metalRate": ["+{0} metal/s", "+{0} 金属/秒"],
  "stat.strongVs": ["Strong vs", "克制"],
  "stat.weakVs": ["Weak vs", "被克制"],
  "stat.cargo": ["Transport capacity: {0}", "运载量：{0}"],
  "stat.underwater": ["Submerged — only sonar reveals it", "潜航——仅声呐可发现"],
  "stat.sonar": ["Sonar — reveals submarines", "声呐——可发现潜艇"],
  "stat.stealth": ["Stealth — the enemy sees it only within {0} tiles, or {1} of a Radar Station", "隐形——敌人仅在 {0} 格内可见，雷达站为 {1} 格"],
  "stat.detect": ["Reveals stealth aircraft within {0} tiles", "可发现 {0} 格内的隐形飞行器"],
  "stat.friendlyFire": ["Friendly fire — the blast harms your own units too", "误伤——爆炸同样会伤及己方单位"],
  "stat.armor.light": ["Light", "轻甲"],
  "stat.armor.medium": ["Medium", "中甲"],
  "stat.armor.heavy": ["Heavy", "重甲"],
  "stat.armor.ship": ["Ship", "舰船"],
  "stat.armor.sub": ["Submarine", "潜艇"],
  "stat.armor.air": ["Aircraft", "飞行器"],
  "stat.armor.structure": ["Structure", "建筑"],
  // ------------------------------------------------------------- teams
  "team.blue": ["Blue", "蓝方"],
  "team.red": ["Red", "红方"],
  "team.green": ["Green", "绿方"],
  "team.purple": ["Purple", "紫方"],
  "team.orange": ["Orange", "橙方"],
  "team.cyan": ["Cyan", "青方"],
  // ------------------------------------------------------------- admin console
  "console.title": ["Console", "控制台"],
  "console.placeholder": ["type help for the commands", "输入 help 查看命令"],
  "console.hostOnly": ["Only the host can run commands.", "只有房主可以执行命令。"],
  "console.noKick": ["There is nobody to remove in a local game.", "本地对局中没有可移出的玩家。"],
  "console.speedSet": ["Game speed ×{0}", "游戏速度 ×{0}"],
  // ------------------------------------------------------------- units: land
  "unit.engineer.name": ["Engineer", "工程车"],
  "unit.engineer.desc": ["Constructs and repairs buildings. The backbone of any base.", "建造并维修建筑，基地运转的基石。"],
  "unit.buggy.name": ["Recon Buggy", "侦察车"],
  "unit.buggy.desc": ["Fast scout with a light machine gun. Great eyes, thin skin.", "装备轻机枪的高速侦察车。眼观六路，皮薄馅大。"],
  "unit.ltank.name": ["Wolf Light Tank", "野狼轻型坦克"],
  "unit.ltank.desc": ["Cheap autocannon tank. Shreds light vehicles.", "廉价机炮坦克，专撕轻型载具。"],
  "unit.mbt.name": ["Bison Battle Tank", "野牛主战坦克"],
  "unit.mbt.desc": ["Reliable main battle tank. The core of any armored push.", "可靠的主战坦克，装甲推进的中坚。"],
  "unit.htank.name": ["Mammoth Heavy Tank", "猛犸重型坦克"],
  "unit.htank.desc": ["Twin cannons, massive armor. Slow, but it arrives like a verdict.", "双联主炮、超厚装甲。行如判决，缓慢而不可阻挡。"],
  "unit.td.name": ["Viper Tank Destroyer", "蝰蛇反坦克车"],
  "unit.td.desc": ["Long-range guided anti-tank missiles. Melts heavy armor, hates being rushed.", "远程反坦克导弹，融化重甲，惧怕近身。"],
  "unit.flak.name": ["Flak Track", "防空炮车"],
  "unit.flak.desc": ["Mobile flak cannon. Cheap insurance against aircraft.", "机动高射炮，对抗空军的廉价保险。"],
  "unit.sam.name": ["Hawk SAM Launcher", "猎鹰防空导弹车"],
  "unit.sam.desc": ["Long-range surface-to-air missiles. Owns the sky above your army.", "远程防空导弹，掌控大军头顶的天空。"],
  "unit.arty.name": ["Thunder Howitzer", "雷霆榴弹炮"],
  "unit.arty.desc": ["Long-range artillery. Cracks turtled defenses from beyond retaliation.", "远程榴弹炮，在敌方还击范围之外敲开乌龟壳。"],
  "unit.mlrs.name": ["Tempest MLRS", "风暴火箭炮"],
  "unit.mlrs.desc": ["Eight-rocket saturation barrage. Erases fortified positions and clumped armies.", "八联饱和火箭覆盖，抹平堡垒与扎堆的军队。"],
  "unit.salamander.name": ["Salamander Thermobaric Mortar", "火蜥蜴温压炮车"],
  "unit.salamander.desc": ["Lobs thermobaric shells with a two-tile blast that point defence cannot stop — and that burns your own units too. Short reach: keep your line out of its footprint.", "投掷温压弹，两格范围的爆炸无法被拦截塔阻挡——但也会烧伤己方单位。射程很短：让友军避开落点。"],
  "unit.bulwark.name": ["Bulwark Mobile Interrupter", "壁垒机动拦截车"],
  "unit.bulwark.desc": ["Point defence on tracks: shoots down rockets and guided missiles within 5 tiles, 6 rounds ready, one replaced every 1.5 s. It has no gun of its own and cannot hurt anything.", "履带式点防御：拦截 5 格内来袭的火箭弹与制导导弹，备弹 6 发，每 1.5 秒补充一发。自身没有武器，无法攻击任何目标。"],
  // ------------------------------------------------------------- units: sea
  "unit.gunboat.name": ["Gunboat", "炮艇"],
  "unit.gunboat.desc": ["Fast patrol boat with an autocannon. Cheap naval eyes.", "装备机炮的高速巡逻艇，海上的廉价耳目。"],
  "unit.mboat.name": ["Missile Boat", "导弹艇"],
  "unit.mboat.desc": ["Anti-ship missiles on a small hull. Punches far above its weight.", "小艇扛重锤，反舰导弹一击致命。"],
  "unit.frigate.name": ["Aegis Frigate", "神盾护卫舰"],
  "unit.frigate.desc": ["Fleet air-defense screen with rapid SAMs and a deck gun.", "舰队防空屏障，快速防空导弹加舰炮。"],
  "unit.destroyer.name": ["Orca Destroyer", "虎鲸驱逐舰"],
  "unit.destroyer.desc": ["Naval gun plus sonar and anti-submarine torpedoes that out-range a sub's own — the submarine hunter.", "舰炮、声呐加射程更远的反潜鱼雷——潜艇猎手。"],
  "unit.sub.name": ["Barracuda Submarine", "梭鱼潜艇"],
  "unit.sub.desc": ["Submerged torpedo ambusher. Invisible except to sonar. With a Radar Station and a Nuclear Reactor standing it fabricates one nuclear warhead of its own and launches it from under the water.", "潜航鱼雷伏击者，除声呐外无人可见。拥有雷达站和核反应堆后，可自行制造一枚核弹头并从水下发射。"],
  "unit.btlship.name": ["Sovereign Battleship", "君王战列舰"],
  "unit.btlship.desc": ["Triple heavy guns bombard land and sea from extreme range.", "三联重炮超远程轰击海陆目标。"],
  "unit.seatrans.name": ["Landing Craft", "登陆艇"],
  "unit.seatrans.desc": ["Carries 4 cargo weight across water.", "可运载 4 点载重渡海。"],
  "unit.kraken.name": ["Kraken Cruise-Missile Submarine", "海妖巡航导弹潜艇"],
  "unit.kraken.desc": ["Fires cruise missiles at land targets from under the water, 12 tiles out — but sees only 6, so it needs a spotter, and it cannot target a ship at all. Its missiles can be intercepted.", "从水下向 12 格外的陆地目标发射巡航导弹——但视野仅 6 格，需要其他单位提供视野，且完全无法攻击舰船。导弹可被拦截。"],
  "unit.moray.name": ["Moray Infiltration Submarine", "海鳗渗透潜艇"],
  "unit.moray.desc": ["A submerged transport with a hold of 4 cargo weight. Unarmed, invisible except to sonar, and it has to touch a shore to load or unload.", "潜航运输艇，载重 4。无武装，除声呐外无人可见，装卸必须靠岸。"],
  // ------------------------------------------------------------- units: air
  "unit.drone.name": ["Scout Drone", "侦察无人机"],
  "unit.drone.desc": ["Unarmed, expendable, sees everything.", "无武装、可消耗，但看得见一切。"],
  "unit.fighter.name": ["Falcon Fighter", "猎隼战斗机"],
  "unit.fighter.desc": ["Air-superiority fighter. Only targets aircraft — and deletes them.", "制空战斗机，只打飞机，且一打一个准。"],
  "unit.heli.name": ["Cobra Attack Helicopter", "眼镜蛇武装直升机"],
  "unit.heli.desc": ["Hovering anti-tank missile platform. Terror of slow armor.", "悬停反坦克导弹平台，重甲的噩梦。"],
  "unit.jet.name": ["Thunderbolt Strike Jet", "霹雳攻击机"],
  "unit.jet.desc": ["Rocket strafing runs against vehicles and light targets.", "火箭弹俯冲扫射，专欺负地面载具。"],
  "unit.mjet.name": ["Albatross Naval Striker", "信天翁反舰攻击机"],
  "unit.mjet.desc": ["Sea-skimming anti-ship missiles. Warships fear the horizon.", "掠海反舰导弹，让军舰恐惧地平线。"],
  "unit.bomber.name": ["Vulture Bomber", "秃鹫轰炸机"],
  "unit.bomber.desc": ["Carpet bombs that level buildings and dug-in positions.", "地毯式轰炸，夷平建筑与坚固阵地。"],
  "unit.theli.name": ["Pelican Transport Helicopter", "鹈鹕运输直升机"],
  "unit.theli.desc": ["Airlifts 2 cargo weight anywhere.", "空运 2 点载重，全图直达。"],
  "unit.c47.name": ["C-47 Skytrain", "C-47 空中列车"],
  "unit.c47.desc": ["Heavy air transport with 5 cargo capacity. Lands while units board or disembark, and can be shot like a vehicle while it is down.", "重型空运机，载重 5；部队上下机时会降落停驶，停在地面时会像车辆一样遭到地面火力攻击。"],
  "unit.gunship.name": ["Spectre Gunship", "幽灵炮艇机"],
  "unit.gunship.desc": ["Circling heavy gunship raining sustained cannon fire.", "盘旋重型炮艇机，倾泻持续炮火。"],
  "unit.wraith.name": ["Wraith Stealth Bomber", "幽魂隐形轰炸机"],
  "unit.wraith.desc": ["Two heavy bombs: one pass levels a radar or a SAM site. Invisible to the enemy beyond 4 tiles, or 8 from a Radar Station, so anti-air sees it coming only at the last moment.", "两枚重型炸弹：一次投弹即可夷平雷达站或防空导弹阵地。4 格外的敌人看不见它（雷达站为 8 格），防空火力只能在最后一刻发现它。"],
  "unit.cormorant.name": ["Cormorant ASW Helicopter", "鸬鹚反潜直升机"],
  "unit.cormorant.desc": ["Dipping sonar and homing torpedoes: the aircraft that hunts submarines. A torpedo has to be dropped into water — attack from over the sea.", "吊放声呐加自导鱼雷，专门猎杀潜艇的飞行器。鱼雷必须投入水中——请从海面上方发起攻击。"],
  // ------------------------------------------------------------- buildings
  "unit.hq.name": ["Headquarters", "总部"],
  "unit.hq.desc": ["Command center. Produces engineers and pays for three production lines — War Factories, Airbases or Naval Yards, in any mix; a second Headquarters pays for three more. Protect it.", "指挥中枢，可生产工程车，并提供三条生产线的席位——战车工厂、空军基地或造船厂，任意搭配；再建一座总部可多出三席。务必保护。"],
  "unit.extractor.name": ["Metal Extractor", "采矿场"],
  "unit.extractor.desc": ["Mines metal from a deposit. Your economy lives here.", "在矿脉上开采金属，经济命脉所在。"],
  "unit.extractor2.name": ["Advanced Extractor", "高级采矿场"],
  "unit.extractor2.desc": ["Twin drills double the yield of the same deposit.", "双钻头并进，同一矿脉双倍产出。"],
  "unit.extractor3.name": ["Deep-Core Extractor", "深层采矿场"],
  "unit.extractor3.desc": ["A deep-core bore yields far more metal from the same deposit.", "深层钻机从同一矿脉中开采出远超以往的金属。"],
  "unit.power.name": ["Power Plant", "发电厂"],
  "unit.power.desc": ["Generates power. Low power slows production and defenses.", "产生电力。电力不足会拖慢生产与防御。"],
  "unit.power2.name": ["Advanced Power Plant", "高级发电厂"],
  "unit.power2.desc": ["Triple output from the same footprint.", "同样占地，三倍出力。"],
  "unit.power3.name": ["Singularity Power Plant", "奇点发电厂"],
  "unit.power3.desc": ["A contained core more than triples the Advanced Plant's output.", "受控核心的出力超过高级发电厂的三倍。"],
  "unit.factory.name": ["War Factory", "战车工厂"],
  "unit.factory.desc": ["Produces engineers and ground vehicles. Takes one of the Headquarters' three production slots.", "生产工程车与地面载具。占用总部三个生产席位之一。"],
  "unit.factory2.name": ["Advanced War Factory", "高级战车工厂"],
  "unit.factory2.desc": ["Unlocks advanced ground vehicles.", "解锁高级地面载具。"],
  "unit.factory3.name": ["Arsenal", "兵工厂"],
  "unit.factory3.desc": ["The Level-3 war factory: adds the Salamander and the Bulwark. Needs a Radar Station to upgrade.", "三级战车工厂：新增火蜥蜴与壁垒。升级需要雷达站。"],
  "unit.airbase.name": ["Airbase", "空军基地"],
  "unit.airbase.desc": ["Produces aircraft. Takes one of the Headquarters' three production slots.", "生产飞行器。占用总部三个生产席位之一。"],
  "unit.airbase2.name": ["Advanced Airbase", "高级空军基地"],
  "unit.airbase2.desc": ["Unlocks advanced aircraft.", "解锁高级飞行器。"],
  "unit.airbase3.name": ["Strategic Airbase", "战略空军基地"],
  "unit.airbase3.desc": ["The Level-3 airbase: adds the Wraith and the Cormorant. Needs a Radar Station to upgrade.", "三级空军基地：新增幽魂与鸬鹚。升级需要雷达站。"],
  "unit.navyard.name": ["Naval Yard", "造船厂"],
  "unit.navyard.desc": ["Builds warships. Place on the shoreline. Takes one of the Headquarters' three production slots.", "建造舰船。需沿海岸线放置。占用总部三个生产席位之一。"],
  "unit.navyard2.name": ["Advanced Naval Yard", "高级造船厂"],
  "unit.navyard2.desc": ["Unlocks advanced warships.", "解锁高级舰船。"],
  "unit.navyard3.name": ["Deepwater Yard", "深水船坞"],
  "unit.navyard3.desc": ["The Level-3 naval yard: adds the Kraken and the Moray. Needs a Radar Station to upgrade.", "三级造船厂：新增海妖与海鳗。升级需要雷达站。"],
  "unit.mgturret.name": ["MG Turret", "机枪塔"],
  "unit.mgturret.desc": ["Rapid-fire defense against light vehicles and aircraft.", "速射防御塔，克制轻型载具与飞行器。"],
  "unit.gatling.name": ["Gatling Turret", "加特林炮塔"],
  "unit.gatling.desc": ["A wall of lead. Triple the firepower.", "弹幕如墙，三倍火力。"],
  "unit.cannonturret.name": ["Cannon Turret", "加农炮塔"],
  "unit.cannonturret.desc": ["Anti-armor cannon emplacement.", "反装甲加农炮阵地。"],
  "unit.cannonturret2.name": ["Bastion Cannon", "要塞重炮"],
  "unit.cannonturret2.desc": ["Heavy twin cannons with extended range.", "双联重炮，射程更远。"],
  "unit.aaturret.name": ["AA Turret", "防空炮塔"],
  "unit.aaturret.desc": ["Flak battery. Air-only.", "高射炮组，仅对空。"],
  "unit.samsite.name": ["SAM Site", "防空导弹阵地"],
  "unit.samsite.desc": ["Long-range missiles that own the local airspace.", "远程防空导弹，掌控周边空域。"],
  "unit.interceptor.name": ["Missile Interrupter", "导弹拦截塔"],
  "unit.interceptor.desc": ["Point defence. Shoots down incoming rockets and Viper anti-tank missiles within 7 tiles — one round per kill, 8 rounds ready, one replaced every 0.75s. It cannot shoot at ground units, shells or nuclear warheads.", "点防御设施。拦截 7 格内来袭的火箭弹和蝎蛇反坦克导弹——每次拦截消耗一发，备弹 8 发，每 0.75 秒补充一发。无法攻击地面单位、炮弹或核弹头。"],
  "unit.interceptor2.name": ["Strategic Interrupter", "战略拦截塔"],
  "unit.interceptor2.desc": ["Level-2 point defence. Intercepts rockets and Viper anti-tank missiles within 9 tiles, with 12 ready rounds and reinforced armor. It cannot shoot at ground units, shells or nuclear warheads.", "二级点防御设施。拦截 9 格内的火箭弹与蝎蛇反坦克导弹，备弹 12 发，并具有更坚固的装甲。无法攻击地面单位、炮弹或核弹头。"],
  "unit.repairtower.name": ["Repair Tower", "维修塔"],
  "unit.repairtower.desc": ["Repairs up to three damaged allies in range at once, worst hit first. Multiple towers stack their repair speed on one target, but cannot repair each other. Low power slows repairs.", "同时维修范围内最多三个受损友军，优先最重伤者。多座维修塔可叠加同一目标的维修速度，但不会互相维修。电力不足会降低维修速度。"],
  "unit.radar.name": ["Radar Station", "雷达站"],
  "unit.radar.desc": ["Lifts the fog for 24 tiles around it — the whole approach to a base, so every gun inside the circle sees what it shoots — and unlocks top-tier weapons technology. Short of power its sight shrinks to 7.", "驱散周围 24 格的战争迷雾——覆盖基地的整条进攻路线，圈内的每门炮都能看见自己的目标——并解锁顶级武器科技。电力不足时视野缩至 7 格。"],
  "unit.nukesilo.name": ["Nuclear Silo", "核弹发射井"],
  "unit.nukesilo.desc": ["Fabricates and stores up to two nuclear warheads; needs a Radar Station and a Nuclear Reactor. Launches only at a manually chosen target, and the warhead can be shot down on the way.", "制造并储存最多两枚核弹头，需要雷达站和核反应堆。仅能向手动选择的目标发射，弹头在途中可能被击落。"],
  "unit.reactor.name": ["Nuclear Reactor", "核反应堆"],
  "unit.reactor.desc": ["Breeds the cores that arm a warhead: with a Radar Station it is what a silo needs, and what lets a submarine arm one. Feeds the grid as well.", "为核弹头培育裂变核心：与雷达站一起构成发射井的前置条件，也让潜艇能自行装备核弹。同时为电网供电。"],
  "unit.warhead.name": ["Nuclear Warhead", "核弹头"],
  "unit.warhead.desc": ["A warhead in flight: no gun, no orders, a straight line to the point it was sent to. Only a veteran anti-air unit — rank 2 or better — can shoot it down before it lands; a green unit or an emplacement cannot touch it.", "飞行中的核弹头：没有武器、不接受指令，直线飞向目标点。只有老兵级（2 级及以上）的防空单位才能在落地前将其击落，新兵单位和防御建筑都碰不到它。"],
  // ------------------------------------------------------------- terrain
  "terrain.0": ["Deep water", "深水"],
  "terrain.1": ["Shallow water", "浅水"],
  "terrain.2": ["Sand", "沙地"],
  "terrain.3": ["Grass", "草地"],
  "terrain.4": ["Forest", "森林"],
  "terrain.5": ["Rock", "岩石"],
  "terrain.6": ["Road", "道路"],
  "terrain.7": ["Mud", "泥地"],
  "terrain.8": ["Marsh", "沼泽"],
  "terrain.9": ["Snow", "雪地"],
  "terrain.10": ["Rubble", "废墟"],
  "terrain.11": ["Lava", "熔岩"],
  "terrain.12": ["Cliff, facing north", "悬崖（面朝北）"],
  "terrain.13": ["Cliff, facing east", "悬崖（面朝东）"],
  "terrain.14": ["Cliff, facing south", "悬崖（面朝南）"],
  "terrain.15": ["Cliff, facing west", "悬崖（面朝西）"],
  // ------------------------------------------------------------- map editor
  "editor.title": ["Map Editor", "地图编辑器"],
  "editor.terrain": ["Terrain", "地形"],
  "editor.tools": ["Tools", "工具"],
  "editor.map": ["Map", "地图"],
  "editor.brush": ["Brush", "笔刷"],
  "editor.tool.paint": ["Paint terrain", "绘制地形"],
  "editor.tool.deposit": ["Metal deposit", "金属矿脉"],
  "editor.tool.spawn": ["Spawn point", "出生点"],
  "editor.tool.erase": ["Erase deposit or spawn", "清除矿脉或出生点"],
  "editor.name": ["Name", "名称"],
  "editor.new": ["New map…", "新建地图…"],
  "editor.newTitle": ["New map", "新建地图"],
  "editor.width": ["Width", "宽度"],
  "editor.height": ["Height", "高度"],
  "editor.fill": ["Fill with", "填充"],
  "editor.create": ["Create", "创建"],
  "editor.confirmReplace": ["Replace the map you are editing? Anything not exported is lost.", "替换正在编辑的地图？未导出的内容将丢失。"],
  "editor.shorelines": ["Tidy shorelines", "整理海岸线"],
  "editor.shorelinesTip": ["Sand beside water and shallows beside land, the way the generators finish a map.", "临水铺沙、临岸变浅，与生成器收尾时一致。"],
  "editor.grid": ["Grid", "网格"],
  "editor.undo": ["Undo", "撤销"],
  "editor.import": ["Import", "导入"],
  "editor.export": ["Export", "导出"],
  "editor.useInSandbox": ["Use in Sandbox", "在沙盒中使用"],
  "editor.spawns": ["{0} spawns", "{0} 个出生点"],
  "editor.deposits": ["{0} deposits", "{0} 处矿脉"],
  "editor.warn.noSpawn": ["No spawn point yet — the map cannot be played.", "尚无出生点——地图无法游玩。"],
  "editor.warn.spawnGround": ["Spawn {0} is not on open grass or sand: the headquarters needs it.", "出生点 {0} 不在开阔的草地或沙地上：总部需要这样的地面。"],
  "editor.warn.cliffStub": ["{0} isolated cliff tiles — a lone cliff draws as a stub.", "{0} 个孤立的悬崖格——孤立悬崖会显示为残桩。"],
  "editor.warn.spawnsFull": ["A map seats at most {0} factions.", "一张地图最多容纳 {0} 个阵营。"],
  "editor.importFailed": ["Could not read that map: {0}", "无法读取该地图：{0}"],
  "editor.imported": ["Map loaded: {0}", "已载入地图：{0}"],
  "editor.sentToSandbox": ["The map is in the Sandbox setup.", "地图已放入沙盒设置。"],
  "editor.hint": ["Left drag paints · right drag pans · wheel zooms · Ctrl+Z undoes", "左键拖动绘制 · 右键拖动平移 · 滚轮缩放 · Ctrl+Z 撤销"],
  // ------------------------------------------------------------- misc gameplay
  "game.constructing": ["Constructing…", "建造中…"],
  "game.upgrading": ["Upgrading…", "升级中…"],
  // ------------------------------------------------------------- voice
  // What Command says over the radio (core/voice.ts lists when). Recorded by
  // `pnpm voice` from these lines, so a change here is a re-take, not a retitle.
  "voice.match.start": ["Command online. Base established. The field is yours, commander.", "指挥系统上线。基地已建立。战场交给你了，指挥官。"],
  "voice.objective.done": ["Objective complete.", "目标已完成。"],
  "voice.objective.new": ["New objective received.", "收到新目标。"],
  "voice.victory": ["Victory. The enemy has been broken. Well fought, commander.", "胜利。敌军已被击溃。打得漂亮，指挥官。"],
  "voice.defeat": ["Our forces have been overrun. Command is going dark.", "我军已被击溃。指挥系统即将关闭。"],
  "voice.lastStand": ["Headquarters lost. No way to rebuild. Hold out, this is our last stand.", "总部已失守，无法重建。坚持住，这是最后一战。"],
  "voice.faction.enemyOut": ["Enemy faction eliminated.", "敌方阵营已被消灭。"],
  "voice.faction.allyOut": ["An allied faction has fallen.", "友军阵营已陷落。"],
  "voice.built": ["Construction complete.", "建造完成。"],
  "voice.unit.ready.1": ["Unit ready.", "单位就绪。"],
  "voice.unit.ready.2": ["New unit rolling out.", "新单位已出厂。"],
  "voice.unit.ready.3": ["Reinforcements ready.", "增援就绪。"],
  "voice.upgrade.done": ["Upgrade complete.", "升级完成。"],
  "voice.power.low": ["Power shortage. Production is slowing.", "电力短缺，生产减速。"],
  "voice.power.restored": ["Power restored.", "电力已恢复。"],
  "voice.metal.out": ["Out of metal. Work has stalled.", "金属耗尽，工程暂停。"],
  "voice.pop.cap": ["Unit cap reached.", "已达人口上限。"],
  "voice.place.blocked": ["Cannot build there.", "无法在此建造。"],
  "voice.place.deposit": ["Extractors must stand on a deposit.", "采矿场必须建在矿脉上。"],
  "voice.place.metal": ["Insufficient metal.", "金属不足。"],
  "voice.place.ok": ["Building.", "开始建造。"],
  "voice.sold": ["Structure sold.", "建筑已出售。"],
  "voice.attack.base": ["Our base is under attack.", "我方基地遭到攻击。"],
  "voice.attack.hq": ["Headquarters under attack!", "总部遭到攻击！"],
  "voice.attack.units": ["Our forces are under attack.", "我方部队遭到攻击。"],
  "voice.wave.incoming": ["Enemy attack wave inbound.", "敌军进攻波来袭。"],
  "voice.enemy.sighted": ["Enemy sighted.", "发现敌军。"],
  "voice.unit.lost": ["Unit lost.", "单位损失。"],
  "voice.structure.lost": ["Structure destroyed.", "建筑被摧毁。"],
  "voice.promoted": ["Unit promoted.", "单位晋升。"],
  "voice.nuke.ready": ["Nuclear warhead ready.", "核弹头已就绪。"],
  "voice.nuke.launch": ["Warning. Nuclear launch detected.", "警告，检测到核弹发射。"],
  "voice.nuke.intercepted": ["Warhead intercepted.", "核弹头已被拦截。"],
  "voice.nuke.shotDown": ["Our warhead has been shot down.", "我方核弹头被击落。"],
  "voice.nuke.impact": ["Nuclear detonation confirmed.", "核爆已确认。"],
  "voice.ack.move.1": ["Moving out.", "出发。"],
  "voice.ack.move.2": ["On our way.", "正在前往。"],
  "voice.ack.attack.1": ["Engaging.", "开始交战。"],
  "voice.ack.attack.2": ["Target acquired.", "已锁定目标。"],
  "voice.ack.fireMission": ["Fire mission received.", "收到火力任务。"],
  "voice.ack.hold": ["Holding position.", "原地待命。"],
  "voice.ack.load": ["Loading up.", "正在装载。"],
  "voice.ack.unload": ["Unloading.", "正在卸载。"],
  "voice.saved": ["Game saved.", "游戏已保存。"]
};
const MOD_FORMAT = "steel-tide-mod";
const MOD_FORMAT_VERSION = 1;
const MOD_FILE_EXT = ".steel-tide-mod";
const MOD_MANIFEST_NAME = "mod.json";
const MOD_REGISTRY_REPO = "rivertwilight/steel-tide-mods";
const MOD_REGISTRY_URL = `https://raw.githubusercontent.com/${MOD_REGISTRY_REPO}/main/index.json`;
const MOD_REGISTRY_WEB = `https://github.com/${MOD_REGISTRY_REPO}`;
function modRegistryBase(id) {
  return `https://raw.githubusercontent.com/${MOD_REGISTRY_REPO}/main/mods/${id}/`;
}
const MAX_MOD_DEFS = 200;
const MAX_MOD_SPRITES = 120;
const MAX_MANIFEST_BYTES = 1024 * 1024;
const MAX_MOD_FILES_BYTES = 24 * 1024 * 1024;
const ID_RE = /^[a-z0-9][a-z0-9_-]{1,39}$/;
const ATLAS_KEY_RE = /^(u|tur)\.[a-z0-9][a-z0-9_-]{1,39}$/;
const FILE_RE = /^(?!\/)(?!.*\.\.)[A-Za-z0-9_./-]{1,120}$/;
const ARMOR_CLASSES = ["light", "medium", "heavy", "ship", "sub", "air", "structure"];
const TARGET_DOMAINS = ["ground", "ship", "sub", "air"];
const WEAPON_CLASSES = ["mg", "autocannon", "cannon", "at", "he", "rocket", "navgun", "ashm", "torpedo", "aa"];
const PROJECTILES = ["bullet", "shell", "missile", "rocket", "bomb", "torpedo", "flak"];
const UNIT_DOMAINS = ["ground", "ship", "air"];
const TRAILS = ["tread", "tire", "wake"];
const WEAPON_SOUNDS = ["mg", "autocannon", "cannon", "missile", "flak", "arty", "rocket", "torpedo", "bomb"];
const MANIFEST_SPECS = [
  { name: "format", type: "string", required: true, doc: [`always "${MOD_FORMAT}"`, `固定为 "${MOD_FORMAT}"`] },
  { name: "v", type: "int", required: true, min: 1, max: 1, doc: [`format version, ${MOD_FORMAT_VERSION}`, `格式版本，${MOD_FORMAT_VERSION}`] },
  { name: "id", type: "id", required: true, doc: ["the mod's id: lower case, letters, digits, `-` — its folder in the registry", "模组 id：小写字母、数字和 `-`，也是它在仓库中的文件夹名"] },
  { name: "name", type: "text", required: true, doc: ["the name shown in the mod list", "模组列表中显示的名称"] },
  { name: "version", type: "string", required: true, max: 32, doc: ["e.g. `1.0.0`; the game offers an update when the registry's is newer", "如 `1.0.0`；仓库版本更新时游戏会提示更新"] },
  { name: "author", type: "string", max: 80, doc: ["who made it", "作者"] },
  { name: "description", type: "text", doc: ["one or two sentences for the list", "一两句话的介绍"] },
  { name: "homepage", type: "string", max: 200, doc: ["a link: a repository, a thread", "主页链接"] },
  { name: "license", type: "string", max: 80, def: "CC-BY-4.0", doc: ["the mod's licence (SPDX id)", "模组许可证（SPDX 标识）"] },
  { name: "minGame", type: "string", max: 32, doc: ["the oldest game version it is written for", "所需的最低游戏版本"] },
  { name: "defs", type: "defs", required: true, doc: ["the units, buildings and upgrade levels", "单位、建筑与升级等级"] },
  { name: "sprites", type: "sprites", doc: ["the sheets the defs draw with (see below)", "各定义使用的精灵图（见下）"] },
  { name: "files", type: "files", doc: ["single-file form only: the sheets, embedded as data URLs by path", "仅单文件形式：按路径内嵌的图片（data URL）"] }
];
const DEF_SPECS = [
  { name: "id", type: "id", required: true, doc: ["unique across every mod and the vanilla roster; prefix a generic word with your mod's id", "在所有模组和原版中唯一；通用名字前加上模组 id 前缀"] },
  { name: "name", type: "text", required: true, doc: ["as the HUD shows it", "HUD 中显示的名称"] },
  { name: "desc", type: "text", def: '""', doc: ["the tooltip line", "提示中的描述"] },
  { name: "extends", type: "id", doc: ["a vanilla def id (or an earlier def of this mod) to copy, then override field by field; inherits its art and where it is built", "要复制的原版定义 id（或本模组中前面的定义），再逐字段覆盖；继承其图像和生产位置"] },
  { name: "kind", type: "enum", values: ["unit", "building"], required: true, doc: ["a unit or a building (required unless `extends` says)", "单位或建筑（除非 `extends` 已说明，否则必填）"] },
  { name: "domain", type: "enum", values: UNIT_DOMAINS, only: "unit", def: "ground", doc: ["where it moves; a submarine is a `ship` with `underwater`", "移动域；潜艇是带 `underwater` 的 `ship`"] },
  { name: "tier", type: "int", min: 1, max: 3, def: "1", doc: ["the factory level it appears at, and the badge", "出现的工厂等级与徽标"] },
  { name: "cost", type: "number", required: true, min: 0, max: 99999, doc: ["metal", "金属造价"] },
  { name: "buildTime", type: "number", min: 0, max: 3600, def: "cost ÷ 14", doc: ["seconds at full power", "满电力下的建造秒数"] },
  { name: "pop", type: "int", min: 0, max: 50, def: "1 for a unit, 0 for a building", doc: ["population it counts for", "占用人口"] },
  { name: "hp", type: "number", required: true, min: 1, max: 1e6, doc: ["hit points", "生命值"] },
  { name: "armor", type: "enum", values: ARMOR_CLASSES, def: "by domain", doc: ["the armour class weapons are multiplied against", "武器倍率所针对的装甲类型"] },
  { name: "speed", type: "number", only: "unit", min: 0, max: 1e3, def: "60", doc: ["world px/s (a tile is 32)", "世界像素/秒（一格 32）"] },
  { name: "turnRate", type: "number", only: "unit", min: 0, max: 50, def: "3.5", doc: ["rad/s", "弧度/秒"] },
  { name: "vision", type: "number", min: 0, max: 64, def: "8", doc: ["sight, in tiles", "视野（格）"] },
  { name: "radius", type: "number", min: 1, max: 200, def: "9, or the footprint", doc: ["collision radius, world px", "碰撞半径（世界像素）"] },
  { name: "weapons", type: "weapons", def: "[]", doc: ["the weapons (see below); an empty list is unarmed", "武器列表（见下）；空列表即无武装"] },
  { name: "fw", type: "int", only: "building", min: 1, max: 8, def: "2", doc: ["footprint width, tiles", "占地宽度（格）"] },
  { name: "fh", type: "int", only: "building", min: 1, max: 8, def: "2", doc: ["footprint height, tiles", "占地高度（格）"] },
  { name: "producedBy", type: "ids", only: "unit", def: "the line for its domain, from its tier up", doc: ["the buildings whose production list it joins (vanilla or this mod's)", "加入哪些建筑的生产列表（原版或本模组的）"] },
  { name: "produces", type: "ids", only: "building", doc: ["a factory: the units it builds", "工厂：可生产的单位"] },
  { name: "builtBy", type: "ids", only: "building", def: '["engineer"]', doc: ["the builder units that may place it", "可建造它的工程单位"] },
  { name: "builds", type: "ids", only: "unit", doc: ["a builder unit: the buildings it can construct", "工程单位：可建造的建筑"] },
  { name: "buildRate", type: "number", only: "unit", min: 0, max: 1e4, doc: ["a builder unit: hp of work per second", "工程单位：每秒建造量"] },
  { name: "power", type: "number", min: -1e4, max: 1e4, def: "0", doc: ["positive produces, negative draws", "正为发电，负为耗电"] },
  { name: "metalRate", type: "number", only: "building", min: 0, max: 1e3, doc: ["metal per second (an extractor)", "每秒金属（采矿场）"] },
  { name: "needsDeposit", type: "bool", only: "building", doc: ["must stand on a deposit", "必须建在矿点上"] },
  { name: "repairRange", type: "number", only: "building", min: 0, max: 64, doc: ["a repair aura, tiles", "维修光环范围（格）"] },
  { name: "repairRate", type: "number", only: "building", min: 0, max: 1e4, doc: ["hp per second per target", "每目标每秒维修量"] },
  { name: "repairTargets", type: "int", only: "building", min: 1, max: 50, doc: ["targets served at once", "同时维修的目标数"] },
  { name: "upgradeOf", type: "id", only: "building", doc: ["the building this is the next level of; that one gains the upgrade button", "作为哪座建筑的下一等级；那座建筑获得升级按钮"] },
  { name: "upgradeCost", type: "number", only: "building", min: 0, max: 99999, def: "cost − the source's cost", doc: ["with `upgradeOf`: the upgrade's price", "配合 `upgradeOf`：升级价格"] },
  { name: "upgradeTime", type: "number", only: "building", min: 0, max: 3600, def: "buildTime", doc: ["with `upgradeOf`: seconds", "配合 `upgradeOf`：升级秒数"] },
  { name: "requires", type: "ids", doc: ["building ids that must stand before it can be built", "建造前必须存在的建筑 id"] },
  { name: "nukeCapacity", type: "int", min: 0, max: 10, doc: ["a launcher: warheads it holds", "发射器：可储存的弹头数"] },
  { name: "nukeCost", type: "number", min: 0, max: 99999, doc: ["a launcher: metal per warhead", "发射器：每枚弹头的金属"] },
  { name: "nukeTime", type: "number", min: 0, max: 3600, doc: ["a launcher: seconds per warhead", "发射器：每枚弹头的秒数"] },
  { name: "interceptRange", type: "number", min: 0, max: 64, doc: ["point defence: reach in tiles", "拦截：范围（格）"] },
  { name: "interceptMag", type: "int", min: 1, max: 200, doc: ["point defence: rounds ready", "拦截：备弹数"] },
  { name: "interceptReload", type: "number", min: 0.05, max: 600, doc: ["point defence: seconds per round replaced", "拦截：每发补充秒数"] },
  { name: "interceptMuzzleOffset", type: "number", min: 0, max: 200, doc: ["point defence: launcher length, world px", "拦截：发射器长度（世界像素）"] },
  { name: "transportCap", type: "int", only: "unit", min: 1, max: 50, doc: ["a transport: hold, in cargo weight", "运输载具：载重"] },
  { name: "landsForCargo", type: "bool", only: "unit", doc: ["a cargo plane that touches down to load", "装卸时降落的运输机"] },
  { name: "cargoWeight", type: "number", only: "unit", min: 0, max: 50, def: "pop", doc: ["how much of a hold it takes", "占用的载重"] },
  { name: "underwater", type: "bool", only: "unit", doc: ["a submarine: seen only by sonar", "潜艇：仅声呐可见"] },
  { name: "sonar", type: "number", only: "unit", min: 0, max: 64, doc: ["sonar range, tiles", "声呐范围（格）"] },
  { name: "stealth", type: "number", only: "unit", min: 0, max: 64, doc: ["seen only within this many tiles of an enemy", "仅在敌方此距离内可见"] },
  { name: "detect", type: "number", only: "building", min: 0, max: 64, doc: ["reveals stealth within this many tiles", "在此范围内揭示隐形"] },
  { name: "hovers", type: "bool", only: "unit", doc: ["an aircraft that hovers instead of orbiting", "悬停而非盘旋的飞行器"] },
  { name: "altitude", type: "number", only: "unit", min: 0, max: 64, def: "12", doc: ["an aircraft's drawn height, px", "飞行器的绘制高度（像素）"] },
  { name: "fireOnMove", type: "bool", only: "unit", doc: ["keeps shooting on a plain move", "移动时持续开火"] },
  { name: "trail", type: "enum", values: TRAILS, only: "unit", def: "by domain", doc: ["the mark it leaves", "留下的痕迹"] },
  { name: "sprite", type: "string", max: 48, def: "this mod's u.<id> sheet, else the base's art", doc: ["the body's atlas key: one of this mod's sheets, or a vanilla key to borrow its art", "主体图像键：本模组的精灵图，或借用原版的键"] },
  { name: "turretSprite", type: "string", max: 48, def: "this mod's tur.<id> sheet, else the base's (when its art is kept)", doc: ["the rotating part's key, if any", "旋转部件的图像键（若有）"] },
  { name: "aliases", type: "strings", doc: ["other names the console's `give` accepts", "控制台 `give` 接受的别名"] },
  { name: "aiWeight", type: "number", only: "unit", min: 0, max: 10, def: "0", doc: ["how readily the AI builds it — a Bison is 3, a scout car 1; 0 never", "AI 生产它的倾向——野牛是 3，侦察车 1；0 为从不"] }
];
const WEAPON_SPECS = [
  { name: "id", type: "string", max: 32, def: "w1, w2…", doc: ["a name for the weapon", "武器名"] },
  { name: "cls", type: "enum", values: WEAPON_CLASSES, required: true, doc: ["what it was built to kill — picks its row of the armour matrix", "设计用途——决定装甲倍率表中的行"] },
  { name: "dmg", type: "number", required: true, min: 0, max: 1e5, doc: ["damage per hit", "每次命中伤害"] },
  { name: "reload", type: "number", required: true, min: 0.05, max: 600, doc: ["seconds between shots or bursts", "两次射击/齐射间隔秒数"] },
  { name: "range", type: "number", required: true, min: 0.5, max: 64, doc: ["tiles", "射程（格）"] },
  { name: "minRange", type: "number", min: 0, max: 64, doc: ["tiles it cannot fire inside", "最小射程（格）"] },
  { name: "projectile", type: "enum", values: PROJECTILES, def: "by class", doc: ["the round drawn", "弹药样式"] },
  { name: "speed", type: "number", min: 1, max: 5e3, def: "by projectile", doc: ["round speed, world px/s", "弹速（世界像素/秒）"] },
  { name: "targets", type: "targets", def: "by class", doc: ["what it may fire at: ground, ship, sub, air", "可攻击目标：ground、ship、sub、air"] },
  { name: "mult", type: "mult", doc: ["overrides of the class row, by armour class", "按装甲类型覆盖倍率"] },
  { name: "splash", type: "number", min: 0, max: 500, doc: ["blast radius, world px", "溅射半径（世界像素）"] },
  { name: "burst", type: "int", min: 1, max: 32, doc: ["shots per burst", "每次齐射发数"] },
  { name: "burstDelay", type: "number", min: 0, max: 5, doc: ["seconds between the shots of a burst", "齐射内各发间隔秒数"] },
  { name: "homing", type: "bool", doc: ["the round tracks its target", "弹药追踪目标"] },
  { name: "interceptable", type: "bool", doc: ["point defence may shoot it down", "可被拦截"] },
  { name: "arc", type: "bool", doc: ["a ballistic arc (artillery)", "抛物线弹道（火炮）"] },
  { name: "turret", type: "bool", def: "true when the def has a turretSprite", doc: ["fired from the rotating part", "由旋转部件发射"] },
  { name: "muzzleOffset", type: "number", min: 0, max: 200, doc: ["pivot to muzzle, world px", "枢轴到炮口距离（世界像素）"] },
  { name: "spread", type: "number", min: 0, max: 200, doc: ["inaccuracy at full range, world px", "最大射程处的散布（世界像素）"] },
  { name: "friendlyFire", type: "bool", doc: ["the blast hurts your own side too", "溅射也会伤及己方"] },
  { name: "sound", type: "enum", values: WEAPON_SOUNDS, def: "by class", doc: ["the firing sound", "开火音效"] }
];
const SPRITE_SPECS = [
  { name: "key", type: "string", max: 48, required: true, doc: ["`u.<id>` for a body, `tur.<id>` for a rotating part; never a vanilla key", "主体用 `u.<id>`，旋转部件用 `tur.<id>`；不可与原版键重名"] },
  { name: "file", type: "string", max: 120, required: true, doc: ["the image, relative to mod.json (PNG, WebP or JPEG)", "图片路径，相对 mod.json（PNG、WebP 或 JPEG）"] },
  { name: "frames", type: "int", min: 1, max: 64, def: "1", doc: ["animation frames, left to right in one strip", "动画帧数，横向排列"] },
  { name: "fw", type: "number", min: 4, max: 512, def: "the footprint (a building) or the image", doc: ["in-game frame width, world px", "游戏内帧宽（世界像素）"] },
  { name: "fh", type: "number", min: 4, max: 512, doc: ["in-game frame height, world px", "游戏内帧高（世界像素）"] },
  { name: "rotated", type: "bool", doc: ["one up-facing image; the game bakes the 24 headings (hulls, turrets)", "一张朝上的图；游戏烘焙 24 个朝向（车体、炮塔）"] },
  { name: "pivotX", type: "number", min: 0, max: 1, def: "0.5", doc: ["rotation pivot, as a fraction of the frame", "旋转枢轴（帧宽比例）"] },
  { name: "pivotY", type: "number", min: 0, max: 1, def: "0.5", doc: ["rotation pivot, as a fraction of the frame", "旋转枢轴（帧高比例）"] },
  { name: "anchorY", type: "number", min: 0, max: 512, doc: ["px from the top to the footprint centre (tall buildings)", "顶部到占地中心的像素（高建筑）"] },
  { name: "mount", type: "pair", doc: ["a body: where its turret sits, `[fx, fy]`", "主体：炮塔安装位置 `[fx, fy]`"] },
  { name: "fps", type: "number", min: 0, max: 60, doc: ["animation speed", "动画速度"] },
  { name: "teams", type: "bool", def: "true", doc: ["recolour magenta per faction", "按阵营重着色品红部分"] },
  { name: "ss", type: "int", min: 1, max: 4, doc: ["supersample factor; omit to let the game choose", "超采样倍率；留空由游戏决定"] },
  { name: "fitFootprint", type: "bool", doc: ["scale the drawn content to fill the frame", "缩放内容以填满帧"] },
  { name: "animRegion", type: "quad", doc: ["where the animation lives, `[x0, y0, x1, y1]` fractions; the rest is frozen", "动画所在区域 `[x0, y0, x1, y1]`（比例）；其余部分冻结"] },
  { name: "stabilize", type: "bool", def: "true", doc: ["re-align drifting frames", "对齐漂移的帧"] },
  { name: "freezeStatic", type: "bool", doc: ["median-freeze pixels that barely change", "冻结几乎不变的像素"] },
  { name: "stripBg", type: "bool", doc: ["force background removal on or off", "强制开启/关闭背景去除"] },
  { name: "bgMinLuma", type: "number", min: 0, max: 255, doc: ["lightest colour still taken as background", "仍视为背景的最亮颜色"] },
  { name: "artifactCleanup", type: "bool", doc: ["sweep specks left by background removal", "清理背景去除后的杂点"] }
];
const FIELD_SPECS = { manifest: MANIFEST_SPECS, def: DEF_SPECS, weapon: WEAPON_SPECS, sprite: SPRITE_SPECS };
function cloneTable(table) {
  return structuredClone(table);
}
const VANILLA = cloneTable(DEFS);
const VANILLA_IDS = new Set(Object.keys(VANILLA));
function aliasesOf(table) {
  const out = /* @__PURE__ */ new Set();
  for (const d of Object.values(table)) for (const a of d.aliases ?? []) out.add(a);
  return out;
}
function spriteKeysOf(table) {
  const out = /* @__PURE__ */ new Set();
  for (const d of Object.values(table)) {
    out.add(d.sprite);
    if (d.turretSprite) out.add(d.turretSprite);
  }
  return out;
}
const VANILLA_SPRITE_KEYS = spriteKeysOf(VANILLA);
const LINES = {
  ground: ["factory", "factory2", "factory3"],
  ship: ["navyard", "navyard2", "navyard3"],
  air: ["airbase", "airbase2", "airbase3"]
};
function defaultProducers(domain, tier) {
  const line = LINES[domain] ?? LINES.ground;
  return line.slice(Math.max(0, Math.min(2, tier - 1)));
}
const SOUND_BY_CLASS = {
  mg: "mg",
  autocannon: "autocannon",
  cannon: "cannon",
  at: "missile",
  he: "arty",
  rocket: "rocket",
  navgun: "cannon",
  ashm: "missile",
  torpedo: "torpedo",
  aa: "flak"
};
const PROJECTILE_BY_CLASS = {
  mg: "bullet",
  autocannon: "bullet",
  cannon: "shell",
  at: "missile",
  he: "shell",
  rocket: "rocket",
  navgun: "shell",
  ashm: "missile",
  torpedo: "torpedo",
  aa: "flak"
};
const SPEED_BY_PROJECTILE = {
  bullet: 500,
  shell: 420,
  missile: 320,
  rocket: 300,
  bomb: 120,
  torpedo: 150,
  flak: 460,
  nuke: 96
};
const TARGETS_BY_CLASS = {
  aa: ["air"],
  torpedo: ["ship", "sub"],
  ashm: ["ship"]
};
function modText(v, fallback = "") {
  if (typeof v === "string") return [v, v];
  if (Array.isArray(v)) {
    const en = typeof v[0] === "string" ? v[0] : fallback;
    const zh = typeof v[1] === "string" ? v[1] : en;
    return [en, zh];
  }
  if (v && typeof v === "object") {
    const en = typeof v.en === "string" ? v.en : fallback;
    const zh = typeof v.zh === "string" ? v.zh : en;
    return [en, zh];
  }
  return [fallback, fallback];
}
function modName(mod, lang = "en") {
  return modText(mod.name, mod.id)[lang === "zh" ? 1 : 0] || mod.id;
}
function compareVersions(a, b) {
  const pa = String(a).split(/[.+-]/).map((n) => Number.parseInt(n, 10) || 0);
  const pb = String(b).split(/[.+-]/).map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}
function isPlainObject(v) {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function isText(v) {
  if (typeof v === "string") return v.length <= 400;
  if (Array.isArray(v)) return v.length >= 1 && v.length <= 2 && v.every((x) => typeof x === "string" && x.length <= 400);
  if (isPlainObject(v)) return typeof v.en === "string" && (v.zh === void 0 || typeof v.zh === "string");
  return false;
}
function checkField(spec, value, path, issues) {
  const bad = (message) => {
    issues.push({ path, message });
    return false;
  };
  const min = spec.min ?? -Infinity, max = spec.max ?? Infinity;
  switch (spec.type) {
    case "string":
      if (typeof value !== "string") return bad("must be a string");
      if (value.length === 0) return bad("must not be empty");
      if (value.length > (spec.max ?? 200)) return bad(`must be at most ${spec.max ?? 200} characters`);
      return true;
    case "text":
      return isText(value) || bad("must be a string, [en, zh] or { en, zh }");
    case "number":
      if (typeof value !== "number" || !Number.isFinite(value)) return bad("must be a number");
      if (value < min || value > max) return bad(`must be between ${min} and ${max}`);
      return true;
    case "int":
      if (!Number.isInteger(value)) return bad("must be a whole number");
      if (value < min || value > max) return bad(`must be between ${min} and ${max}`);
      return true;
    case "bool":
      return typeof value === "boolean" || bad("must be true or false");
    case "enum":
      return typeof value === "string" && spec.values.includes(value) || bad(`must be one of ${spec.values.join(", ")}`);
    case "id":
      return typeof value === "string" && ID_RE.test(value) || bad("must be an id: lower case letters, digits, - or _, 2–40 characters");
    case "ids":
      if (!Array.isArray(value) || value.length > 64) return bad("must be a list of ids");
      for (const x of value) if (typeof x !== "string" || !ID_RE.test(x)) return bad(`"${String(x)}" is not an id`);
      return true;
    case "strings":
      if (!Array.isArray(value) || value.length > 32) return bad("must be a list of strings");
      for (const x of value) if (typeof x !== "string" || x.length === 0 || x.length > 40) return bad("every entry must be a short string");
      return true;
    case "targets":
      if (!Array.isArray(value) || value.length === 0 || value.length > 4) return bad("must list one to four of ground, ship, sub, air");
      for (const x of value) if (!TARGET_DOMAINS.includes(x)) return bad(`"${String(x)}" is not a target domain`);
      return true;
    case "mult":
      if (!isPlainObject(value)) return bad("must be an object keyed by armour class");
      for (const [k, v] of Object.entries(value)) {
        if (!ARMOR_CLASSES.includes(k)) return bad(`"${k}" is not an armour class`);
        if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 10) return bad(`${k} must be a number between 0 and 10`);
      }
      return true;
    case "pair":
      return Array.isArray(value) && value.length === 2 && value.every((n) => typeof n === "number" && n >= 0 && n <= 1) || bad("must be [x, y] fractions between 0 and 1");
    case "quad":
      return Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === "number" && n >= 0 && n <= 1) || bad("must be [x0, y0, x1, y1] fractions between 0 and 1");
    case "weapons":
    case "defs":
    case "sprites":
      return Array.isArray(value) || bad("must be a list");
    case "files":
      return isPlainObject(value) || bad("must be an object of path → data URL");
  }
}
function checkObject(raw, specs, path, issues, warnings, opts = {}) {
  const out = {};
  const known = new Set(specs.map((s) => s.name));
  for (const key of Object.keys(raw)) {
    if (!known.has(key)) warnings.push({ path: `${path}.${key}`, message: "unknown field, ignored" });
  }
  for (const spec of specs) {
    const value = raw[spec.name];
    if (value === void 0 || value === null) {
      const needed = spec.required === true || spec.required && spec.required === opts.kind;
      if (needed && !opts.skipRequired?.has(spec.name)) issues.push({ path: `${path}.${spec.name}`, message: "is required" });
      continue;
    }
    if (spec.only && opts.kind && spec.only !== opts.kind) {
      warnings.push({ path: `${path}.${spec.name}`, message: `only applies to a ${spec.only}, ignored` });
      continue;
    }
    if (checkField(spec, value, `${path}.${spec.name}`, issues)) out[spec.name] = value;
  }
  return out;
}
function parseMod(input) {
  let raw = input;
  if (typeof input === "string") {
    if (input.length > MAX_MANIFEST_BYTES) return { ok: false, errors: [{ path: "", message: "the manifest is too large" }], warnings: [] };
    try {
      raw = JSON.parse(input);
    } catch {
      return { ok: false, errors: [{ path: "", message: "not valid JSON" }], warnings: [] };
    }
  }
  if (!isPlainObject(raw)) return { ok: false, errors: [{ path: "", message: "not a mod manifest" }], warnings: [] };
  if (raw.format !== MOD_FORMAT) return { ok: false, errors: [{ path: "format", message: `must be "${MOD_FORMAT}"` }], warnings: [] };
  if (raw.v !== MOD_FORMAT_VERSION) return { ok: false, errors: [{ path: "v", message: `unsupported format version ${String(raw.v)} (this game reads ${MOD_FORMAT_VERSION})` }], warnings: [] };
  const errors = [];
  const warnings = [];
  const head = checkObject(raw, MANIFEST_SPECS, "mod", errors, warnings);
  if (errors.length > 0) return { ok: false, errors, warnings };
  const defs = head.defs;
  if (defs.length === 0) errors.push({ path: "mod.defs", message: "a mod needs at least one def" });
  if (defs.length > MAX_MOD_DEFS) errors.push({ path: "mod.defs", message: `at most ${MAX_MOD_DEFS} defs` });
  const sprites = head.sprites ?? [];
  if (sprites.length > MAX_MOD_SPRITES) errors.push({ path: "mod.sprites", message: `at most ${MAX_MOD_SPRITES} sheets` });
  if (errors.length > 0) return { ok: false, errors, warnings };
  const files = head.files;
  if (files) {
    for (const [k, v] of Object.entries(files)) {
      if (typeof v !== "string" || !v.startsWith("data:")) errors.push({ path: `mod.files.${k}`, message: "must be a data URL" });
    }
  }
  const mod = {
    ...head,
    defs,
    sprites,
    ...files ? { files } : {}
  };
  const resolved = resolveMod(mod, VANILLA);
  errors.push(...resolved.errors);
  warnings.push(...resolved.warnings);
  return errors.length > 0 ? { ok: false, errors, warnings } : { ok: true, mod, warnings };
}
function resolveMod(mod, table = VANILLA) {
  const errors = [];
  const warnings = [];
  const defs = [];
  const patches = [];
  const strings = {};
  const placeholders = [];
  const built = /* @__PURE__ */ new Map();
  const aliases = aliasesOf(table);
  const tableSprites = spriteKeysOf(table);
  const sheetKeys = /* @__PURE__ */ new Set();
  const cleanSprites = [];
  (mod.sprites ?? []).forEach((raw, i) => {
    const path = `sprites[${i}]`;
    if (!isPlainObject(raw)) {
      errors.push({ path, message: "must be an object" });
      return;
    }
    const clean = checkObject(raw, SPRITE_SPECS, path, errors, warnings);
    if (typeof clean.key !== "string" || typeof clean.file !== "string") return;
    if (!ATLAS_KEY_RE.test(clean.key)) {
      errors.push({ path: `${path}.key`, message: "must be u.<id> or tur.<id>" });
      return;
    }
    if (VANILLA_SPRITE_KEYS.has(clean.key) || tableSprites.has(clean.key) && !sheetKeys.has(clean.key) && !mod.defs.some((d) => d && (d.sprite === clean.key || d.turretSprite === clean.key || `u.${d.id}` === clean.key || `tur.${d.id}` === clean.key))) {
      errors.push({ path: `${path}.key`, message: `"${clean.key}" is art the game already has — a mod adds art, it does not replace it` });
      return;
    }
    if (!FILE_RE.test(clean.file)) {
      errors.push({ path: `${path}.file`, message: "must be a relative path inside the mod" });
      return;
    }
    if (sheetKeys.has(clean.key)) {
      errors.push({ path: `${path}.key`, message: `"${clean.key}" is listed twice` });
      return;
    }
    if (mod.files && !(clean.file in mod.files)) errors.push({ path: `${path}.file`, message: `"${clean.file}" is not among the embedded files` });
    sheetKeys.add(clean.key);
    cleanSprites.push({ ...clean, frames: clean.frames ?? 1 });
  });
  mod.sprites = cleanSprites;
  mod.defs.forEach((raw, i) => {
    const path = `defs[${i}]`;
    if (!isPlainObject(raw)) {
      errors.push({ path, message: "must be an object" });
      return;
    }
    const id = raw.id;
    if (typeof id !== "string" || !ID_RE.test(id)) {
      errors.push({ path: `${path}.id`, message: "must be an id: lower case letters, digits, - or _, 2–40 characters" });
      return;
    }
    if (table[id]) {
      errors.push({ path: `${path}.id`, message: `"${id}" is already a def${VANILLA_IDS.has(id) ? " of the game" : ` (mod ${table[id].mod ?? "?"})`}` });
      return;
    }
    if (built.has(id)) {
      errors.push({ path: `${path}.id`, message: `"${id}" is defined twice` });
      return;
    }
    if (aliases.has(id)) {
      errors.push({ path: `${path}.id`, message: `"${id}" is an alias of a def of the game` });
      return;
    }
    let base;
    if (raw.extends !== void 0) {
      if (typeof raw.extends !== "string" || !(table[raw.extends] ?? built.get(raw.extends))) {
        errors.push({ path: `${path}.extends`, message: `"${String(raw.extends)}" is not a def it can extend` });
        return;
      }
      base = table[raw.extends] ?? built.get(raw.extends);
      if (base.warhead || base.isHQ) {
        errors.push({ path: `${path}.extends`, message: `"${raw.extends}" cannot be extended` });
        return;
      }
    }
    const kind = raw.kind ?? base?.kind;
    if (kind !== "unit" && kind !== "building") {
      errors.push({ path: `${path}.kind`, message: 'must be "unit" or "building"' });
      return;
    }
    const clean = checkObject(raw, DEF_SPECS, path, errors, warnings, {
      kind,
      // the base supplies what a fresh def would have to state
      skipRequired: base ? /* @__PURE__ */ new Set(["kind", "cost", "hp"]) : void 0
    });
    const own = clean;
    if (own.name === void 0) return;
    if (own.kind === void 0) own.kind = kind;
    const def = buildDef(own, kind, base, mod.id, path, errors, warnings);
    if (!def) return;
    const ownSheet = sheetKeys.has(`u.${id}`);
    const bodyKey = own.sprite ?? (ownSheet ? `u.${id}` : base?.sprite ?? `u.${id}`);
    if (!sheetKeys.has(bodyKey) && !tableSprites.has(bodyKey)) {
      if (own.sprite) errors.push({ path: `${path}.sprite`, message: `"${bodyKey}" is neither a sheet of this mod nor art the game has` });
      else {
        warnings.push({ path: `${path}.sprite`, message: `no sheet u.${id}: a placeholder is drawn until one is added` });
        placeholders.push(bodyKey);
      }
    }
    def.sprite = bodyKey;
    const ownTurret = sheetKeys.has(`tur.${id}`);
    const turretKey = own.turretSprite ?? (ownTurret ? `tur.${id}` : own.sprite !== void 0 || ownSheet ? void 0 : base?.turretSprite);
    if (turretKey !== void 0) {
      if (!sheetKeys.has(turretKey) && !tableSprites.has(turretKey)) {
        errors.push({ path: `${path}.turretSprite`, message: `"${turretKey}" is neither a sheet of this mod nor art the game has` });
      } else def.turretSprite = turretKey;
    } else delete def.turretSprite;
    for (const wp of def.weapons) if (wp.turret === void 0) wp.turret = !!def.turretSprite;
    for (const a of def.aliases ?? []) {
      if (aliases.has(a) || table[a] || built.has(a)) errors.push({ path: `${path}.aliases`, message: `"${a}" is already a name of another def` });
      aliases.add(a);
    }
    built.set(id, def);
    defs.push(def);
    strings[`unit.${id}.name`] = modText(own.name, id);
    strings[`unit.${id}.desc`] = modText(own.desc, "");
  });
  const find = (id) => table[id] ?? built.get(id);
  mod.defs.forEach((raw, i) => {
    if (!isPlainObject(raw) || typeof raw.id !== "string") return;
    const def = built.get(raw.id);
    if (!def) return;
    const own = raw;
    const base = own.extends ? find(own.extends) : void 0;
    const path = `defs[${i}]`;
    const ids = (list, field, want) => {
      if (!Array.isArray(list)) return [];
      const out = [];
      for (const ref of list) {
        const other = find(ref);
        if (!other) errors.push({ path: `${path}.${field}`, message: `"${ref}" is not a def` });
        else if (other.kind !== want) errors.push({ path: `${path}.${field}`, message: `"${ref}" is not a ${want}` });
        else if (want === "unit" && other.warhead) errors.push({ path: `${path}.${field}`, message: `"${ref}" cannot be produced` });
        else out.push(ref);
      }
      return out;
    };
    def.requires = ids(def.requires, "requires", "building");
    if (def.requires.length === 0) delete def.requires;
    if (def.kind === "building") {
      if (def.produces) def.produces = ids(def.produces, "produces", "unit");
      if (own.upgradeOf !== void 0) {
        const src = find(own.upgradeOf);
        if (!src || src.kind !== "building") errors.push({ path: `${path}.upgradeOf`, message: `"${own.upgradeOf}" is not a building` });
        else if (src.upgradesTo || patches.some((p) => p.kind === "upgrade" && p.target === src.id)) {
          errors.push({ path: `${path}.upgradeOf`, message: `"${own.upgradeOf}" already upgrades to ${src.upgradesTo ?? "another def of this mod"}` });
        } else if (own.upgradeOf === def.id) errors.push({ path: `${path}.upgradeOf`, message: "a building cannot upgrade to itself" });
        else {
          def.upgradeOnly = true;
          patches.push({
            kind: "upgrade",
            target: src.id,
            id: def.id,
            cost: own.upgradeCost ?? Math.max(0, def.cost - src.cost),
            time: own.upgradeTime ?? def.buildTime
          });
        }
      } else {
        const builders = own.builtBy !== void 0 ? ids(own.builtBy, "builtBy", "unit") : base ? Object.values({ ...table, ...Object.fromEntries(built) }).filter((d) => d.builds?.includes(base.id)).map((d) => d.id) : ["engineer"];
        for (const b of builders) {
          const unit = find(b);
          if (!unit.builds) {
            errors.push({ path: `${path}.builtBy`, message: `"${b}" is not a builder unit` });
            continue;
          }
          patches.push({ kind: "builds", target: b, id: def.id });
        }
        if (builders.length === 0) warnings.push({ path: `${path}.builtBy`, message: "nothing can build it" });
      }
    } else {
      if (def.builds) def.builds = ids(def.builds, "builds", "building");
      const producers = own.producedBy !== void 0 ? ids(own.producedBy, "producedBy", "building") : base ? Object.values({ ...table, ...Object.fromEntries(built) }).filter((d) => d.produces?.includes(base.id)).map((d) => d.id) : defaultProducers(def.domain, def.tier).filter((b) => !!find(b));
      for (const b of producers) {
        const line = find(b);
        if (!line.produces && line.id !== def.id) {
          warnings.push({ path: `${path}.producedBy`, message: `"${b}" was not a factory; it becomes one` });
        }
        patches.push({ kind: "produces", target: b, id: def.id });
      }
      if (producers.length === 0 && !mod.defs.some((d) => isPlainObject(d) && Array.isArray(d.produces) && d.produces.includes(def.id))) {
        warnings.push({ path: `${path}.producedBy`, message: "nothing produces it" });
      }
    }
  });
  return { ok: errors.length === 0, mod, defs, patches, strings, placeholders, errors, warnings };
}
function buildDef(own, kind, base, modId, path, errors, warnings) {
  const inherited = base ? structuredClone(base) : {};
  delete inherited.id;
  delete inherited.aliases;
  delete inherited.mod;
  delete inherited.upgradesTo;
  delete inherited.upgradeCost;
  delete inherited.upgradeTime;
  delete inherited.upgradeOnly;
  delete inherited.isHQ;
  delete inherited.warhead;
  delete inherited.aiWeight;
  if (base && base.kind !== kind) {
    errors.push({ path: `${path}.kind`, message: `a ${kind} cannot extend a ${base.kind}` });
    return null;
  }
  const domain = kind === "building" ? "none" : own.domain ?? inherited.domain ?? "ground";
  const fw = kind === "building" ? own.fw ?? inherited.fw ?? 2 : void 0;
  const fh = kind === "building" ? own.fh ?? inherited.fh ?? fw : void 0;
  const cost = own.cost ?? inherited.cost;
  const hp = own.hp ?? inherited.hp;
  if (cost === void 0 || hp === void 0) return null;
  const armor = own.armor ?? inherited.armor ?? (kind === "building" ? "structure" : domain === "air" ? "air" : domain === "ship" ? own.underwater ?? inherited.underwater ? "sub" : "ship" : "medium");
  const def = {
    ...inherited,
    ...stripModOnly(own),
    id: own.id,
    kind,
    domain,
    tier: own.tier ?? inherited.tier ?? 1,
    cost,
    buildTime: own.buildTime ?? inherited.buildTime ?? Math.max(2, Math.round(cost / 14)),
    pop: own.pop ?? inherited.pop ?? (kind === "unit" ? 1 : 0),
    hp,
    armor,
    speed: kind === "building" ? 0 : own.speed ?? inherited.speed ?? 60,
    turnRate: kind === "building" ? 0 : own.turnRate ?? inherited.turnRate ?? 3.5,
    vision: own.vision ?? inherited.vision ?? 8,
    radius: own.radius ?? inherited.radius ?? (kind === "building" ? Math.max(fw, fh) * 15 : 9),
    weapons: [],
    sprite: "",
    mod: modId
  };
  if (kind === "building") {
    def.fw = fw;
    def.fh = fh;
    if (def.power === void 0) def.power = 0;
  } else if (own.trail === void 0 && inherited.trail === void 0) {
    if (domain === "ground") def.trail = "tread";
    else if (domain === "ship" && !def.underwater) def.trail = "wake";
  }
  if (def.aliases) def.aliases = def.aliases.map((a) => a.toLowerCase());
  const rawWeapons = own.weapons ?? (base ? inherited.weapons : []) ?? [];
  const hasTurret = !!(own.turretSprite ?? (own.sprite ? void 0 : inherited.turretSprite));
  rawWeapons.forEach((raw, i) => {
    const wpath = `${path}.weapons[${i}]`;
    if (!isPlainObject(raw)) {
      errors.push({ path: wpath, message: "must be an object" });
      return;
    }
    const clean = checkObject(raw, WEAPON_SPECS, wpath, errors, warnings);
    if (!clean.cls || clean.dmg === void 0 || clean.reload === void 0 || clean.range === void 0) return;
    const projectile = clean.projectile ?? PROJECTILE_BY_CLASS[clean.cls];
    const wp = {
      ...clean,
      id: clean.id ?? `w${i + 1}`,
      cls: clean.cls,
      dmg: clean.dmg,
      reload: clean.reload,
      range: clean.range,
      projectile,
      speed: clean.speed ?? SPEED_BY_PROJECTILE[projectile] ?? 400,
      targets: clean.targets ?? TARGETS_BY_CLASS[clean.cls] ?? ["ground", "ship"],
      sound: clean.sound ?? SOUND_BY_CLASS[clean.cls]
    };
    if (clean.turret === void 0 && hasTurret) wp.turret = true;
    if (wp.minRange !== void 0 && wp.minRange >= wp.range) {
      errors.push({ path: `${wpath}.minRange`, message: "must be less than range" });
      return;
    }
    def.weapons.push(resolveWeapon(wp));
  });
  if (def.weapons.length > 8) {
    errors.push({ path: `${path}.weapons`, message: "at most 8 weapons" });
    return null;
  }
  return def;
}
function stripModOnly(own) {
  const { name: _n, desc: _d, extends: _e, weapons: _w, producedBy: _p, builtBy: _b, upgradeOf: _u, sprite: _s, turretSprite: _t, ...rest } = own;
  return rest;
}
let active = [];
const injected = /* @__PURE__ */ new Set();
const listeners = /* @__PURE__ */ new Set();
function applyMods(mods) {
  const table = cloneTable(VANILLA);
  const strings = {};
  const report = { active: [], rejected: [], warnings: [], placeholders: [] };
  for (const mod of mods) {
    const r = resolveMod(mod, table);
    if (!r.ok) {
      report.rejected.push({ id: mod.id, errors: r.errors });
      continue;
    }
    if (r.warnings.length > 0) report.warnings.push({ id: mod.id, warnings: r.warnings });
    for (const d of r.defs) table[d.id] = d;
    applyPatches(table, r.patches);
    Object.assign(strings, r.strings);
    report.placeholders.push(...r.placeholders);
    report.active.push(mod);
  }
  for (const k of Object.keys(DEFS)) delete DEFS[k];
  Object.assign(DEFS, table);
  ALL_DEF_IDS.length = 0;
  ALL_DEF_IDS.push(...Object.keys(table));
  for (const k of injected) delete STRINGS[k];
  injected.clear();
  for (const [k, v] of Object.entries(strings)) {
    STRINGS[k] = v;
    injected.add(k);
  }
  active = report.active;
  for (const fn of listeners) fn();
  return report;
}
function applyPatches(table, patches) {
  for (const p of patches) {
    const target = table[p.target];
    if (!target) continue;
    if (p.kind === "produces") {
      target.produces = target.produces ?? [];
      if (!target.produces.includes(p.id)) target.produces.push(p.id);
    } else if (p.kind === "builds") {
      target.builds = target.builds ?? [];
      if (!target.builds.includes(p.id)) target.builds.push(p.id);
    } else {
      target.upgradesTo = p.id;
      target.upgradeCost = p.cost;
      target.upgradeTime = p.time;
    }
  }
}
function activeMods() {
  return active;
}
function activeModStamps() {
  return active.map((m) => ({ id: m.id, version: m.version }));
}
function onModsChanged(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function modOfDef(id) {
  const modId = DEFS[id]?.mod;
  return modId ? active.find((m) => m.id === modId) : void 0;
}
function countDefs(mod) {
  let units = 0, buildings = 0;
  for (const d of mod.defs) {
    if (!isPlainObject(d)) continue;
    const kind = d.kind ?? (typeof d.extends === "string" ? VANILLA[d.extends]?.kind : void 0);
    if (kind === "building") buildings++;
    else units++;
  }
  return { units, buildings };
}
function indexEntryFor(mod, path, base, sizes = {}, updated) {
  const r = resolveMod(mod, VANILLA);
  return {
    id: mod.id,
    name: modText(mod.name, mod.id),
    version: mod.version,
    ...mod.author ? { author: mod.author } : {},
    description: modText(mod.description, ""),
    ...mod.license ? { license: mod.license } : {},
    ...mod.homepage ? { homepage: mod.homepage } : {},
    ...mod.minGame ? { minGame: mod.minGame } : {},
    path,
    base,
    ...updated ? { updated } : {},
    defs: r.defs.map((d) => {
      const own = mod.defs.find((x) => x.id === d.id);
      return {
        id: d.id,
        kind: d.kind,
        domain: d.domain,
        tier: d.tier,
        cost: d.cost,
        name: modText(own?.name, d.id),
        sprite: d.sprite,
        ...d.turretSprite ? { turretSprite: d.turretSprite } : {},
        ...own?.extends ? { extends: own.extends } : {}
      };
    }),
    sprites: (mod.sprites ?? []).map((s) => ({
      key: s.key,
      file: s.file,
      frames: s.frames ?? 1,
      ...s.rotated ? { rotated: true } : {},
      ...sizes[s.file] ? { w: sizes[s.file].w, h: sizes[s.file].h } : {}
    }))
  };
}
function parseModIndex(json) {
  let raw = json;
  if (typeof json === "string") {
    try {
      raw = JSON.parse(json);
    } catch {
      return null;
    }
  }
  if (!isPlainObject(raw) || raw.format !== "steel-tide-mod-index" || !Array.isArray(raw.mods)) return null;
  const mods = [];
  for (const m of raw.mods) {
    if (!isPlainObject(m) || typeof m.id !== "string" || !ID_RE.test(m.id) || typeof m.version !== "string" || typeof m.base !== "string") continue;
    mods.push({
      id: m.id,
      name: modText(m.name, m.id),
      version: m.version,
      ...typeof m.author === "string" ? { author: m.author } : {},
      description: modText(m.description, ""),
      ...typeof m.license === "string" ? { license: m.license } : {},
      ...typeof m.homepage === "string" ? { homepage: m.homepage } : {},
      ...typeof m.minGame === "string" ? { minGame: m.minGame } : {},
      path: typeof m.path === "string" ? m.path : `mods/${m.id}`,
      base: m.base,
      ...typeof m.updated === "string" ? { updated: m.updated } : {},
      defs: Array.isArray(m.defs) ? m.defs.filter((d) => isPlainObject(d) && typeof d.id === "string") : [],
      sprites: Array.isArray(m.sprites) ? m.sprites.filter((s) => isPlainObject(s) && typeof s.key === "string") : []
    });
  }
  return { format: "steel-tide-mod-index", v: 1, generated: typeof raw.generated === "string" ? raw.generated : "", mods };
}
const VANILLA_DEFS = DEFS;
function typeLabel(spec) {
  switch (spec.type) {
    case "enum":
      return spec.values.join(" | ");
    case "text":
      return "text";
    case "number":
    case "int": {
      const range = spec.min !== void 0 || spec.max !== void 0 ? ` ${spec.min ?? ""}–${spec.max ?? ""}` : "";
      return (spec.type === "int" ? "integer" : "number") + range;
    }
    case "id":
      return "id";
    case "ids":
      return "id[]";
    case "strings":
      return "string[]";
    case "targets":
      return "(ground | ship | sub | air)[]";
    case "mult":
      return "{ armour: number }";
    case "pair":
      return "[x, y]";
    case "quad":
      return "[x0, y0, x1, y1]";
    case "bool":
      return "boolean";
    case "weapons":
      return "weapon[]";
    case "defs":
      return "def[]";
    case "sprites":
      return "sheet[]";
    case "files":
      return "{ path: dataURL }";
    default:
      return "string";
  }
}
function fieldRows(table, lang = "en") {
  const i = lang === "zh" ? 1 : 0;
  return FIELD_SPECS[table].map((spec) => ({
    name: spec.name,
    type: typeLabel(spec),
    required: spec.required === true ? lang === "zh" ? "必填" : "yes" : spec.required ? lang === "zh" ? `${spec.required === "unit" ? "单位" : "建筑"}必填` : `${spec.required}s` : spec.only ? lang === "zh" ? `仅${spec.only === "unit" ? "单位" : "建筑"}` : `${spec.only}s only` : "",
    default: spec.def ?? "",
    doc: spec.doc[i]
  }));
}
function markdownTable(rows) {
  const esc = (s) => s.replace(/\|/g, "\\|");
  const lines = ["| field | type | required | default | meaning |", "| --- | --- | --- | --- | --- |"];
  for (const r of rows) lines.push(`| \`${r.name}\` | ${esc(r.type)} | ${esc(r.required)} | ${esc(r.default)} | ${esc(r.doc)} |`);
  return lines.join("\n");
}
function rosterLines() {
  const out = [];
  const by = (kind, domain) => Object.values(DEFS).filter((d) => d.kind === kind && (domain === void 0 || d.domain === domain) && !d.warhead).map((d) => `${d.id} (T${d.tier}, ${d.cost}${d.upgradeOnly ? ", upgrade level" : ""})`);
  out.push(`ground units: ${by("unit", "ground").join(", ")}`);
  out.push(`ships: ${by("unit", "ship").join(", ")}`);
  out.push(`aircraft: ${by("unit", "air").join(", ")}`);
  out.push(`buildings: ${by("building").join(", ")}`);
  return out;
}
function exampleMinimal() {
  return {
    format: MOD_FORMAT,
    v: MOD_FORMAT_VERSION,
    id: "bison-ii",
    name: ["Bison II", "野牛 II"],
    version: "1.0.0",
    author: "you",
    description: ["A heavier Bison for the late game.", "后期用的重型野牛。"],
    defs: [
      {
        id: "bison2",
        extends: "mbt",
        name: ["Bison II", "野牛 II"],
        desc: ["Thicker plate, a bigger gun, and a bigger bill.", "更厚的装甲、更大的炮，也更贵。"],
        tier: 3,
        cost: 520,
        hp: 1100,
        speed: 52,
        requires: ["radar"],
        weapons: [{ id: "cannon", cls: "cannon", dmg: 90, reload: 2, range: 5, splash: 12, turret: true, muzzleOffset: 23 }],
        aiWeight: 2
      }
    ]
  };
}
function exampleFull() {
  return {
    format: MOD_FORMAT,
    v: MOD_FORMAT_VERSION,
    id: "ironworks",
    name: ["Ironworks", "铁工厂"],
    version: "1.0.0",
    author: "you",
    description: ["A hover tank, a bunker and a fusion plant.", "一辆悬浮坦克、一座碉堡和一座聚变电站。"],
    license: "CC-BY-4.0",
    defs: [
      {
        id: "ironworks-hover",
        name: ["Skimmer Hover Tank", "掠行悬浮坦克"],
        desc: ["Fast, thin-skinned, rockets.", "快、皮薄、打火箭。"],
        kind: "unit",
        domain: "ground",
        tier: 2,
        cost: 260,
        hp: 320,
        armor: "light",
        speed: 110,
        turnRate: 5,
        radius: 9,
        trail: "tire",
        weapons: [{ id: "pods", cls: "rocket", dmg: 16, reload: 2.2, range: 4.5, burst: 4, burstDelay: 0.1, splash: 10, spread: 14 }],
        producedBy: ["factory2", "factory3"],
        aiWeight: 1
      },
      {
        id: "ironworks-bunker",
        name: ["Bunker", "碉堡"],
        desc: ["A gun pit that takes a beating.", "扛打的火力点。"],
        kind: "building",
        cost: 380,
        hp: 1600,
        fw: 2,
        fh: 2,
        power: -3,
        vision: 8,
        weapons: [{ id: "gun", cls: "autocannon", dmg: 22, reload: 0.5, range: 5, turret: false, targets: ["ground", "ship"] }]
      },
      {
        id: "ironworks-fusion",
        name: ["Fusion Plant", "聚变电站"],
        desc: ["The plant line's fourth level.", "发电厂线的第四级。"],
        extends: "power3",
        upgradeOf: "power3",
        cost: 2200,
        hp: 2600,
        power: 500,
        upgradeCost: 1100,
        upgradeTime: 60,
        requires: ["radar", "reactor"]
      }
    ],
    sprites: [
      { key: "u.ironworks-hover", file: "sprites/u.ironworks-hover.png", frames: 1, rotated: true, fw: 24, fh: 26 },
      { key: "u.ironworks-bunker", file: "sprites/u.ironworks-bunker.png", frames: 1 }
    ]
  };
}
function agentPrompt() {
  const lines = [];
  const p = (s = "") => {
    lines.push(s);
  };
  p("# Making a Steel Tide mod — brief for a coding agent");
  p();
  p("You are helping make a mod for Steel Tide (https://steelti.de), a browser real-time strategy game.");
  p("A mod adds units, buildings and upgrade levels. It cannot change the game's rules, its interface, or an existing unit or building — it only adds, and everything it adds is switched off with it.");
  p("Read this whole brief once, then work from the tables. When in doubt, prefer the smallest mod that plays.");
  p();
  p("## What a mod is");
  p();
  p("A folder:");
  p();
  p("```");
  p("my-mod/");
  p("  mod.json          the manifest: the mod's identity, its defs, and the sheets they draw with");
  p("  sprites/*.png     optional art (a def without any is drawn as a plain placeholder)");
  p("  README.md         optional");
  p("```");
  p();
  p(`Published mods live in ${MOD_REGISTRY_WEB} under \`mods/<id>/\`; the game lists that registry under Settings → Mods, and the website at https://steelti.de/mods.`);
  p();
  p("## The manifest, minimal");
  p();
  p("One vanilla unit copied and re-tuned. `extends` inherits everything — art, weapons, where it is built — and every field you name overrides it:");
  p();
  p("```json");
  p(JSON.stringify(exampleMinimal(), null, 2));
  p("```");
  p();
  p("## The manifest, deeper");
  p();
  p("Own art, a defended building, and a fourth level for a vanilla building line:");
  p();
  p("```json");
  p(JSON.stringify(exampleFull(), null, 2));
  p("```");
  p();
  p("## Fields");
  p();
  p("Anything not in these tables is ignored with a warning. Numbers outside the stated range are errors.");
  p();
  p("### mod.json (top level)");
  p();
  p(markdownTable(fieldRows("manifest")));
  p();
  p('`name`, `description` and every `desc`/`name` on a def are *text*: a string (used for both languages), `["English", "中文"]`, or `{ "en": "…", "zh": "…" }`.');
  p();
  p("### A def (`defs[]`)");
  p();
  p(markdownTable(fieldRows("def")));
  p();
  p('Defaults when `extends` is absent: a unit is `domain: "ground"`, `tier: 1`, `pop: 1`, `speed: 60`, `turnRate: 3.5`, `vision: 8`, `radius: 9`, armour by domain (ground `medium`, ship `ship`, air `air`), a tread trail on land and a wake at sea; a building is `fw: 2, fh: 2`, `armor: "structure"`, `power: 0`, `pop: 0`. `buildTime` defaults to cost ÷ 14 seconds.');
  p("Where a unit is built when `producedBy` is absent: its domain's line from its tier up — " + ["ground", "ship", "air"].map((d) => `${d}: ${[1, 2, 3].map((t) => `T${t} → ${defaultProducers(d, t).join("+")}`).join(", ")}`).join("; ") + ".");
  p("An `upgradeOf` def becomes upgrade-only (never placed directly): the named building gains an Upgrade button that turns it into this def, at `upgradeCost` over `upgradeTime`. A building may have only one next level, so `upgradeOf` can name a vanilla building at the end of its line (`power3`, `factory3`, `extractor3`, `gatling`, `cannonturret2`, `samsite`, `interceptor2`, `radar`, `repairtower`, `reactor`, `nukesilo`) or one of this mod's.");
  p();
  p("### A weapon (`defs[].weapons[]`)");
  p();
  p(markdownTable(fieldRows("weapon")));
  p();
  p("The damage a weapon does is `dmg × the armour matrix cell for (cls, target armour)`, with `mult` overriding single cells. The matrix:");
  p();
  p("```");
  for (const [cls, row] of Object.entries(ARMOR_MATRIX)) p(`${cls.padEnd(11)} ${Object.entries(row).map(([a, m]) => `${a} ×${m}`).join("  ")}`);
  p("```");
  p();
  p("### A sheet (`sprites[]`)");
  p();
  p(markdownTable(fieldRows("sprite")));
  p();
  p("## Units of measure");
  p();
  p("- A tile is 32 world pixels. `speed` and projectile `speed` are world px/s; `range`, `minRange`, `vision`, `sonar`, `stealth`, `detect`, `repairRange` and `interceptRange` are tiles; `radius`, `splash`, `spread`, `muzzleOffset` are world px.");
  p("- Times are seconds: `buildTime`, `reload`, `burstDelay`, `upgradeTime`, `interceptReload`, `nukeTime`.");
  p("- For scale: the Bison main battle tank is cost 280, hp 620, speed 60, radius 10, a cannon of dmg 60 every 1.8 s at range 4.6; a scout car is cost 60, hp 150, speed 120; a war factory is 3×3 tiles, hp 1500, power −8.");
  p();
  p("## Art");
  p();
  p('- Keys: a def\'s body is `u.<id>`, a rotating turret `tur.<id>`. A def with no sheet of its own may borrow vanilla art by naming a vanilla key in `sprite` (e.g. `"sprite": "u.mbt", "turretSprite": "tur.mbt"`); with `extends` it inherits the base\'s art. A mod may not replace vanilla art.');
  p("- A sheet is one PNG (WebP and JPEG are accepted): `frames` animation frames left to right in one horizontal strip, evenly spaced, no gaps, no borders.");
  p('- Hulls, turrets and everything that turns: draw ONE image facing UP and set `"rotated": true`; the game bakes the 24 headings. `fw`/`fh` are the in-game size of that up-facing image in world px (a tank hull is about 24×24; the image itself may be any resolution, 2–4× is best). `pivotX`/`pivotY` put the pivot on the turret ring (default centre).');
  p("- Buildings: one strip of frames, not rotated, drawn with a slight top-down southern tilt. The footprint is the bottom `fw×32` by `fh×32` px of the frame; anything above overhangs the terrain behind (towers, masts). Width, height and anchor are sized from the def's footprint automatically.");
  p("- Faction colour: paint team-coloured parts in pure magenta — highlight #FF66FF, base #FF00FF, shadow #990099 — and use magenta nowhere else; the game recolours it per player.");
  p("- Style: crisp pixel art, hard edges, no anti-aliasing, a muted military palette (DawnBringer-32), dark #222034 outlines. Generated sheets are cleaned automatically (background removal, frame registration), but a transparent background is best.");
  p();
  p("## The vanilla roster (ids you may `extends`, name in `producedBy`/`builtBy`/`requires`/`upgradeOf`, or borrow art from)");
  p();
  for (const line of rosterLines()) p(`- ${line}`);
  p();
  p("## Test");
  p();
  p("1. Validate: in a clone of the registry, `node tools/check.mjs path/to/my-mod` prints every error with its path into mod.json. (No clone? The game says the same things when the mod is loaded.)");
  p("2. Load it in the game: Settings → Mods → *Open folder…* (Chrome keeps the folder open, so *Reload* re-reads your edits) or *Upload file…* (a zip of the folder, or a `.steel-tide-mod` file). Errors are listed on the spot; a loaded mod says how many units and buildings it added.");
  p("3. Play: start a skirmish. Your units are in the factory's production list from the level you gave them; buildings are in the engineer's build menu; an upgrade level is on its building's Upgrade button. The console (backquote) has `give <id>` for anything. Mods apply to skirmish and campaign; a networked match is always unmodded.");
  p("4. From a static server: `npx serve --cors path/to/my-mod` then open `https://play.steelti.de/?mod=http://localhost:3000/` — the mod is fetched at every boot, so a page reload picks up an edit.");
  p();
  p("## Publish");
  p();
  p(`1. Fork ${MOD_REGISTRY_WEB}, add your folder as \`mods/<id>/\` (the folder name is the mod's \`id\`), run \`node tools/check.mjs mods/<id>\`, open a pull request.`);
  p("2. CI runs the same check on the whole registry — ids must be unique across every published mod, so prefix a generic word with your mod's id (`ironworks-bunker`, not `bunker`).");
  p("3. Once merged, the index is rebuilt and the mod appears in the game's registry list and at https://steelti.de/mods. Bump `version` for every change; the game offers the update.");
  p();
  p("## Rules");
  p();
  p("- A mod adds; it does not change vanilla defs, art, rules or interface. Do not try to override a vanilla id or key — the validator refuses it.");
  p("- Keep it honest: a unit needs a counter. The armour matrix is how the game makes one; give a new weapon a class it belongs to rather than an override on every cell.");
  p("- A mod is published under the licence its manifest names (default CC-BY-4.0). Only ship art you have the right to.");
  return lines.join("\n") + "\n";
}
function agentPromptFor(dir) {
  return `${agentPrompt()}
Work in \`${dir}\`. Write \`mod.json\` there, add any sheets under \`sprites/\`, and finish by running the check above.
`;
}
const REGISTRY = { repo: MOD_REGISTRY_REPO, web: MOD_REGISTRY_WEB };
function modTitle(mod, lang = "en") {
  return `${modText(mod.name, mod.id)[lang === "zh" ? 1 : 0]} ${mod.version}`;
}
export {
  ARMOR_CLASSES,
  ARMOR_MATRIX,
  FIELD_SPECS,
  ID_RE,
  MAX_MANIFEST_BYTES,
  MAX_MOD_DEFS,
  MAX_MOD_FILES_BYTES,
  MAX_MOD_SPRITES,
  MOD_FILE_EXT,
  MOD_FORMAT,
  MOD_FORMAT_VERSION,
  MOD_MANIFEST_NAME,
  MOD_REGISTRY_REPO,
  MOD_REGISTRY_URL,
  MOD_REGISTRY_WEB,
  PROJECTILES,
  REGISTRY,
  TARGET_DOMAINS,
  TRAILS,
  UNIT_DOMAINS,
  VANILLA_DEFS,
  VANILLA_IDS,
  VANILLA_SPRITE_KEYS,
  WEAPON_CLASSES,
  WEAPON_SOUNDS,
  activeModStamps,
  activeMods,
  agentPrompt,
  agentPromptFor,
  applyMods,
  compareVersions,
  countDefs,
  defaultProducers,
  exampleFull,
  exampleMinimal,
  fieldRows,
  indexEntryFor,
  modName,
  modOfDef,
  modRegistryBase,
  modText,
  modTitle,
  onModsChanged,
  parseMod,
  parseModIndex,
  resolveMod,
  rosterLines
};
