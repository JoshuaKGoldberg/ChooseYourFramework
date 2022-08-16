import { Section } from "eightbittr";

import { ChooseYourFramework } from "../../ChooseYourFramework";
import { Actor } from "../Actors";

/**
 * Visually flips Actors.
 */
export class Flipping extends Section<ChooseYourFramework> {
    /**
     * Marks An Actor as being flip-horizontal horizontally by setting its .flipHorizontal
     * attribute to true and giving it a "flip-horizontal" class.
     *
     * @param actor
     */
    public flipHorizontal(actor: Actor): void {
        actor.flipHorizontal = true;
        this.game.graphics.classes.addClass(actor, "flip-horizontal");
    }

    /**
     * Marks An Actor as being flip-horizontal vertically by setting its .flipVertical
     * attribute to true and giving it a "flip-horizontal" class.
     *
     * @param actor
     */
    public flipVertical(actor: Actor): void {
        actor.flipVertical = true;
        this.game.graphics.classes.addClass(actor, "flip-vertical");
    }

    /**
     * Marks An Actor as not being flip-horizontal horizontally by setting its .flipHorizontal
     * attribute to false and giving it a "flip-horizontal" class.
     *
     * @param actor
     */
    public unflipHorizontal(actor: Actor): void {
        actor.flipHorizontal = false;
        this.game.graphics.classes.removeClass(actor, "flip-horizontal");
    }

    /**
     * Marks An Actor as not being flip-horizontal vertically by setting its .flipVertical
     * attribute to true and giving it a "flip-horizontal" class.
     *
     * @param actor
     */
    public unflipVertical(actor: Actor): void {
        actor.flipVertical = false;
        this.game.graphics.classes.removeClass(actor, "flip-vertical");
    }
}
