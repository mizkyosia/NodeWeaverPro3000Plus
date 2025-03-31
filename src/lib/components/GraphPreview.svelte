<!-- 
@component
Used for displaying graph "previews", including name, author, time and an image
-->
<script lang="ts">
    const { image, name, date, id } = $props();
</script>

<a href="/editor/{id}" class="graphPreview">
    <img alt="Graph preview" src={image}>
    <h4>{@html name}</h4>
    <p>Last edited on <b>{date}</b></p>
</a>
