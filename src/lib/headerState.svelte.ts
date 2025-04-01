type RoutePart = {
    name: string,
    url: string
}

export let headerState: {
    path: RoutePart[]
} = $state({
    path: [],
});