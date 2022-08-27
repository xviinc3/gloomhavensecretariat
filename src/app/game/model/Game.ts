import { gameManager } from "../businesslogic/GameManager";
import { settingsManager } from "../businesslogic/SettingsManager";
import { AttackModifier, AttackModifierDeck, AttackModifierType, defaultAttackModifierCards, GameAttackModifierDeckModel } from "./AttackModifier";
import { Character, GameCharacterModel } from "./Character";
import { SectionData } from "./data/SectionData";
import { Element } from "./Element";
import { Figure } from "./Figure";
import { GameMonsterModel, Monster } from "./Monster";
import { GameObjectiveModel, Objective } from "./Objective";
import { Party } from "./Party";
import { Scenario } from "./Scenario";

export class Game {
  edition: string | undefined = undefined;
  figures: Figure[] = [];
  state: GameState = GameState.draw;
  scenario: Scenario | undefined = undefined;
  sections: SectionData[] = [];
  level: number = 1;
  levelCalculation: boolean = true;
  levelAdjustment: number = 0;
  bonusAdjustment: number = 0;
  ge5Player: boolean = true;
  round: number = 0;
  playSeconds: number = 0;
  totalSeconds: number = 0;
  monsterAttackModifierDeck: AttackModifierDeck = new AttackModifierDeck();
  allyAttackModifierDeck: AttackModifierDeck = new AttackModifierDeck();
  newElements: Element[] = [];
  strongElements: Element[] = [];
  elements: Element[] = [];
  solo: boolean = false;
  party: Party | undefined = undefined;


  toModel(): GameModel {
    return new GameModel(this.edition, this.figures.map((figure) => figure.name), this.figures.filter((figure) => figure instanceof Character).map((figure) => ((figure as Character).toModel())), this.figures.filter((figure) => figure instanceof Monster).map((figure) => ((figure as Monster).toModel())), this.figures.filter((figure) => figure instanceof Objective).map((figure) => ((figure as Objective).toModel())), this.state, this.scenario, this.sections, this.level, this.levelCalculation, this.levelAdjustment, this.bonusAdjustment, this.ge5Player, this.round, this.playSeconds, this.totalSeconds, this.monsterAttackModifierDeck.toModel(), this.allyAttackModifierDeck.toModel(), this.newElements, this.strongElements, this.elements, this.solo, this.party);
  }

  fromModel(model: GameModel, server: boolean = false) {
    this.edition = model.edition;
    this.figures = this.figures.filter((figure) =>
      model.characters.map((gcm) => gcm.name).indexOf(figure.name) != -1 ||
      model.monsters.map((gmm) => gmm.name).indexOf(figure.name) != -1 ||
      model.objectives.map((gom) => gom.name).indexOf(figure.name) != -1
    );

    model.characters.forEach((value) => {
      let character = this.figures.find((figure) => figure instanceof Character && figure.name == value.name && figure.edition == value.edition) as Character;
      if (!character) {
        character = new Character(gameManager.getCharacterData(value.name, value.edition), value.level);
        this.figures.push(character);
      }
      character.fromModel(value);
    });

    model.monsters.forEach((value) => {
      let monster = this.figures.find((figure) => figure instanceof Monster && figure.name == value.name && figure.edition == value.edition) as Monster;
      if (!monster) {
        monster = new Monster(gameManager.getMonsterData(value.name, value.edition));
        this.figures.push(monster);
      }
      monster.fromModel(value);
    });

    model.objectives.forEach((value) => {
      let objective = this.figures.find((figure) => figure instanceof Objective && figure.id == value.id) as Objective;
      if (!objective) {
        if (!value.id) {
          value.id = 0;
          while (this.figures.some((figure) => figure instanceof Objective && figure.id == value.id)) {
            value.id++;
          }
        }

        objective = new Objective(value.id);
        this.figures.push(objective);
      }
      objective.fromModel(value);
    });

    this.figures.sort((a, b) => model.figures.indexOf(a.name) - model.figures.indexOf(b.name));

    this.state = model.state;
    this.scenario = model.scenario;
    this.sections = model.sections || [];
    this.level = model.level;

    // migration
    if (settingsManager.settings.levelCalculation != undefined) {
      model.levelCalculation = settingsManager.settings.levelCalculation;
      settingsManager.settings.levelCalculation = undefined;
      settingsManager.storeSettings();
    }
    if (settingsManager.settings.levelAdjustment != undefined) {
      model.levelAdjustment = settingsManager.settings.levelAdjustment;
      settingsManager.settings.levelAdjustment = undefined;
      settingsManager.storeSettings();
    }
    if (settingsManager.settings.bonusAdjustment != undefined) {
      model.bonusAdjustment = settingsManager.settings.bonusAdjustment;
      settingsManager.settings.bonusAdjustment = undefined;
      settingsManager.storeSettings();
    }
    if (settingsManager.settings.ge5Player != undefined) {
      model.ge5Player = settingsManager.settings.ge5Player;
      settingsManager.settings.ge5Player = undefined;
      settingsManager.storeSettings();
    }

    this.levelCalculation = model.levelCalculation;
    this.levelAdjustment = model.levelAdjustment;
    this.bonusAdjustment = model.bonusAdjustment;
    this.ge5Player = model.ge5Player;

    this.round = model.round;
    this.playSeconds = model.playSeconds;
    this.totalSeconds = model.totalSeconds;
    this.monsterAttackModifierDeck = this.monsterAttackModifierDeck || new AttackModifierDeck();
    if (model.monsterAttackModifierDeck && model.monsterAttackModifierDeck.cards && model.monsterAttackModifierDeck.cards.length > 0) {
      this.monsterAttackModifierDeck.fromModel(model.monsterAttackModifierDeck);
    }

    // Migration
    if (model.attackModifier && model.attackModifiers) {
      this.monsterAttackModifierDeck.fromModel(new GameAttackModifierDeckModel(model.attackModifier, model.attackModifiers))
    }

    this.allyAttackModifierDeck = this.allyAttackModifierDeck || new AttackModifierDeck();
    if (model.allyAttackModifierDeck && model.allyAttackModifierDeck.cards && model.allyAttackModifierDeck.cards.length > 0) {
      this.allyAttackModifierDeck.fromModel(model.allyAttackModifierDeck);
    }

    this.newElements = model.newElements;
    this.strongElements = model.strongElements;
    this.elements = model.elements;
    this.solo = model.solo;
    this.party = model.party;
  }
}

