import { member } from "autofieldr";
import { Maps as EightBittrMaps } from "eightbittr";
import {
    Area as MapsCreatrArea,
    AreaRaw as MapsCreatrAreaRaw,
    Location as MapsCreatrLocation,
    LocationRaw as MapsCreatrLocationRaw,
    Map as MapsCreatrMap,
    MapRaw as MapsCreatrMapRaw,
    PreActorLike as MapsCreatrPreActorLike,
} from "mapscreatr";
import { MapScreenr as EightBittrMapScreenr } from "mapscreenr";

import { PalletTown } from "../creators/mapsLibrary/PalletTown";
import { ChooseYourFramework } from "../ChooseYourFramework";

import { Direction } from "./Constants";
import { EntranceAnimations } from "./maps/EntranceAnimations";
import { Player, Actor } from "./Actors";

/**
 * A flexible container for map attributes and viewport.
 */
export interface MapScreenr extends EightBittrMapScreenr {
    /**
     * Which are the player is currently active in.
     *
     * @todo Consider moving this into EightBittr core.
     */
    activeArea: Area;

    /**
     * Known variables, keyed by name.
     */
    variables: {
        /**
         * The current size of the areAn Actors are placed in.
         */
        boundaries: AreaBoundaries;

        /**
         * What form of scrolling is currently capable on the screen.
         */
        scrollability: number;
    };
}

/**
 * A raw JSON-friendly description of a map.
 */
export interface MapRaw extends MapsCreatrMapRaw {
    /**
     * A listing of areas in the Map, keyed by name.
     */
    areas: {
        [i: number]: AreaRaw;
        [i: string]: AreaRaw;
    };

    /**
     * The default location for the Map.
     */
    locationDefault: number | string;

    /**
     * Descriptions of locations in the map.
     */
    locations: {
        [i: number]: LocationRaw;
        [i: string]: LocationRaw;
    };

    /**
     * A starting seed to initialize random number generation.
     */
    seed?: number | number[];
}

/**
 * A Map parsed from its raw JSON-friendly description.
 */
export interface Map extends MapsCreatrMap {
    /**
     * A listing of areas in the Map, keyed by name.
     */
    areas: {
        [i: string]: Area;
        [i: number]: Area;
    };

    /**
     * The name of the Map, such as "Pallet Town".
     */
    name: string;

    /**
     * The default location for the Map.
     */
    locationDefault?: string;

    /**
     * A starting seed to initialize random number generation.
     */
    seed: number | number[];
}

/**
 * A raw JSON-friendly description of a map area.
 */
export interface AreaRaw extends MapsCreatrAreaRaw {
    /**
     * Any additional attributes that should add extra properties to this Area.
     */
    attributes?: {
        [i: string]: any;
    };

    /**
     * What background to display behind all Actors.
     */
    background?: string;

    /**
     * How tall the area is.
     * @todo It's not clear if this is different from boundaries.height.
     */
    height?: number;

    /**
     * Whether the area should have invisible borders added around it.
     */
    invisibleWallBorders?: boolean;

    /**
     * How wide the area is.
     * @todo It's not clear if this is different from boundaries.width.
     */
    width?: number;
}

/**
 * An Area parsed from a raw JSON-friendly Area description.
 */
export interface Area extends AreaRaw, MapsCreatrArea {
    /**
     * What background to display behind all Actors.
     */
    background: string;

    /**
     * In-game boundaries of all placed Actors.
     */
    boundaries: AreaBoundaries;

    /**
     * The Map this Area is within.
     */
    map: Map;

    /**
     * Whether this Area has been spawned.
     */
    spawned: boolean;

    /**
     * Which Map spawned this Area and when.
     */
    spawnedBy: AreaSpawnedBy;
}

/**
 * A description of how an Area has been stretched by its placed Actors.
 */
export interface AreaBoundaries {
    /**
     * How wide the Area is.
     */
    width: number;

    /**
     * How tall the Area is.
     */
    height: number;

    /**
     * The top border of the boundaries' bounding box.
     */
    top: number;

