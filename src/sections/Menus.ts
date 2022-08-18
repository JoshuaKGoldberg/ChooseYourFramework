import * as menugraphr from "menugraphr";

import { Actor } from "./Actors";

/**
 * A description of a simple general text dialog to start.
 */
export interface Dialog {
    /**
     * An optional cutscene to start after the dialog.
     */
    cutscene?: string;

    /**
     * Options for a yes or no dialog menu with callbacks after the dialog.
     */
    options?: DialogOptions;

    /**
     * The actual text to display in the dialog.
     */
    words: menugraphr.MenuDialogRaw;
}

/**
 * Dialog settings for a yes or no menu after a dialog.
 */
export interface DialogOptions {
    /**
     * What to display after the "Yes" option is activated.
     */
    Yes: string | Dialog;

    /**
     * What to display after the "No" option is activated.
     */
    No: string | Dialog;
}

/**
 * General attributes for all menus.
 */
export interface MenuBase extends menugraphr.MenuBase {
    /**
     * Whether this has the plain white visual background.
     */
    plain?: boolean;
}

/**
 * A schema to specify creating a menu.
 */
export interface MenuSchema extends menugraphr.MenuSchema {
    /**
     * Whether the menu should be hidden.
     */
    hidden?: boolean;
}

/**
 * A Menu Actor.
 */
export interface Menu extends MenuBase, Actor {
    /**
     * Children Actors attached to the Menu.
     */
    children: Actor[];

    /**
     * How tall this is.
     */
    height: number;

    /**
     * Menu name this is listed under.
     */
    name: string;

    /**
     * Any settings to attach to this Menu.
     */
    settings?: any;

    /**
     * How wide this is.
     */
    width: number;
}

/**
 * A ListMenu Actor.
 */
export interface ListMenu extends Menu, menugraphr.ListMenuBase {}
