import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * Event hooks for major gameplay state changes.
 */
export class Gameplay extends Section<ChooseYourFramework> {
    /**
     * Sets the map to Blank and displays the StartOptions menu.
     */
    public startOptions(): void {
        this.game.maps.setMap("Pallet Town", "Oak's Lab Floor 1 Door");
    }

    /**
     * Starts the game in the saved map and location from itemsHolder, and fires the
     * onGameStartPlay mod trigger.
     */
    public startPlay(): void {
        this.game.maps.setMap(
            this.game.itemsHolder.getItem(this.game.storage.names.map) || "Blank",
            this.game.itemsHolder.getItem(this.game.storage.names.location),
            true
        );
    }

    /**
     * Starts the game's intro, and fires the onGameStartIntro mod trigger.
     */
    public startIntro(): void {
        this.game.scenePlayer.startCutscene("Intro", {
            disablePauseMenu: true,
        });
    }

    /**
     * Checks whether inputs may trigger, which is always true, and prevents the event.
     *
     * @returns Whether inputs may trigger (true).
     */
    public canInputsTrigger(event?: Event): boolean {
        if (event !== undefined) {
            event.preventDefault();
        }

        return true;
    }

    /**
     * Starts the game (currently a no-op).
     */
    public onGamePlay(): void {
        console.log("Playing!");
    }

    /**
     * Pauses the game (currently a no-op).
     */
    public onGamePause(): void {
        console.log("Paused.");
    }

    /**
     * Closes the game.
     */
    public onGameClose(): void {
        console.log("Closed.");
    }
}
