<script>
  export let ele
  let backEvent = () => {
    ele.remove()
  };
</script>

<img src="./icons/x.png" alt="" on:click={backEvent} />
