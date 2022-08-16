import { member } from "autofieldr";
import { Section } from "eightbittr";
import { MenuDialogRaw } from "menugraphr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Roaming } from "./actions/Roaming";
import { Walking } from "./actions/Walking";
import { Direction } from "./Constants";
import { Dialog, DialogOptions } from "./Menus";
import {
    Actor,
    Character,
    Detector,
    MenuTriggerer,
    Player,
    Pokeball,
    RoamingCharacter,
} from "./Actors";

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
    public activatePokeball = (actor: Player, other: Pokeball): void => {
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
     * Freezes a Character to start a dialog.
     *
     * @param actor   A Player to freeze.
     */
    public animatePlayerDialogFreeze(actor: Player): void {
        this.game.classCycler.cancelClassCycle(actor, "walking");

        if (actor.walkingFlipping) {
            this.game.timeHandler.cancelEvent(actor.walkingFlipping);
            actor.walkingFlipping = undefined;
        }
    }

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

    /**
     * Sets An Actor facing a random direction.
     *
     * @param actor   An in-game Actor.
     */
    public animateCharacterSetDirectionRandom(actor: Actor): void {
        this.animateCharacterSetDirection(actor, this.game.numberMaker.randomIntWithin(0, 3));
    }

    /**
     * Animates the various logic pieces for finishing a dialog, such as pushes,
     * gifts, options, and battle starting or disabling.
     *
     * @param actor   A Player that's finished talking to other.
     * @param other   A Character that actor has finished talking to.
     */
    public animateCharacterDialogFinish(actor: Player, other: Character): void {
        actor.talking = false;
        other.talking = false;

        if (other.directionPreferred) {
            this.animateCharacterSetDirection(other, other.directionPreferred);
        }

        if (other.pushSteps) {
            this.walking.startWalkingOnPath(actor, other.pushSteps);
        }

        if (other.dialogNext) {
            other.dialog = other.dialogNext;
            other.dialogNext = undefined;
            this.game.stateHolder.addChange(other.id, "dialog", other.dialog);
            this.game.stateHolder.addChange(other.id, "dialogNext", undefined);
        }

        if (other.dialogOptions) {
            this.animateCharacterDialogOptions(actor, other, other.dialogOptions);
        }
    }

    /**
     * Displays a yes/no options menu for after a dialog has completed.
     *
     *
     * @param actor   A Player that's finished talking to other.
     * @param other   A Character that actor has finished talking to.
     * @param dialog   The dialog settings that just finished.
     */
    public animateCharacterDialogOptions(actor: Player, other: Character, dialog: Dialog): void {
        if (!dialog.options) {
            throw new Error("Dialog should have .options.");
        }

        const options: DialogOptions = dialog.options;
        const generateCallback = (callbackDialog: string | Dialog): (() => void) | undefined => {
            if (!callbackDialog) {
                return undefined;
            }

            let callback: (...args: any[]) => void;
            let words: MenuDialogRaw;

            if (callbackDialog.constructor === Object && (callbackDialog as Dialog).options) {
                words = (callbackDialog as Dialog).words;
                callback = (): void => {
                    this.animateCharacterDialogOptions(actor, other, callbackDialog as Dialog);
                };
            } else {
                words = (callbackDialog as Dialog).words || (callbackDialog as string);
                if ((callbackDialog as Dialog).cutscene) {
                    callback = this.game.scenePlayer.bindCutscene(
                        (callbackDialog as Dialog).cutscene!,
                        {
                            player: actor,
                            tirggerer: other,
                        }
                    );
                }
            }

            return (): void => {
                this.game.menuGrapher.deleteMenu("Yes/No");
                this.game.menuGrapher.createMenu("GeneralText", {
                    deleteOnFinish: true,
                });
                this.game.menuGrapher.addMenuDialog("GeneralText", words, callback);
                this.game.menuGrapher.setActiveMenu("GeneralText");
            };
        };

        console.warn("DialogOptions assumes type = Yes/No for now...");

        this.game.menuGrapher.createMenu("Yes/No", {
            position: {
                offset: {
                    left: 28,
                },
            },
        });
        this.game.menuGrapher.addMenuList("Yes/No", {
            options: [
                {
                    text: "YES",
                    callback: generateCallback(options.Yes),
                },
                {
                    text: "NO",
                    callback: generateCallback(options.No),
                },
            ],
        });
        this.game.menuGrapher.setActiveMenu("Yes/No");
    }

    /**
     * Activates a Detector to trigger a cutscene and/or routine.
     *
     * @param actor   A Player triggering other.
     * @param other   A Detector triggered by actor.
     */
    public activateCutsceneTriggerer = (actor: Player, other: Detector): void => {
        if (other.removed || actor.collidedTrigger === other) {
            return;
        }

        actor.collidedTrigger = other;
        this.animatePlayerDialogFreeze(actor);

        if (!other.keepAlive) {
            if (other.id.indexOf("Anonymous") !== -1) {
                console.warn("Deleting anonymous CutsceneTriggerer:", other.id);
            }

            this.game.stateHolder.addChange(other.id, "alive", false);
            this.game.death.kill(other);
        }

        if (other.cutscene) {
            this.game.scenePlayer.startCutscene(other.cutscene, {
                player: actor,
                triggerer: other,
            });
        }

        if (other.routine) {
            this.game.scenePlayer.playRoutine(other.routine);
        }
    };

    /**
     * Activates a Detector to play a cutscene, and potentially a dialog.
     *
     * @param actor   A Player triggering other.
     * @param other   A Detector triggered by actor.
     */
    public activateCutsceneResponder(actor: Character, other: Detector): void {
        if (!actor.player || other.removed) {
            return;
        }

        if (other.dialog) {
            this.activateMenuTriggerer(actor, other);
            return;
        }

        this.game.scenePlayer.startCutscene(other.cutscene!, {
            player: actor,
            triggerer: other,
        });
    }

    /**
     * Activates a Detector to open a menu, and potentially a dialog.
     *
     * @param actor   A Character triggering other.
     * @param other   A Detector triggered by actor.
     */
    public activateMenuTriggerer = (actor: Character, other: MenuTriggerer): void => {
        if (other.removed || actor.collidedTrigger === other) {
            return;
        }

        if (!other.dialog) {
            throw new Error("MenuTriggerer should have .dialog.");
        }

        const name: string = other.menu || "GeneralText";
        const dialog: MenuDialogRaw | MenuDialogRaw[] = other.dialog;

        actor.collidedTrigger = other;

        if (!other.keepAlive) {
            this.game.death.kill(other);
        }

        if (!this.game.menuGrapher.getMenu(name)) {
            this.game.menuGrapher.createMenu(name, other.menuAttributes);
        }

        if (dialog) {
            this.game.menuGrapher.addMenuDialog(name, dialog, (): void => {
                const complete: () => void = (): void => {
                    delete actor.collidedTrigger;
                };

                this.game.menuGrapher.deleteMenu("GeneralText");

                if (other.pushSteps) {
                    this.walking.startWalkingOnPath(actor, [...other.pushSteps, complete]);
                } else {
                    complete();
                }
            });
        }

        this.game.menuGrapher.setActiveMenu(name);
    };
}
