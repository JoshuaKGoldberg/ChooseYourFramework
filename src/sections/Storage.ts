import { member } from "autofieldr";
import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { ItemNames } from "./storage/ItemNames";

/**
 * Items to be held in storage.
 */
export interface StorageItems {
    area: string;
    autoSave: boolean;
    gameStarted: boolean;
    location: string | undefined;
    map: string;
    name: string[];
    oldLocalStorage?: StorageItems;
    stateCollectionKeys: string[];
    time: number;
}

/**
 * Settings for storing items in ItemsHoldrs.
 */
export class Storage extends Section<ChooseYourFramework> {
    /**
     * Keys for ItemsHoldr items.
     */
    @member(ItemNames)
    public readonly names: ItemNames;
}
