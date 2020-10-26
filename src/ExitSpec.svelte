<script>
  import { hiddentracker } from "./state_tracker.js";
  let reshowvalue;
  let unsubscriber = hiddentracker.subscribe(v => {
    reshowvalue = v;
  });
  // bring back the original menu

  let backEvent = () => {
    console.log("changing",reshowvalue)
    hiddentracker.update(n=> n+1)
    if (reshowvalue % 2 == 0) {
      document.querySelector("#middle").classList.remove("hidden")
      document.querySelector("#specificPage").remove()
    }
  };
</script>

<img src="./icons/x.png" alt="" on:click={backEvent} />
