import { MapRaw } from "../../sections/Maps";

export const PalletTown: MapRaw = {
    name: "Pallet Town",
    locationDefault: "Player's House Door",
    locations: {
        "Oak's Lab Floor 1 Door": {
            area: "Oak's Lab",
            direction: 0,
        },
    },
    areas: {
        "Oak's Lab": {
            invisibleWallBorders: true,
            creation: [
                { actor: "WallIndoorLightWithDarkBottom", width: 256 },
                { actor: "InvisibleWall", width: 256 },
                { actor: "Table2x2", y: 16, width: 128 },
                {
                    actor: "LabComputer",
                    y: 32,
                },
                {
                    actor: "Book",
                    x: 64,
                    y: 32,
                },
                {
                    actor: "Book",
                    x: 96,
                    y: 32,
                },
                { actor: "FloorLinedHorizontal", y: 32, width: 320, height: 352 },
                { actor: "WallScroll", x: 128 },
                {
                    actor: "WallScroll",
                    x: 160,
                },
                {
                    actor: "Oak",
                    x: 160,
                    y: 32,
                },
                { actor: "Table3x1", x: 12, y: 112 },
                { actor: "Table3x1", x: 108, y: 112 },
                { actor: "Table3x1", x: 204, y: 112 },
                ...[
                    {
                        actor: "AngularLibrary",
                        href: "https://angular.io",
                    },
                    {
                        actor: "ReactLibrary",
                        href: "https://reactjs.org",
                    },
                    {
                        actor: "SolidLibrary",
                        href: "https://www.solidjs.com",
                    },
                    {
                        actor: "SvelteLibrary",
                        href: "https://svelte.dev",
                        offset: 2,
                    },
                    {
                        actor: "VueLibrary",
                        href: "https://vuejs.org",
                    },
                ].map((framework, i) => ({
                    x: i * 64 + (framework.offset ?? 0),
                    y: 96,
                    ...framework,
                })),
                { actor: "Bookshelf", x: 192, width: 128 },
                { actor: "Bookshelf", y: 192, width: 128 },
                { actor: "Bookshelf", x: 192, y: 192, width: 128 },
                {
                    actor: "Lady",
                    id: "lady",
                    x: 32,
                    y: 288,
                    dialog: [
                        "PROF.OAK is the authority on %%%%%%%POKEMON%%%%%%%!",
                        "Many %%%%%%%POKEMON%%%%%%% trainers hold him in high regard!",
                    ],
                    roaming: true,
                    roamingDirections: [0, 8],
                },
                {
                    actor: "Scientist",
                    x: 64,
                    y: 320,
                    id: "scientist-one",
                    dialog: "I study %%%%%%%POKEMON%%%%%%% as PROF.OAK's aide.",
                    roaming: true,
                    roamingDirections: [],
                },
                {
                    actor: "Scientist",
                    x: 256,
                    y: 320,
                    id: "scientist-two",
                    dialog: "I study %%%%%%%POKEMON%%%%%%% as PROF.OAK's aide.",
                    roaming: true,
                    roamingDirections: [],
                },
                { actor: "Doormat", x: 128, y: 352 },
                {
                    actor: "Doormat",
                    x: 160,
                    y: 352,
                    entrance: "Oak's Lab Floor 1 Door",
                },
            ],
        },
    },
};
