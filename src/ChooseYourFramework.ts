import { factory, member } from "autofieldr";
import { ClassCyclr, ClassCyclrSettings } from "classcyclr";
import {
    EightBittr,
    ComponentSettings,
    EightBittrConstructorSettings,
    EightBittrSettings,
} from "eightbittr";
import { FlagSwappr, FlagSwapprSettings } from "flagswappr";
import { GroupHoldr } from "groupholdr";
import { ItemsHoldr } from "itemsholdr";
import { MenuGraphr } from "menugraphr";
import { NumberMakrSettings, NumberMakr } from "numbermakr";
import { ScenePlayr } from "sceneplayr";
import { StateHoldr, StateItemsHoldr } from "stateholdr";

import { createClassCycler } from "./creators/createClassCycler";
import { createFlagSwapper, Flags } from "./creators/createFlagSwapper";
import { createMenuGrapher } from "./creators/createMenuGrapher";
import { createNumberMaker } from "./creators/createNumberMaker";
import { createScenePlayer } from "./creators/createScenePlayer";
import { createStateHolder } from "./creators/createStateHolder";
import { Actions } from "./sections/Actions";
import { Collisions } from "./sections/Collisions";
import { Constants } from "./sections/Constants";
import { Cutscenes } from "./sections/Cutscenes";
import { Frames } from "./sections/Frames";
import { Gameplay } from "./sections/Gameplay";
import { Graphics } from "./sections/Graphics";
import { ActorGroups, Groups } from "./sections/Groups";
import { Inputs } from "./sections/Inputs";
import { Items } from "./sections/Items";
import { Maintenance } from "./sections/Maintenance";
import { MapScreenr, Maps } from "./sections/Maps";
import { Menus } from "./sections/Menus";
import { Objects } from "./sections/Objects";
import { Physics } from "./sections/Physics";
import { Quadrants } from "./sections/Quadrants";
import { Scrolling } from "./sections/Scrolling";
import { StorageItems, Storage } from "./sections/Storage";
import { Player, Actors } from "./sections/Actors";
import { Timing } from "./sections/Timing";
import { Utilities } from "./sections/Utilities";
import { Equations } from "./sections/Equations";

/**
 * Settings to initialize a new ChooseYourFramework.
 */
export interface ChooseYourFrameworkComponentSettings extends ComponentSettings {
    /**
     * Settings overrides for the game's ClassCyclr.
     */
    classCycler?: Partial<ClassCyclrSettings>;

    /**
     * Settings overrides for the game's FlagSwappr.
     */
    flagSwapper?: Partial<FlagSwapprSettings<Flags>>;

    /**
     * Settings overrides for the game's NumberMakr.
     */
    numberMaker?: Partial<NumberMakrSettings>;
}

/**
 * Filled-out settings to initialize a new ChooseYourFramework.
 */
export interface ChooseYourFrameworkConstructorSettings extends EightBittrConstructorSettings {
    /**
     * Component settings overrides.
     */
    components?: Partial<ChooseYourFrameworkComponentSettings>;
}

/**
 * Settings to initialize a new ChooseYourFramework.
 */
export interface ChooseYourFrameworkSettings extends EightBittrSettings {
    /**
     * Component settings overrides.
     */
    components: Partial<ChooseYourFrameworkComponentSettings>;
}

/**
 * A fun little experiment by Josh Goldberg (@JoshuaKGoldberg) based on some very old code.
 */
export class ChooseYourFramework extends EightBittr {
    /**
     * Screen and component reset settings.
     */
    public readonly settings: ChooseYourFrameworkSettings;

    /**
     * Cycles through class names using TimeHandlr events.
     */
    @factory(createClassCycler)
    public readonly classCycler: ClassCyclr;

    /**
     * Gates flags behind generational gaps.
     */
    @factory(createFlagSwapper)
    public readonly flagSwapper: FlagSwappr<Flags>;

    /**
     * Stores arrays of Actors by their group name.
     */
    public readonly groupHolder: GroupHoldr<ActorGroups>;

