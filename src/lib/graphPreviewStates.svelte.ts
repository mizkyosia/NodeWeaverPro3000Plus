import type { $Enums, Collection, Graph } from "@prisma/client";

export type GraphDetails = Graph & {
    _count: {
        ratings: number;
        favorited: number;
        collections: number;
    }
    author: {
        name: string;
        id: number;
    } | null,
    favorited: boolean;
};

export const collectionManagerState: {
    show: boolean;
    collections?: {
        id: number;
        title: string;
        visibility: $Enums.Visibility;
        containsGraph: boolean;
    }[],
    newValue: string[]
} = $state({
    show: false,
    collections: undefined,
    newValue: []
});

export const graphDetailsState: {
    show: boolean;
    data?: GraphDetails;
} = $state({
    show: false,
    data: undefined
});