import { ConditionName } from "./data/Condition";

export class Settings {
  abilities: boolean = true;
  abilityNumbers: boolean = true;
  abilityReveal: boolean = true;
  activeApplyConditions: boolean = true;
  activeApplyConditionsExcludes: ConditionName[] = [ConditionName.shield];
  activeStandees: boolean = true;
  activeSummons: boolean = true;
  addAllMonsters: boolean = false;
  allyAttackModifierDeck: boolean = true;
  alwaysAllyAttackModifierDeck: boolean = false;
  alwaysFhSolo: boolean = false;
  alwaysHazardousTerrain: boolean = false;
  alwaysLootApplyDialog = false;
  alwaysLootDeck: boolean = false;
  applyBuildingRewards: boolean = true;
  applyConditions: boolean = true;
  applyConditionsExcludes: ConditionName[] = [ConditionName.shield];
  applyLongRest: boolean = true;
  applyLoot: boolean = true;
  applyLootRandomItem: boolean = true;
  applyRetirement: boolean = true;
  autoBackup: number = -1;
  autoBackupFinish: boolean = false;
  autoBackupUrl: { url: string, method: string, fileUpload: boolean, username: string | undefined, password: string | undefined, authorization: string | undefined } | undefined;
  automaticAttackModifierFullscreen: boolean = true;
  automaticStandees: boolean = true;
  automaticStandeesDialog: boolean = false;
  automaticTheme: boolean = true;
  automaticUnlocking: boolean = true;
  autoscroll: boolean = true;
  barsize: number = 1;
  backupHint: boolean = true;
  battleGoals: boolean = false;
  battleGoalsCharacter: boolean = false;
  battleGoalsFh: boolean = false;
  battleGoalsReminder: boolean = true;
  browserNavigation: boolean = false;
  calculate: boolean = true;
  calculateStats: boolean = true;
  calculateShieldStats: boolean = true;
  characterAttackModifierAnimate: boolean = true;
  characterAttackModifierDeck: boolean = true;
  characterAttackModifierDeckPermanent: boolean = false;
  characterAttackModifierDeckPermanentActive: boolean = false;
  characterCompact: boolean = false;
  characterHandSize: boolean = false;
  characterIdentities: boolean = true;
  characterIdentityHint: boolean = true;
  characterItems: boolean = false;
  characterItemsPermanent: boolean = false;
  characterItemsPermanentActive: boolean = false;
  characterItemsPermanentEquipped: boolean = true;
  characterItemsPermanentSorted: boolean = true;
  characterItemsPermanentZoom: number = 1;
  characterSheet: boolean = true;
  characterSheetCompact: boolean = false;
  characterTraits: boolean = false;
  combineSummonAction: boolean = true;
  debugRightClick: boolean = false;
  disableAnimations: boolean = false;
  disableArtwork: boolean = false;
  disableColumns: boolean = false;
  disableDragFigures: boolean = false;
  disablePinchZoom: boolean = false;
  disabledTurnConfirmation: boolean = false;
  disableSortFigures: boolean = false;
  disableStandees: boolean = false;
  disableWakeLock: boolean = false;
  dragValues: boolean = true;
  editionDataUrls: string[] = [];
  editions: string[] = [];
  eliteFirst: boolean = true;
  excludeEditionDataUrls: string[] = [];
  expireConditions: boolean = true;
  fhGhItems: boolean = false;
  fhStyle: boolean = false;
  fontsize: number = 1;
  globalFontsize: number = 1;
  fullscreen: boolean = false;
  hideAbsent: boolean = false;
  hideStats: boolean = false;
  hints: boolean = true;
  initiativeRequired: boolean = true;
  interactiveAbilities: boolean = true;
  locale: string = "en";
  lootDeck: boolean = true;
  maxUndo: number = 100;
  portraitMode: boolean = true;
  monsters: boolean = true;
  moveElements: boolean = true;
  partySheet: boolean = true;
  pressDoubleClick: boolean = true;
  randomStandees: boolean = false;
  scenarioNumberInput: boolean = false;
  scenarioRooms: boolean = true;
  scenarioRules: boolean = true;
  serverAutoconnect: boolean = true;
  serverPassword: string | undefined;
  serverPort: number | undefined;
  serverSettings: boolean = false;
  serverUrl: string | undefined;
  serverWss: boolean = false;
  showBossMonster: boolean = true;
  showAllSections = false;
  showExpandedAbilityCard: boolean = false;
  showFullAbilityCard: boolean = false;
  showHiddenMonster: boolean = false;
  showOnlyUnfinishedScenarios = false;
  spoilers: string[] = [];
  standeeStats: boolean = false;
  statAnimations: boolean = false;
  theme: string = "";
  tooltips: boolean = true;
  treasuresLoot: boolean = true;
  treasures: boolean = true;
  zoom: number = 100;
}