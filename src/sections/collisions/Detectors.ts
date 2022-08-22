import { Section } from "eightbittr";
import { MenuDialogRaw } from "menugraphr";

import { ChooseYourFramework } from "../../ChooseYourFramework";
import { Character, Player } from "../Actors";

/**
 * Handlers for collisions with Detector Actors.
 */
export class Detectors extends Section<ChooseYourFramework> {
    /**
     * Collision callback for a Player and a dialog-containing Character.
     *
     * @param actor   A Player triggering other.
     * @param other   A Character with dialog triggered by actor.
     */
    public activateCharacterDialog = (actor: Player, other: Character): void => {
        let { dialog } = other;

        if (!dialog) {
            return;
        }

        const direction = this.game.physics.getDirectionBetween(other, actor);

        if (other.dialogDirections) {
            dialog = (dialog as MenuDialogRaw[])[direction];
            if (!dialog) {
                return;
            }
        }

        actor.talking = true;
        other.talking = true;

        if (!this.game.menuGrapher.getActiveMenu()) {
            this.game.menuGrapher.createMenu("GeneralText", {
                deleteOnFinish: !other.dialogOptions,
            });
            this.game.menuGrapher.setActiveMenu("GeneralText");
            this.game.menuGrapher.addMenuDialog("GeneralText", dialog);
        }

        this.game.actions.animateCharacterSetDirection(other, direction);
    };
}
