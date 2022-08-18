import { member } from "autofieldr";
import { TimeCycles, Actor as ClassCyclrActor } from "classcyclr";
import { Actor as EightBittrActor, Actors as EightBittrActors } from "eightbittr";
import * as menugraphr from "menugraphr";
import * as timehandlr from "timehandlr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Direction } from "./Constants";
import { Dialog } from "./Menus";
import { ActorNames } from "./actors/ActorNames";

/**
 * Actors keyed by their ids.
 */
export interface ActorsById {
    [i: string]: Actor;
}

/**
 * An in-game Actor with size, velocity, position, and other information.
 */
export interface Actor extends EightBittrActor, Omit<ClassCyclrActor, "onActorAdded"> {
    spriteCycleSynched: any;
    spriteCycle: any;
    flipHorizontal?: boolean;
    flipVertical?: boolean;

    /**
     * What to do when a Character, commonly a Player, activates this Actor.
     *
     * @param activator   The Character activating this.
     * @param activated   The Actor being activated.
     */
    activate?(activator: Character, activated?: Actor): void;

    /**
     * The area this was spawned by.
     */
    areaName: string;

    /**
     * Actors this is touching in each cardinal direction.
     */
    bordering: [Actor | undefined, Actor | undefined, Actor | undefined, Actor | undefined];

    /**
     * Whether this should be chosen over other Actors if it is one of multiple
     * potential Actor borders.
     */
    borderPrimary?: boolean;

    /**
     * What to do when a Character collides with this Actor.
     *
     * @param actor   The Character colliding with this Actor.
     * @param other   This actor being collided by the Character.
     */
    collide(actor: Character, other: Actor): boolean;

    /**
     * Animation cycles set by the ClassCyclr.
     */
    cycles: TimeCycles;

    /**
     * Whether this has been killed.
     */
    dead?: boolean;

    /**
     * What cardinal direction this is facing.
     */
    direction: number;

    /**
     * Whether this is undergoing a "flicker" effect by toggling .hidden on an interval.
     */
    flickering?: boolean;

    /**
     * The globally identifiable, potentially unique id of this Actor.
     */
    id: string;

    /**
     * The name of the map that spawned this.
     */
    mapName: string;

    /**
     * Whether this is barred from colliding with other Actors.
     */
    nocollide?: boolean;

    /**
     * How many quadrants this is contained within.
     */
    numquads: number;

    /**
     * A horizontal visual offset to shift by.
     */
    offsetX: number;

    /**
     * A vertical visual offset to shift by.
     */
    offsetY: number;

    /**
     * Whether this has been spawned into the game.
     */
    spawned: boolean;

    /**
     * Bottom vertical tolerance for not colliding with another Actor.
     */
    tolBottom: number;

    /**
     * Left vertical tolerance for not colliding with another Actor.
     */
    tolLeft: number;

    /**
     * Right horizontal tolerance for not colliding with another Actor.
     */
    tolRight: number;

    /**
     * Top vertical tolerance for not colliding with another Actor.
     */
    tolTop: number;

    /**
     * Keying by a Direction gives the corresponding bounding box edge.
     */
    [direction: number]: number;
}

/**
 * A Character Actor.
 * @todo This should be separated into its sub-classes the way FSM's Character is.
 */
export interface Character extends Actor {
    /**
     * For custom triggerable Characters, whether this may be used.
     */
    active?: boolean;

    /**
     * An Actor that activated this character.
     */
    collidedTrigger?: Detector;

    /**
     * A cutscene to activate when interacting with this Character.
     */
    cutscene?: string;

    /**
     * A dialog to start when activating this Character. If dialogDirections is true,
     * it will be interpreted as a separate dialog for each direction of interaction.
     */
    dialog?: menugraphr.MenuDialogRaw | menugraphr.MenuDialogRaw[];

    /**
     * Whether dialog should definitely be treated as an Array of one Dialog each direction.
     */
    dialogDirections?: number[];

    /**
     * A single set of dialog (or dialog directions) to play after the primary dialog
     * is complete.
     */
    dialogNext?: menugraphr.MenuDialogRaw | menugraphr.MenuDialogRaw[];

    /**
     * A dialog to place after the primary dialog as a yes or no menu.
     * @todo If the need arises, this could be changed to any type of menu.
     */
    dialogOptions?: Dialog;

    /**
     * A direction to always face after a dialog completes.
     */
    directionPreferred?: number;

    /**
     * Whether this is currently moving, generally from walking.
     */
    isMoving: boolean;

    /**
     * A direction to turn to when the current walking step is done.
     */
    nextDirection?: Direction;

    /**
     * Whether this is a Player.
     */
    player?: boolean;

    /**
     * Whether this is sporadically walking in random directions.
     */
    roaming?: boolean;

    /**
     * How fast this moves.
     */
    speed: number;

    /**
     * Whether this should turn towards an activating Character when a dialog is triggered.
     */
    switchDirectionOnDialog?: boolean;

    /**
     * Whether this is currently engaging in its activated dialog.
     */
    talking?: boolean;

    /**
     * Where this will turn to when its current walking step is complete.
     */
    turning?: number;

    /**
     * Whether this is currently walking.
     */
    walking?: boolean;

    /**
     * The class cycle for flipping back and forth while walking.
     */
    walkingFlipping?: timehandlr.TimeEvent;

    /**
     * A direction to turn to when the current walking step is done.
     */
    wantsToWalk?: boolean;
}

/**
 * A Character able to roam in random directions.
 */
