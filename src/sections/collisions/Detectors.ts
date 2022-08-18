import { Section } from "eightbittr";
import { MenuDialogRaw } from "menugraphr";

import { ChooseYourFramework } from "../../ChooseYourFramework";
import { Character, Player } from "../Actors";

/**
 * Handlers for collisions with Detector Actors.
 */
export class Detectors extends Section<ChooseYourFramework> {
    /**
     * Collision callback for a Player and a dialog-containing Character. The
     * dialog is started if it exists, as with a cutscene from other.
     *
     * @param actor   A Player triggering other.
     * @param other   A Character with dialog triggered by actor.
     */
    public collideCharacterDialog = (actor: Player, other: Character): void => {
        let dialog = other.dialog;

        if (other.cutscene) {
            this.game.scenePlayer.startCutscene(other.cutscene, {
                actor,
                triggerer: other,
            });
        }

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

        if (other.switchDirectionOnDialog) {
            this.game.actions.animateCharacterSetDirection(other, direction);
        }
    };
}
