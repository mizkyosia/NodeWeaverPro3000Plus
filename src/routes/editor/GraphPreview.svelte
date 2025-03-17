<script lang="ts">
    const { image, name, date, id } = $props();
</script>

<a href="/editor/{id}" class="graphPreview">
    <span style="background-image: url({image});"></span>
    <h4>{@html name}</h4>
    <p>Last edited on <b>{date}</b></p>
</a>