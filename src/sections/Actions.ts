import { member } from "autofieldr";
import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Roaming } from "./actions/Roaming";
import { Walking } from "./actions/Walking";
import { Direction } from "./Constants";
import { Actor, Character, Detector, Player, RoamingCharacter } from "./Actors";

/**
 * Actions characters may perform walking around.
 */
export class Actions extends Section<ChooseYourFramework> {
    /**
     * Idle characters turning and walking in random directions.
     */
    @member(Roaming)
    public readonly roaming: Roaming;

    /**
     * Starts, continues, and stops characters walking.
     */
    @member(Walking)
    public readonly walking: Walking;

    /**
     * Spawning callback for Characters. Sight and roaming are accounted for.
     *
     * @param actor   A newly placed Character.
     */
    public spawnCharacter = (actor: Character): void => {
        if (actor.roaming) {
            this.game.timeHandler.addEvent(
                (): void => this.roaming.startRoaming(actor as RoamingCharacter),
                this.game.numberMaker.randomInt(70)
            );
        }
    };

    /**
     * Collision callback for a Player and a Pokeball it's interacting with.
     *
     * @param actor   A Player interacting with other.
     * @param other   A Pokeball being interacted with by actor.
     */
    public activatePokeball = (actor: Player, other: Detector): void => {
        if (!other.cutscene) {
            throw new Error("Pokeball must have a cutscene for the cutscene action.");
        }

        this.game.scenePlayer.startCutscene(other.cutscene, {
            player: actor,
            triggerer: other,
        });
        if (other.routine) {
            this.game.scenePlayer.playRoutine(other.routine);
        }
    };

    /**
     * Sets An Actor facing a particular direction.
     *
     * @param actor   An in-game Actor.
     * @param direction   A direction for actor to face.
     * @todo Add more logic here for better performance.
     */
    public animateCharacterSetDirection(actor: Actor, direction: Direction): void {
        actor.direction = direction;

        if (direction % 2 === 1) {
            this.game.graphics.flipping.unflipHorizontal(actor);
        }

        this.game.graphics.classes.removeClasses(
            actor,
            this.game.constants.directionClasses[Direction.Top],
            this.game.constants.directionClasses[Direction.Right],
            this.game.constants.directionClasses[Direction.Bottom],
            this.game.constants.directionClasses[Direction.Left]
        );

        this.game.graphics.classes.addClass(
            actor,
            this.game.constants.directionClasses[direction]
        );

        if (direction === Direction.Right) {
            this.game.graphics.flipping.flipHorizontal(actor);
            this.game.graphics.classes.addClass(
                actor,
                this.game.constants.directionClasses[Direction.Left]
            );
        }
    }
}
