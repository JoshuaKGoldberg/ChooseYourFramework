import { GameWindow, Inputs as EightBittrInputs } from "eightbittr";
import { TriggerContainer } from "inputwritr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Direction } from "./Constants";
import { Character, Player } from "./Actors";

/**
 * User input filtering and handling.
 */
export class Inputs<Game extends ChooseYourFramework> extends EightBittrInputs<Game> {
    /**
     * Known, allowed aliases for input event triggers.
     */
    public readonly aliases = {
        left: [65, 37], // a, left
        right: [68, 39], // d, right
        up: [87, 38], // w, up
        down: [83, 40], // s, down
        a: [90, 13], // z, enter
        b: [88, 8], // x, backspace
    };

    /**
     * Mapping of events to their key codes, to their callbacks.
     */
    public readonly triggers: TriggerContainer = {
        onkeydown: {
            left: (event) => this.keyDownLeft(this.game.players[0], event),
            right: (event) => this.keyDownRight(this.game.players[0], event),
            up: (event) => this.keyDownUp(this.game.players[0], event),
            down: (event) => this.keyDownDown(this.game.players[0], event),
            a: (event) => this.keyDownA(this.game.players[0], event),
            b: (event) => this.keyDownB(this.game.players[0], event),
        },
        onkeyup: {
            left: (event) => this.keyUpLeft(this.game.players[0], event),
            right: (event) => this.keyUpRight(this.game.players[0], event),
            up: (event) => this.keyUpUp(this.game.players[0], event),
            down: (event) => this.keyUpDown(this.game.players[0], event),
            a: (event) => this.keyUpA(this.game.players[0], event),
            b: (event) => this.keyUpB(this.game.players[0], event),
        },
    };

    /**
     * Quickly tapping direction keys means to look in a direction, not walk.
     */
    public readonly inputTimeTolerance: number = 4;

    /**
     * Adds InputWritr pipes as global event listeners.
     */
    public initializeGlobalPipes(gameWindow: GameWindow) {
        super.initializeGlobalPipes(gameWindow);

        gameWindow.addEventListener(
            "keydown",
            this.game.inputWriter.createPipe("onkeydown", "keyCode")
        );

        gameWindow.addEventListener(
            "keyup",
            this.game.inputWriter.createPipe("onkeyup", "keyCode")
        );
    }

    /**
     * Checks whether direction keys such as up may trigger for a Character.
     *
     * @param actor   A Character that wants to move.
     * @returns Whether direction keys may trigger.
     */
    public canDirectionsTrigger(): boolean {
        if (this.game.frameTicker.getPaused()) {
            return false;
        }

        if (this.game.menuGrapher.getActiveMenu()) {
            return true;
        }

        return true;
    }

