<script>
  import AudioEffect from './AudioEffect.svelte';
  import Toolbar from './Toolbar.svelte';
  import Tone from 'tone';

  const availableEffects = {
    /*highpass: {
      symbol: 'Highpass',
      getEffect: function() {return new Tone.Filter (0, 'highpass');}
    },
    lowpass:
    {
      symbol: 'Lowpass',
      getEffect: function() {return new Tone.Filter (20000, 'lowpass');}
    },*/
    delay:
    {
      symbol: 'Delay',
      getEffect: function() {return new Tone.FeedbackDelay ();}
    },
    reverb:
    {
      symbol: 'Reverb',
      getEffect: function() {return new Tone.Freeverb();}
    },
    tremelo:
    {
      symbol: 'Tremelo',
      getEffect: function() {return new Tone.Tremolo ();}
    },
    vibrato:
    {
      getEffect: function() {return new Tone.Vibrato ();}
    }
  };


  export let maxEffects = 5;
  $: fabButton = effects.length < maxEffects ? false : true;

  let effects = [
    /*{name : "highpass", effect : availableEffects["highpass"].getEffect(), shrink: false},
    {name : "lowpass", effect : availableEffects["lowpass"].getEffect(), shrink: false},*/
    {name : "tremelo", effect : availableEffects["tremelo"].getEffect(), shrink: false},
    {name : "delay", effect : availableEffects["delay"].getEffect(), shrink: false},
    {name : "reverb", effect : availableEffects["reverb"].getEffect(), shrink: false},
    {name : "vibrato", effect : availableEffects["vibrato"].getEffect(), shrink: false}
  ];

  const mic = new Tone.UserMedia();
  mic.open();

  //reorder effects every time they're updated
  $: effects.forEach(function(effect, i) {
    if(i == 0)
      //mic.connect(effect);

    if(i != effects.length - 1) {
      effect.effect.disconnect();
      effect.effect.connect(effects[i + 1].effect);
    } else {
      effect.effect.toMaster();
    }
  });

  let reorder = false;

  function removeEffect(effect) {
    effect.effect.dispose();
    effects = effects.filter(t => t !== effect);
  }//end removeEffect

  //create action sheet with buttons to add each available effect
  let controller;
  function openEffectSelection() {
    let controllerButtons = [];

    for (let effect in availableEffects) {
      let newButton = {
        text: effect,
        handler: () => {addNewEffect(effect)}
      };
      controllerButtons.push(newButton);
    }//end for

    console.log(controllerButtons);

    controller.create({
      buttons: [...controllerButtons, {text: 'X', role: 'cancel'}]
    }).then(actionSheet => {
      actionSheet.cssClass = "effect-selection";
      actionSheet.present();
    });//end controller.create
  }//end openEffectSelection

  function addNewEffect(effect) {
    effects = [...effects, {name : effect,
                            effect : availableEffects[effect].getEffect(),
                            shrink: false}];
  }//end addNewEffect
</script>

<ion-content scroll-y="false" forceOverscroll="true">
  <Toolbar/>

  <!-- Button to Toggle Between Reorder and Trash Modes -->
  <ion-fab vertical="top" horizontal="end" slot="fixed" >
    <ion-fab-button id="toggle" class:reorder on:click={() => reorder = !reorder}>
      <ion-icon name={reorder ? 'reorder' : 'trash'}></ion-icon>
    </ion-fab-button>
  </ion-fab>

  <!-- Container of Currently Active Effects -->
  <div class="center-effects">
    <ion-reorder-group id="effects" slot="fixed" disabled={!reorder} on:ionItemReorder={({detail}) => effects = detail.complete(effects)}>
      {#each effects as effect, i}
        <AudioEffect {...effect} index={i} on:remove={() => removeEffect(effect)} reorder={reorder}/>
      {/each}
    </ion-reorder-group>
  </div>

  <!-- Controller and Button Add New Effects-->
  <ion-action-sheet-controller bind:this={controller}></ion-action-sheet-controller>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed" >
    <ion-fab-button on:click={openEffectSelection} disabled={fabButton}><span class="fab-text" >+</span></ion-fab-button>
  </ion-fab>

</ion-content>

<style>
  ion-reorder-group {
    width: 100%;
  }

  .center-effects {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 53px);
    width: 100%;
  }

  ion-fab-button {
    font-size: xx-large;
  }

  .effect-selection .action-sheet-button-inner {
        font-size: xx-large;
        justify-content: center;
        background-color: var(--ion-color-dark);
        color: transparent;
        text-shadow: 1px 1px 1px rgba(var(--ion-color-primary-rgb), 0.8);
        -webkit-background-clip: text;
           -moz-background-clip: text;
                background-clip: text;

    /*box-shadow: 1px -1px 0 var(--ion-color-primary-shade),
                2px -2px 0 var(--ion-color-primary-shade),
                3px -3px 0 var(--ion-color-primary-shade),
                4px -4px 0 var(--ion-color-primary-shade),
                5px -5px 0 var(--ion-color-primary-shade),
                6px -6px 0 var(--ion-color-primary-shade);*/

  }

  .effect-selection .action-sheet-button {
    box-shadow: 1px 1px 1px rgba(var(--ion-color-primary-rgb), 0.8);
  }

  .draggable--original > button {
    display: none;
  }

  .disable-element {
    display: none;
  }

  #toggle {
    --background: var(--ion-color-dark);
    --color: var(--ion-color-danger);
    --color-activated: var(--ion-color-danger);

    --background-hover: var(--ion-color-danger);
    --color-hover: var(--ion-color-dark);
  }

  .reorder {
    --color: var(--ion-color-primary) !important;
    --color-activated: var(--ion-color-primary) !important;
    --background-hover: var(--ion-color-primary) !important;
  }
</style>