export interface RoamingCharacter extends Character {
    /**
     * Whether this is roaming (always true in this type).
     */
    roaming: true;

    /**
     * Directions this is allowed to roam.
     */
    roamingDirections: number[];

    /**
     * Distances this has roamed horizontally and vertically.
     */
    roamingDistances: {
        horizontal: number;
        vertical: number;
    };
}

/**
 * A Player Character.
 */
export interface Player extends Character {
    /**
     * Whether Detectors this collides with should consider walking to be an indication
     * of activation. This is useful for when the Player is following but needs to trigger
     * a Detector anyway.
     */
    allowDirectionAsKeys?: boolean;

    /**
     * @returns A new descriptor container for key statuses.
     */
    getKeys(): PlayerKeys;

    /**
     * A descriptor for a user's keys' statuses.
     */
    keys: PlayerKeys;
}

/**
 * A descriptor for a user's keys' statuses.
 */
export interface PlayerKeys {
    /**
     * Whether the user is currently indicating a selection.
     */
    a: boolean;

    /**
     * Whether the user is currently indicating a deselection.
     */
    b: boolean;

    /**
     * Whether the user is currently indicating to go up.
     */
    0: boolean;

    /**
     * Whether the user is currently indicating to go to the right.
     */
    1: boolean;

    /**
     * Whether the user is currently indicating to go down.
     */
    2: boolean;

    /**
     * Whether the user is currently indicating to go to the left.
     */
    3: boolean;
}

/**
 * A Detector Actor. These are typically Solids.
 */
export interface Detector extends Actor {
    /**
     * Whether this is currently allowed to activate.
     */
    active?: boolean;

    /**
     * A callback for when a Player activates this.
     *
     * @param actor   The Player activating other, or other if a self-activation.
     * @param other   The Detector being activated by actor.
     */
    activate?(actor: Player | Detector, other?: Detector): void;

    /**
     * A cutscene to start when this is activated.
     */
    cutscene?: string;

    /**
     * A dialog to start when activating this Character. If an Array, it will be interpreted
     * as a separate dialog for each cardinal direction of interaction.
     */
    dialog?: menugraphr.MenuDialogRaw;

    /**
     * Whether this shouldn't be killed after activation (by default, false).
     */
    keepAlive?: boolean;

    /**
     * Whether this requires a direction to be activated.
     */
    requireDirection?: Direction;

    /**
     * Whether a Player needs to be fully within this Detector to trigger it.
     */
    requireOverlap?: boolean;

    /**
     * A cutscene routine to start when this is activated.
     */
    routine?: string;

    /**
     * Whether this should deactivate itself after a first use (by default, false).
     */
    singleUse?: boolean;
}

/**
 * A Detector that adds an Area into the game.
 */
export interface AreaSpawner extends Detector {
    /**
     * The Area to add into the game.
     */
    area: string;

    /**
     * The name of the Map to retrieve the Area within.
     */
    map: string;
}

/**
 * An Character's sight Detector.
 */
export interface SightDetector extends Detector {
    /**
     * The Character using this Detector as its sight.
     */
    viewer: Character;
}

/**
 * Adds and processes new Actors into the game.
 */
export class Actors<Game extends ChooseYourFramework> extends EightBittrActors<Game> {
    /**
     * Stores known names of Actors.
     */
    @member(ActorNames)
    public readonly names: ActorNames;

    /**
     * Overridden Function to adds a new Actor to the game at a given position,
     * relative to the top left corner of the screen.
     *
     * @param actorRaw   What type of Actor to add. This may be a String of
     *                   the class title, an Array containing the String
     *                   and an Object of settings, or an actual Actor.
     * @param left   The horizontal point to place the Actor's left at (by
     *               default, 0).
     * @param top   The vertical point to place the Actor's top at (by default, 0).
     */
    public add<TActor extends Actor = Actor>(
        actorRaw: string | Actor | [string, any],
        left = 0,
        top = 0
    ): TActor {
        const actor: TActor = super.add(actorRaw, left, top) as TActor;

        if (typeof actor.direction !== "undefined") {
            this.game.actions.animateCharacterSetDirection(actor, actor.direction);
        }

        return actor;
    }

    /**
     * Slight addition to the parent actorProcess Function. The Actor's hit
     * check type is cached immediately, and a default id is assigned if an id
     * isn't already present.
     *
     * @param actor   The Actor being processed.
     * @param title   What type Actor this is (the name of the class).
     * @remarks This is generally called as the onMake call in an ObjectMakr.
     */
    public process(actor: Actor, title: string): void {
        super.process(actor, title);

        // Sprite cycles
        let cycle: any;
        if ((cycle = actor.spriteCycle)) {
            this.game.classCycler.addClassCycle(
                actor,
                cycle[0],
                cycle[1] || undefined,
                cycle[2] || undefined
            );
        }
        if ((cycle = actor.spriteCycleSynched)) {
            this.game.classCycler.addClassCycleSynched(
                actor,
                cycle[0],
                cycle[1] || undefined,
                cycle[2] || undefined
            );
        }

        // Terrain and Scenery groups will never have collisions checked
        if (actor.groupType !== "Terrain" && actor.groupType !== "Scenery") {
            actor.bordering = [undefined, undefined, undefined, undefined];
        }

        if (typeof actor.id === "undefined") {
            actor.id = [
                this.game.areaSpawner.getMapName(),
                this.game.areaSpawner.getAreaName(),
                actor.title,
                actor.name || "Anonymous",
            ].join("::");
        }
    }
}
