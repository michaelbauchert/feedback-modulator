<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { touches } from './touch store.js';

  const effectParams = {
    highpass:
    {
      xParam: function() {return effect.Q;},
      xScale: function(x) {return x * 6;},
      yParam: function() {return effect.frequency;},
      yScale: function(y) {return Math.pow(y, 5) * 20000;}
    },
    lowpass:
    {
      xParam: function() {return effect.Q;},
      xScale: function(x) {return x * 6;},
      yParam: function() {return effect.frequency;},
      yScale: function(y) {return Math.pow(y, 5) * 20000;}
    },
    delay:
    {
      xParam: function() {return effect.feedback;},
      xScale: function(x) {return x;},
      yParam: function() {return effect.delayTime;},
      yScale: function(y) {return y * 3;}
    },
    reverb:
    {
      xParam: function() {return effect.dampening;},
      xScale: function(x) {return Math.pow(x, 5) * 20000;},
      yParam: function() {return effect.roomSize;},
      yScale: function(y) {return y;}
    },
    tremelo:
    {
      xParam: function() {return effect.depth;},
      xScale: function(x) {return x;},
      yParam: function() {return effect.frequency;},
      yScale: function(y) {return Math.pow(y, 5) * 500;}
    },
    vibrato:
    {
      xParam: function() {return effect.depth;},
      xScale: function(x) {return x;},
      yParam: function() {return effect.frequency;},
      yScale: function(y) {return Math.pow(y, 5) * 500;}
    }
  };


  export let name;
  export let effect;
  export let index;
  export let shrink = false;
  export let reorder = false;

  //hook up effects to touches
  //~~~~~~~~~~~~~~~~~~~~~~~~~~
  let xParam = new Tone.Signal();
  let YParam = new Tone.Signal();

  $: {
    xParam.disconnect();
    xParam.connect(effectParams[name].xParam());

    yParam.disconnect();
    yParam.connect(effectParams[name].yParam());
  }

  $: x = effectParams[name].xScale($touches[index].x);
  $: y = effectParams[name].yScale($touches[index].y);

  $: xParam.rampTo(x);
  $: yParam.rampTo(y);
  $: effect.wet.rampTo($touches[index].wet, 0.01);
  //~~~~~~~~~~~~~~~~~~~~~~~~~~


  //handle removal animation then dispatch event when finished
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	const dispatch = createEventDispatcher();

  let ionItemSliding;

  let swipe = false;
  $: if(shrink) {
    swipe = true;
    xParam.dispose();
    yParam.dispose();
    setTimeout( () => dispatch('remove'), 500);
    ionItemSliding.closeOpened();
  } else {
    swipe = false;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  //randomize duration of shake animation
  let button;
  onMount(() => {
    button.setAttribute("style", `animation-duration: ${Math.random() * 0.6 + 0.7}s;`);
  });
</script>

<ion-reorder>
  <ion-item-sliding bind:this={ionItemSliding} class:shrink>
      <ion-item lines="none" class:swipe>
        <div class="center-button">
          <ion-button
            bind:this={button}
            size="large"
            class:reorder
            shape="round"
          >{name}</ion-button>
        </div>
      </ion-item>

    <ion-item-options side="end" on:ionSwipe={() => shrink = true}>
      <ion-item-option type="button" expandle color="danger">
        <ion-icon name="close" slot="icon-only" color="dark"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</ion-reorder>

<style>
  :root {
  	--symbol-button: 56px;
  }

  .center-button{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    width: var(--symbol-button);
    height: var(--symbol-button);
    margin: calc(var(--symbol-button) / 9);
    font-size: calc(var(--symbol-button) / 3);
    text-align: center;


    box-shadow: inset -5px -7px 10px var(--ion-color-dark-tint);

    border-radius: 50%;
    border: 0px;
  }

  ion-button {
    --background: var(--ion-color-primary) !important;
    --background-activated: var(--ion-color-primary) !important;
  }

  ion-item-options {
    background-color: var(--ion-color-danger);
  }

  .fade-out {
    animation-name: fade;
    animation-delay: .1s;
    animation-duration: .3s;
    animation-fill-mode: forwards;
  }

  @keyframes fade {
    from {opacity: 1;}
    to {opacity: 0;}
  }

  .swipe {
    animation-name: gradientSlide;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  @keyframes gradientSlide {
    from {transform: translate3d(-50vw, 0px, 0px);}
    to {transform: translate3d(-100vw, 0px, 0px);}
  }

  ion-item-sliding {
    height: calc(var(--symbol-button) * 1.14);
  }

  .shrink {
    transition: height 0.4s;
    height: 0vh;
  }

  /*shake animation thats applied to the effect buttons when reorder mode is engauged*/
  @keyframes spaceboots {
  	0% { transform: translate(2px, 1px) rotate(0deg); }
  	10% { transform: translate(-1px, -2px) rotate(-1deg); }
  	20% { transform: translate(-3px, 0px) rotate(1deg); }
  	30% { transform: translate(0px, 2px) rotate(0deg); }
  	40% { transform: translate(1px, -1px) rotate(1deg); }
  	50% { transform: translate(-1px, 2px) rotate(-1deg); }
  	60% { transform: translate(-3px, 1px) rotate(0deg); }
  	70% { transform: translate(2px, 1px) rotate(-1deg); }
  	80% { transform: translate(-1px, -1px) rotate(1deg); }
  	90% { transform: translate(2px, 2px) rotate(0deg); }
  	100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .reorder{
  	animation-name: spaceboots;
  	/*animation-duration: 0.8s; Set with JS*/
  	transform-origin:50% 50%;
  	animation-iteration-count: infinite;
  	animation-timing-function: linear;
  }
</style>