    /**
     * Reacts to a Character simulating an up key press. If possible, this causes
     * walking in the up direction. The onKeyDownUp mod trigger is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownUp(actor: Character, event?: Event) {
        event?.preventDefault();
        if (!this.canDirectionsTrigger()) {
            return;
        }

        if (actor.player) {
            (actor as Player).keys[Direction.Top] = true;
        }

        this.game.timeHandler.addEvent(
            () => this.keyDownDirectionReal(actor as Player, Direction.Top),
            this.inputTimeTolerance
        );
    }

    /**
     * Reacts to a Character simulating a right key press. If possible, this causes
     * walking in the right direction. The onKeyDownRight mod trigger is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownRight(actor: Character, event?: Event) {
        event?.preventDefault();
        if (!this.canDirectionsTrigger()) {
            return;
        }

        if (actor.player) {
            (actor as Player).keys[Direction.Right] = true;
        }

        this.game.timeHandler.addEvent(
            () => this.keyDownDirectionReal(actor as Player, Direction.Right),
            this.inputTimeTolerance
        );
    }

    /**
     * Reacts to a Character simulating a down key press. If possible, this causes
     * walking in the down direction. The onKeyDownDown mod trigger is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownDown(actor: Character, event?: Event) {
        event?.preventDefault();
        if (!this.canDirectionsTrigger()) {
            return;
        }

        if (actor.player) {
            (actor as Player).keys[Direction.Bottom] = true;
        }

        this.game.timeHandler.addEvent(
            () => this.keyDownDirectionReal(actor as Player, Direction.Bottom),
            this.inputTimeTolerance
        );
    }

    /**
     * Reacts to a Character simulating a left key press. If possible, this causes
     * walking in the left direction. The onKeyDownLeft mod trigger is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownLeft(actor: Character, event?: Event) {
        event?.preventDefault();
        if (!this.canDirectionsTrigger()) {
            return;
        }

        if (actor.player) {
            (actor as Player).keys[Direction.Left] = true;
        }

        this.game.timeHandler.addEvent(
            () => this.keyDownDirectionReal(actor as Player, Direction.Left),
            this.inputTimeTolerance
        );
    }

    /**
     * Reacts to the A key being pressed. The MenuGraphr's active menu reacts to
     * the selection if it exists. The onKeyDownA mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownA(actor: Character, event?: Event) {
        event?.preventDefault();
        if (this.game.frameTicker.getPaused()) {
            return;
        }

        if (this.game.menuGrapher.getActiveMenu()) {
            this.game.menuGrapher.registerA();
        } else if (actor.bordering[actor.direction]) {
            if (actor.bordering[actor.direction]!.activate) {
                actor.bordering[actor.direction]!.activate!.call(
                    this,
                    actor,
                    actor.bordering[actor.direction]
                );
            }

            if ((actor as Player).keys) {
                (actor as Player).keys.a = true;
            }
        }
    }

    /**
     * Reacts to the B key being pressed. The MenuGraphr's active menu reacts to
     * the deselection if it exists. The onKeyDownB mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownB(actor: Character, event?: Event) {
        event?.preventDefault();
        if (this.game.frameTicker.getPaused()) {
            return;
        }

        if (this.game.menuGrapher.getActiveMenu()) {
            this.game.menuGrapher.registerB();
        } else if ((actor as Player).keys) {
            (actor as Player).keys.b = true;
        }
    }

    /**
     * Reacts to the left key being lifted. The onKeyUpLeft mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpLeft(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys[Direction.Left] = false;
        }

        if (actor.nextDirection === Direction.Left) {
            actor.nextDirection = undefined;
            actor.wantsToWalk = false;
        } else if (actor.nextDirection === undefined) {
            actor.wantsToWalk = false;
        }
    }

    /**
     * Reacts to the right key being lifted. The onKeyUpRight mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpRight(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys[Direction.Right] = false;
        }

        if (actor.nextDirection === Direction.Right) {
            actor.nextDirection = undefined;
            actor.wantsToWalk = false;
        } else if (actor.nextDirection === undefined) {
            actor.wantsToWalk = false;
        }
    }

    /**
     * Reacts to the up key being lifted. The onKeyUpUp mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpUp(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys[0] = false;
        }

        if (actor.nextDirection === Direction.Top) {
            actor.nextDirection = undefined;
            actor.wantsToWalk = false;
        } else if (actor.nextDirection === undefined) {
            actor.wantsToWalk = false;
        }
    }

    /**
     * Reacts to the down key being lifted. The onKeyUpDown mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpDown(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys[2] = false;
        }

        if (actor.nextDirection === Direction.Bottom) {
            actor.nextDirection = undefined;
            actor.wantsToWalk = false;
        } else if (actor.nextDirection === undefined) {
            actor.wantsToWalk = false;
        }
    }

    /**
     * Reacts to the A key being lifted. The onKeyUpA mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpA(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys.a = false;
        }
    }

    /**
     * Reacts to the B key being lifted. The onKeyUpB mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpB(actor: Character, event?: Event) {
        event?.preventDefault();

        if (actor.player) {
            (actor as Player).keys.b = false;
        }
    }

    /**
     * Reacts to the pause key being lifted. The onKeyUpPause mod event is fired.
     *
     * @param _actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpPause(_actor: Character, event?: Event) {
        event?.preventDefault();
    }

    /**
     * Driver for a direction key being pressed. The MenuGraphr's active menu reacts
     * to the movement if it exists, or the triggering Character attempts to walk
     * if not. The onKeyDownDirectionReal mod event is fired.
     *
     * @param actor   The triggering Character.
     * @param event   The original user-caused Event.
     */
    private keyDownDirectionReal(actor: Player, direction: Direction) {
        if (!actor.keys[direction]) {
            return;
        }

        if (this.game.menuGrapher.getActiveMenu()) {
            this.game.menuGrapher.registerDirection(direction);
            return;
        }

        actor.nextDirection = direction;
        actor.wantsToWalk = true;

        if (!actor.walking) {
            this.game.actions.animateCharacterSetDirection(actor, direction);
        }
    }
}