    /**
     * The right border of the boundaries' bounding box.
     */
    right: number;

    /**
     * The bottom border of the boundaries' bounding box.
     */
    bottom: number;

    /**
     * The left border of the boundaries' bounding box.
     */
    left: number;
}

/**
 * A description of which Map spawned an Area and when.
 */
export interface AreaSpawnedBy {
    /**
     * The name of the Map that spawned the Area.
     */
    name: string;

    /**
     * When the spawning occurred.
     */
    timestamp: number;
}

/**
 * A raw JSON-friendly description of a location.
 */
export interface LocationRaw extends MapsCreatrLocationRaw {
    /**
     * A direction to immediately face the player towards.
     */
    direction?: number;

    /**
     * The x-location in the parent Area.
     */
    xLocation?: number;

    /**
     * The y-location in the parent Area.
     */
    yLocation?: number;
}

/**
 * A Location parsed from a raw JSON-friendly Map description.
 */
export interface Location extends MapsCreatrLocation {
    /**
     * The Area this Location is a part of.
     */
    area: Area;

    /**
     * A direction to immediately face the player towards.
     */
    direction?: number;

    /**
     * The x-location in the parent Area.
     */
    xLocation?: number;

    /**
     * The y-location in the parent Area.
     */
    yLocation?: number;
}

/**
 * A position holder around an in-game Actor.
 */
export interface PreActorLike extends MapsCreatrPreActorLike {
    /**
     * A starting direction to face (by default, up).
     */
    direction?: number;

    /**
     * The in-game Actor.
     */
    actor: Actor;

    /**
     * The raw x-location from the Area's creation command.
     */
    x: number;

    /**
     * The raw y-location from the Area's creation command.
     */
    y: number;

    /**
     * How wide the Actor should be.
     */
    width?: number;

    /**
     * How tall the Actor should be.
     */
    height: number;
}

/**
 * Enters and spawns map areas.
 */
export class Maps<Game extends ChooseYourFramework> extends EightBittrMaps<Game> {
    /**
     * Map entrance animations.
     */
    @member(EntranceAnimations)
    public readonly entranceAnimations!: EntranceAnimations;

    /**
     * Entrance Functions that may be used as the openings for Locations.
     */
    public readonly entrances = {
        Normal: this.entranceAnimations.normal,
    };

    public readonly maps = {
        "Pallet Town": PalletTown,
    };

    /**
     * Processes additional Actor attributes. For each attribute the Area's
     * class says it may have, if it has it, the attribute value proliferated
     * onto the Area.
     *
     * @param area The Area being processed.
     */
    public areaProcess = (area: Area): void => {
        const attributes: { [i: string]: any } | undefined = area.attributes;
        if (!attributes) {
            return;
        }

        for (const attribute in attributes) {
            if ((area as any)[attribute]) {
                this.game.utilities.proliferate(area, attributes[attribute]);
            }
        }
    };

    /**
     * Adds An Actor via addPreActor based on the specifications in a PreActor.
     * This is done relative to MapScreener.left and MapScreener.top.
     *
     * @param preactor   A PreActor whose Actor is to be added to the game.
     */
    public addPreActor = (preactor: PreActorLike): void => {
        const actor: Actor = preactor.actor;

        if (actor.spawned) {
            return;
        }
        actor.spawned = true;

        actor.areaName = actor.areaName || this.game.areaSpawner.getAreaName();
        actor.mapName = actor.mapName || this.game.areaSpawner.getMapName();

        this.game.actors.add(
            actor,
            preactor.left - this.game.mapScreener.left,
            preactor.top - this.game.mapScreener.top
        );
    };

    /**
     * Adds a new Player Actor to the game and sets it as eightBitter.player. Any
     * required additional settings (namely keys, power/size, and swimming) are
     * applied here.
     *
     * @param left   A left edge to place the Actor at (by default, 0).
     * @param bottom   A top to place the Actor upon (by default, 0).
     * @returns A newly created Player in the game.
     */
    public addPlayer(left = 0, top = 0): Player {
        const player: Player = this.game.objectMaker.make<Player>(this.game.actors.names.player);
        player.keys = player.getKeys();

        this.game.players[0] = player;
        this.game.actors.add(player, left || 0, top || 0);

        return player;
    }

