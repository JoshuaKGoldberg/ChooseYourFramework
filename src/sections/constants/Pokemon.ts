import { Move } from "battlemovr";

/**
 * Matched only by strings returned by keyof TItems.
 */
export type StringKeysOf<TItems> = keyof TItems & string;

/**
 * Static information about a known Pokemon.
 */
export interface PokemonListing {
    /**
     * How difficult this is to catch, for the canCatchPokemon equation.
     *
     * @todo Make this non-optional, once it's added to the data.
     */
    catchRate?: number;

    /**
     * The height of the Pokemon, as ["feet", "inches"].
     */
    height: [string, string];

    /**
     * A short label for the Pokemon, such as "Psi" for Abra.
     */
    label: string;

    /**
     * The title of the Pokemon.
     */
    name: string[];

    /**
     * What number the Pokemon is in the Pokedex.
     */
    number: number;

    /**
     * The type of sprite used in-game for this Pokemon, such as "Water".
     */
    sprite: string;

    /**
     * Lines of text describing the Pokemon.
     */
    info: string[];

    /**
     * The name of the Pokemon this evolves into. This will be refactored eventually.
     */
    evolutions?: PokemonEvolution[];

    /**
     * How quickly this gains experience, as "slow", "mediumSlow", "mediumFast", or "fast".
     */
    experienceType?: string; // Todo: once all are known, make non-optional

    /**
     * How much this weighs.
     */
    weight: number;

    /**
     * This Pokemon's 1 or 2 types.
     */
    types: string[];

    /**
     * The rate of Attack statistic growth.
     */
    attack: number;

    /**
     * The rate of Defense statistic growth.
     */
    defense: number;

    /**
     * The rate of HP statistic growth.
     */
    health: number;

    /**
     * The rate of Special statistic growth.
     */
    special: number;

    /**
     * The rate of HP statistic growth.
     */
    speed: number;

    /**
     * Known moves this Pokemon may learn.
     */
    moves: PokemonMovesListing;
}

/**
 * Moves able to be learned by a Pokemon via different methods.
 */
export interface PokemonMovesListing {
    /**
     * Moves a Pokemon may learn by leveling up.
     */
    natural: PokemonMoveListing[];

    /**
     * Moves a Pokemon may learn by HM.
     */
    hm: PokemonMoveListing[];

    /**
     * Moves a Pokemon may learn by TM.
     */
    tm: PokemonMoveListing[];
}

/**
 * A description of a move a Pokemon may learn.
 */
export interface PokemonMoveListing {
    /**
     * The concatenated title of the move.
     */
    move: string;

    /**
     * What level the move may be learned, if by leveling up.
     */
    level?: number;
}

/**
 * Data regarding requirements for a Pokemon's evolution
 */
export interface PokemonEvolution {
    /**
     * The name of the Pokemon that this Pokemon evolves into.
     */
    evolvedForm: string[];

    /**
     * The requirements for the Pokemon to evolve.
     */
    requirements: PokemonEvolutionRequirement[];
}

/**
 * The requirements for a Pokemon to be able to evolve.
 */
export type PokemonEvolutionRequirement =
    | PokemonEvolutionByLevel
    | PokemonEvolutionByHappiness
    | PokemonEvolutionByTime
    | PokemonEvolutionByTrade
    | PokemonEvolutionByItem
    | PokemonEvolutionByStats;

/**
 * Requirements for a Pokemon that evolves via levelup.
 */
export interface PokemonEvolutionByLevel {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The required Pokemon level to evolve.
     */
    level: number;
}

/**
 * Requirements for a Pokemon that evolves via happiness.
 */
export interface PokemonEvolutionByHappiness {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The required happiness level to evolve.
     */
    happiness: number;
}

/**
 * Requirements for a Pokemon that evolves via time of day.
 */
export interface PokemonEvolutionByTime {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The required time-of-day to evolve.
     */
    time: string;
}

/**
 * Requirements for a Pokemon that evolves via trade.
 */
export interface PokemonEvolutionByTrade {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The required held item to evolve.
     */
    item?: string;
}

/**
 * Requirements for a Pokemon that evolves via use of item.
 */
export interface PokemonEvolutionByItem {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The required item to evolve.
     */
    item: string;
}

/**
 * Requirements for a Pokemon that evolves based on its stats.
 */
export interface PokemonEvolutionByStats {
    /**
     * The type of requirement this falls into.
     */
    method: string;

    /**
     * The stat that should be larger to achieve target evolution.
     */
    greaterStat: string;

    /**
     * The stat that should be smaller to achieve target evolution.
     */
    lesserStat: string;

    /**
     * Whether the two stats may be equal.
     */
    mayBeEqual?: boolean;
}

/**
 * A description of a Pokemon in a player's Pokedex.
 * @todo It's not clear how this is different from PokedexInformation.
 */
export interface PokedexListing extends PokemonListing {
    /**
     * Whether the Pokemon has been caught.
     */
    caught?: boolean;

    /**
     * Whether the Pokemon has been seen.
     */
    seen?: boolean;

    /**
     * The concatenated title of the Pokemon.
     */
    title: string;
}

/**
 * A description of a Pokemon in a player's Pokedex.
 * @todo It's not clear how this is different from PokedexListing.
 */
export interface PokedexInformation {
    /**
     * Whether the Pokemon has been caught.
     */
    caught?: boolean;

    /**
     * Whether the Pokemon has been seen.
     */
    seen?: boolean;

    /**
     * The title of the Pokemon.
     */
    title: string[];
}

/**
 * A player's Pokedex, as a summary of seen Pokemon keyed by name.
 */
export interface Pokedex {
    [i: string]: PokedexInformation;
}

/**
 * Information on new Pokemon being created.
 */
export interface NewPokemon {
    /**
     * Items held by Pokemon.
     */
    item?: string[];

    /**
     * Level of Pokemon.
     */
    level?: number;

    /**
     * Moves that Pokemon has.
     */
    moves?: Move[];

    /**
     * Name of Pokemon.
     */
    title: string[];
}

/**
 * Information on stored Pokemon.
 */
export class Pokemon {
    /**
     * All known Pokemon, keyed by concatenated name.
     */
    public readonly byName: { [i: string]: PokemonListing } = {};
}
