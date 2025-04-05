<script lang="ts">
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";
    import placeholder from "$lib/img/placeholder.webp";

    // Define header state
    import { headerState } from "$lib/headerState.svelte";
    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
    ];

    import "$lib/style/discover.scss";

    let data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            name: "Test",
            date: "01/01/1970",
            image: placeholder,
            id: i,
        });
    }
</script>

<PreviewSection title="Recently worked on">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</PreviewSection>

<PreviewSection title="Recently worked on">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</PreviewSection>

<PreviewSection title="Recently worked on">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</PreviewSection>
