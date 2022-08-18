import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * Event hooks for major gameplay state changes.
 */
export class Gameplay extends Section<ChooseYourFramework> {
    /**
     * Sets the map to Oak's lab.
     */
    public startOptions(): void {
        this.game.maps.setMap("Pallet Town", "Oak's Lab Floor 1 Door");
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
