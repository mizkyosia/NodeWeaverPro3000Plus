import type { $Enums } from "@prisma/client";
import type { _GraphDetails } from "$api/graphDetails/+server.ts";
import type { _CollectionDetails } from "$api/collectionDetails/+server";

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
    data?: _GraphDetails;
} = $state({
    show: false,
    data: undefined
});

export const collectionDetailsState: {
    show: boolean;
    data?: _CollectionDetails;
} = $state({
    show: false,
    data: undefined
});