    /**
     * Cache-based wrapper around localStorage.
     */
    public readonly itemsHolder: ItemsHoldr<StorageItems> & StateItemsHoldr;

    /**
     * A flexible container for map attributes and viewport.
     */
    public readonly mapScreener: MapScreenr;

    /**
     * In-game menu and dialog management system.
     */
    @factory(createMenuGrapher)
    public readonly menuGrapher: MenuGraphr;

    /**
     * Configurable Mersenne Twister implementation.
     */
    @factory(createNumberMaker)
    public readonly numberMaker: NumberMakr;

    /**
     * A stateful cutscene runner for jumping between scenes and their routines.
     */
    @factory(createScenePlayer)
    public readonly scenePlayer: ScenePlayr;

    /**
     * General localStorage saving for collections of state.
     */
    @factory(createStateHolder)
    public readonly stateHolder: StateHoldr;

    /**
     * Actions characters may perform walking around.
     */
    @member(Actions)
    public readonly actions: Actions;

    /**
     * ActorHittr collision function generators.
     */
    @member(Collisions)
    public readonly collisions: Collisions<this>;

    /**
     * Universal game constants.
     */
    @member(Constants)
    public readonly constants: Constants;

    /**
     * ScenePlayr cutscenes, keyed by name.
     */
    @member(Cutscenes)
    public readonly cutscenes: Cutscenes;

    /**
     * How to advance each frame of the game.
     */
    @member(Frames)
    public readonly frames: Frames<this>;

    /**
     * Event hooks for major gameplay state changes.
     */
    @member(Gameplay)
    public readonly gameplay: Gameplay;

    /**
     * Changes the visual appearance of Actors.
     */
    @member(Graphics)
    public readonly graphics: Graphics<this>;

    /**
     * Collection settings for Actor group names.
     */
    @member(Groups)
    public readonly groups: Groups<this>;

    @member(Equations)
    public readonly equations: Equations;

    /**
     * User input filtering and handling.
     */
    @member(Inputs)
    public readonly inputs: Inputs<this>;

    /**
     * Storage keys and value settings.
     */
    @member(Items)
    public readonly items: Items<this>;

    /**
     * Maintains Actors during FrameTickr ticks.
     */
    @member(Maintenance)
    public readonly maintenance: Maintenance<this>;

    /**
     * Enters and spawns map areas.
     */
    @member(Maps)
    public readonly maps: Maps<this>;

    /**
     * Manipulates MenuGraphr menus.
     */
    @member(Menus)
    public readonly menus: Menus;

    /**
     * Raw ObjectMakr factory settings.
     */
    @member(Objects)
    public readonly objects: Objects<this>;

    /**
     * Arranges game physics quadrants.
     */
    @member(Quadrants)
    public readonly quadrants: Quadrants<this>;

    /**
     * Physics functions to move Actors around.
     */
    @member(Physics)
    public readonly physics: Physics<this>;

    /**
     * Moves the screen and Actors in it.
     */
    @member(Scrolling)
    public readonly scrolling: Scrolling<this>;

    /**
     * Settings for storing items in ItemsHoldrs.
     */
    @member(Storage)
    public readonly storage: Storage;

    /**
     * Adds and processes new Actors into the game.
     */
    @member(Actors)
    public readonly actors: Actors<this>;

    /**
     * Timing constants for delayed events.
     */
    @member(Timing)
    public readonly timing: Timing<this>;

    /**
     * Miscellaneous utility functions.
     */
    @member(Utilities)
    public readonly utilities: Utilities<this>;

    /**
     * The game's single player.
     *
     * @remarks We assume nobody will try to access this before a map entrance.
     */
    public readonly players: [Player] = [undefined as any];

    /**
     * Total FpsAnalyzr ticks that have elapsed since the constructor or saving.
     */
    public ticksElapsed: number;

    /**
     * Initializes a new instance of the ChooseYourFramework class.
     *
     * @param settings   Settings to be used for initialization.
     */
    public constructor(settings: ChooseYourFrameworkConstructorSettings) {
        super(settings);

        this.itemsHolder.setAutoSave(this.itemsHolder.getItem(this.storage.names.autoSave));
    }
}