export enum GameState {
  draw = "draw",
  next = "next",
}

export class GameModel {

  edition: string | undefined;
  figures: string[];
  characters: GameCharacterModel[];
  monsters: GameMonsterModel[];
  objectives: GameObjectiveModel[];
  state: GameState;
  scenario: Scenario | undefined;
  sections: SectionData[] = [];
  level: number;
  levelCalculation: boolean;
  levelAdjustment: number;
  bonusAdjustment: number;
  ge5Player: boolean;
  round: number;
  playSeconds: number;
  totalSeconds: number;
  monsterAttackModifierDeck: GameAttackModifierDeckModel;
  allyAttackModifierDeck: GameAttackModifierDeckModel;
  attackModifier: number | undefined;
  attackModifiers: AttackModifierType[] | undefined;
  newElements: Element[];
  strongElements: Element[];
  elements: Element[];
  solo: boolean;
  party: Party | undefined;

  constructor(edition: string | undefined = undefined,
    figures: string[] = [],
    characters: GameCharacterModel[] = [],
    monsters: GameMonsterModel[] = [],
    objectives: GameObjectiveModel[] = [],
    state: GameState = GameState.next,
    scenario: Scenario | undefined = undefined,
    sections: SectionData[] = [],
    level: number = 0,
    levelCalculation: boolean = true,
    levelAdjustment: number = 0,
    bonusAdjustment: number = 0,
    ge5Player: boolean = true,
    round: number = 0,
    playSeconds: number = 0,
    totalSeconds: number = 0,
    monsterAttackModifierDeck: GameAttackModifierDeckModel = new GameAttackModifierDeckModel(-1, defaultAttackModifierCards),
    allyAttackModifierDeck: GameAttackModifierDeckModel = new GameAttackModifierDeckModel(-1, defaultAttackModifierCards),
    newElements: Element[] = [],
    strongElements: Element[] = [],
    elements: Element[] = [],
    solo: boolean = false,
    party: Party | undefined = undefined) {
    this.edition = edition;
    this.figures = figures;
    this.characters = characters;
    this.monsters = monsters;
    this.objectives = objectives;
    this.state = state;
    this.scenario = scenario;
    this.sections = sections;
    this.level = level;
    this.levelCalculation = levelCalculation;
    this.levelAdjustment = levelAdjustment;
    this.bonusAdjustment = bonusAdjustment;
    this.ge5Player = ge5Player;
    this.round = round;
    this.playSeconds = playSeconds;
    this.totalSeconds = totalSeconds;
    this.monsterAttackModifierDeck = monsterAttackModifierDeck;
    this.allyAttackModifierDeck = allyAttackModifierDeck;
    this.newElements = newElements;
    this.strongElements = strongElements;
    this.elements = elements;
    this.solo = solo;
    this.party = party;
  }

}