    /**
     * Sets the game state to a new Map, resetting all Actors and inputs in the
     * process. The mod events are fired.
     *
     * @param name   The name of the Map.
     * @param location   The name of the Location within the Map.
     * @param noEntrance    Whether or not an entry Function should
     *                      be skipped (by default, false).
     * @remarks Most of the work here is done by setLocation.
     */
    public setMap(name: string, location?: string, noEntrance?: boolean): Location {
        if (!name) {
            name = this.game.areaSpawner.getMapName();
        }

        const map: Map = this.game.areaSpawner.setMap(name) as Map;

        this.game.numberMaker.resetFromSeed(map.seed);

        return this.setLocation(location || map.locationDefault || "Blank", noEntrance);
    }

    /**
     * Sets the game state to a Location within the current map, resetting all
     * Actors, inputs, the current Area, PixelRender, and MapScreener in the
     * process. The Location's entry Function is called to bring a new Player
     * into the game if specified. The mod events are fired.
     *
     * @param name   The name of the Location within the Map.
     * @param noEntrance   Whether an entry function should be skipped (by default, false).
     * @todo Separate external module logic to their equivalent components then
     *       pass them as an onPreSetLocation/onSetLocation here to reduce dependencies.
     */
    public setLocation(name: string, noEntrance?: boolean): Location {
        this.game.groupHolder.clear();
        this.game.mapScreener.clearScreen();
        this.game.menuGrapher.deleteAllMenus();
        this.game.timeHandler.cancelAllEvents();

        this.game.areaSpawner.setLocation(name);
        this.game.mapScreener.setVariables();

        const location = this.game.areaSpawner.getLocation(name) as Location;
        location.area.spawnedBy = {
            name,
            timestamp: new Date().getTime(),
        };

        this.game.mapScreener.activeArea = location.area;
        this.game.pixelDrawer.setBackground((this.game.areaSpawner.getArea() as Area).background);

        this.game.quadsKeeper.resetQuadrants();

        if (!noEntrance && location.entry) {
            location.entry.call(this, location);
        }

        this.game.frameTicker.play();

        return location;
    }

    /**
     * Analyzes a PreActor to be placed in one of the
     * cardinal directions of the current Map's boundaries
     * (just outside of the current Area).
     *
     * @param preactor   A PreActor whose Actor is to be added to the game.
     * @param direction   The cardinal direction the Character is facing.
     * @remarks Direction is taken in by the .forEach call as the index.
     */
    public addAfter = (preactor: PreActorLike, direction: Direction): void => {
        const preactors: any = this.game.areaSpawner.getPreActors();
        const area: Area = this.game.areaSpawner.getArea() as Area;
        const map: Map = this.game.areaSpawner.getMap() as Map;
        const boundaries: AreaBoundaries = this.game.areaSpawner.getArea()
            .boundaries as AreaBoundaries;

        preactor.direction = direction;
        switch (direction) {
            case Direction.Top:
                preactor.x = boundaries.left;
                preactor.y = boundaries.top - 32;
                preactor.width = boundaries.right - boundaries.left;
                break;

            case Direction.Right:
                preactor.x = boundaries.right;
                preactor.y = boundaries.top;
                preactor.height = boundaries.bottom - boundaries.top;
                break;

            case Direction.Bottom:
                preactor.x = boundaries.left;
                preactor.y = boundaries.bottom;
                preactor.width = boundaries.right - boundaries.left;
                break;

            case Direction.Left:
                preactor.x = boundaries.left - 32;
                preactor.y = boundaries.top;
                preactor.height = boundaries.bottom - boundaries.top;
                break;

            default:
                throw new Error(`Unknown direction: '${direction}'.`);
        }

        this.game.mapsCreator.analyzePreSwitch(preactor, preactors, area, map);
    };
}
