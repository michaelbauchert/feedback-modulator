<script>
  import { onMount } from 'svelte';
  import { touches } from './touch store.js';
  import { spring } from 'svelte/motion';

  let canvas;
  let copy;
  let touchLength;
  let springyPoints = spring([{x: 0, y: 0},
                              {x: 0, y: 0},
                              {x: 0, y: 0},
                              {x: 0, y: 0},
                              {x: 0, y: 0}], {stiffness: 0.5, damping: 0.3});



  function setTouchDryWet(dryWet, event) {
    const newTouches = event.targetTouches;
    for(let i = 0; i < newTouches.length; i++) {
      let currentTouches = $touches;
      currentTouches[i].wet = dryWet;
      touches.set(currentTouches);
    }

    updateTouchPositions(event);
  }

  function updateTouchPositions(event) {
    const newTouches = event.targetTouches;
    touchLength = newTouches.length;
    let newPoints = [];
    let currentTouches = $touches;
    for(let i = 0; i < newTouches.length; i++) {
      currentTouches[i].x = newTouches[i].clientX / canvas.clientWidth;
      currentTouches[i].y = newTouches[i].clientY / canvas.clientHeight;

      newPoints = [...newPoints, {x: newTouches[i].clientX, y: newTouches[i].clientY}];
    }

    springyPoints.set(newPoints);
    touches.set(currentTouches);
  }
  onMount(() => {
		const ctx = canvas.getContext('2d');
    const copyCtx = copy.getContext('2d');

    $: canvas.width  = canvas.clientWidth;
    $: canvas.height = canvas.clientHeight;

    $: copy.width  = canvas.clientWidth;
    $: copy.height = canvas.clientHeight;

    let frame;

    function loop() {
    	frame = requestAnimationFrame(loop);

      ctx.strokeStyle = "#4ecca3";
      copyCtx.strokeStyle = "#4ecca3";

      copyCtx.globalAlpha = .85;

      //clear copy canvas
      copyCtx.clearRect(0, 0, copy.width, copy.height);

      //copy drawing from display canvas to copy canvas
      copyCtx.drawImage(canvas, 0, 0);

      //clear display canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //copy old image from copy canvas to display canvas
      const zoomfactor = 0.9; //set whatever you want as zoom factor
      ctx.drawImage(copy, window.innerWidth * (1 - zoomfactor) / 2,  window.innerHeight * (1 - zoomfactor) / 2, zoomfactor * canvas.width, zoomfactor * canvas.height);

      //draw new lines
      ctx.beginPath();
      for(let i=0; i<touchLength.length; i++) {
        for(let j=i+1; j<touchLength.length; j++) {
          ctx.moveTo($springyPoints[i].x, $springyPoints[i].y);
          ctx.lineTo($springyPoints[j].x, $springyPoints[j].y);
        }
      }
      ctx.stroke();
    };

    loop();
  });
</script>


<ion-content scroll-y="false">
  <canvas id="canvas"
    on:touchstart|preventDefault={(event) => setTouchDryWet(1, event)}
    on:touchmove|preventDefault={updateTouchPositions}
    on:touchend|preventDefault={(event) => setTouchDryWet(0, event)}
    bind:this={canvas}
  ></canvas>
  <canvas style="display: none;" bind:this={copy}></canvas>
</ion-content>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
