import { factory, member } from "autofieldr";
import { ClassCyclr } from "classcyclr";
import { EightBittr, EightBittrSettings } from "eightbittr";
import { GroupHoldr } from "groupholdr";
import { MenuGraphr } from "menugraphr";
import { NumberMakr } from "numbermakr";

import { createClassCycler } from "./creators/createClassCycler";
import { createMenuGrapher } from "./creators/createMenuGrapher";
import { createNumberMaker } from "./creators/createNumberMaker";
import { Actions } from "./sections/Actions";
import { Collisions } from "./sections/Collisions";
import { Constants } from "./sections/Constants";
import { Frames } from "./sections/Frames";
import { Gameplay } from "./sections/Gameplay";
import { Graphics } from "./sections/Graphics";
import { ActorGroups, Groups } from "./sections/Groups";
import { Inputs } from "./sections/Inputs";
import { Maintenance } from "./sections/Maintenance";
import { MapScreenr, Maps } from "./sections/Maps";
import { Objects } from "./sections/Objects";
import { Physics } from "./sections/Physics";
import { Quadrants } from "./sections/Quadrants";
import { Scrolling } from "./sections/Scrolling";
import { Player, Actors } from "./sections/Actors";
import { Timing } from "./sections/Timing";
import { Equations } from "./sections/Equations";

/**
 * Choosing a modern JavaScript UI framework, Pokemon-style.
 */
export class ChooseYourFramework extends EightBittr {
    /**
     * Screen and component reset settings.
     */
    public readonly settings: EightBittrSettings;

    /**
     * Cycles through class names using TimeHandlr events.
     */
    @factory(createClassCycler)
    public readonly classCycler: ClassCyclr;

    /**
     * Gates flags behind generational gaps.
     */

    /**
     * Stores arrays of Actors by their group name.
     */
    public readonly groupHolder: GroupHoldr<ActorGroups>;

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
     * The game's single player.
     *
     * @remarks We assume nobody will try to access this before a map entrance.
     */
    public readonly players: [Player] = [undefined as any];

    /**
     * Total FpsAnalyzr ticks that have elapsed since the constructor or saving.
     */
    public ticksElapsed: number;
}
