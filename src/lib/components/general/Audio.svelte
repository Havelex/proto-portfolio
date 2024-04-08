<script lang="ts">
    export let src: string;
</script>

<audio controls>
  <source src={`${src}.ogg`} type="audio/ogg">
  <source src={`${src}.mp3`} type="audio/mpeg">
  Your browser does not support the audio element.
</audio>