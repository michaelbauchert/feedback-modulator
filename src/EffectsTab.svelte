<script>
  import AudioEffect from './AudioEffect.svelte';
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
      mic.connect(effect);

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
  }

  let controller;
  function openEffectSelection() {
    controller.create({
        buttons: [{
        text: '├',
        handler: () => {
          appendEffect('highpass');
        }
      }, {
        text: '┤',
        handler: () => {
          appendEffect('lowpass');
        }
      }, {
        text: '╫',
        handler: () => {
          appendEffect('reverb');
        }
      }, {
        text: '║',
        handler: () => {
          appendEffect('delay');
        }
      }, {
        text: '╧',
        handler: () => {
          appendEffect('distortion');
        }
      }, {
        text: '╪',
        handler: () => {
          appendEffect('pitchshift');
        }
      }, {
        text: '‡',
        handler: () => {
          appendEffect('ringmod');
        }
      }, {
        text: 'X',
        role: 'cancel'
      }]
    }).then(actionSheet => {
      actionSheet.cssClass = "effect-selection";
      actionSheet.present();
    });
  }

  function appendEffect(chosenEffect) {
    effects = [...effects, {name : chosenEffect, effect : availableEffects[chosenEffect].getEffect(), x : 0, y : 0}];
  }//end appendEffect
</script>

<ion-content scroll-y="false">
  <ion-toolbar>
    <ion-buttons slot="start">
      <!--
        <ion-icon slot="icon-only" name="information-circle-outline" color="primary"></ion-icon>
        <ion-icon slot="icon-only" name="card" color="primary"></ion-icon>
      -->
    </ion-buttons>
    <ion-buttons slot="end">
      <!--Button to toggle between Reordering and Deletion Modes-->
      <ion-button on:click={() => reorder = !reorder}>
        <ion-icon slot="icon-only" size="large" name={reorder ? 'reorder' : 'trash'} color="primary"></ion-icon>
      </ion-button>

    </ion-buttons>
  </ion-toolbar>
  <div class="center-effects">
    <ion-reorder-group id="effects" slot="fixed" disabled={!reorder} on:ionItemReorder={({detail}) => effects = detail.complete(effects)}>
      {#each effects as effect, i}
        <AudioEffect {...effect} index={i} on:remove={() => removeEffect(effect)} reorder={reorder}/>
      {/each}
    </ion-reorder-group>
  </div>

  <ion-action-sheet-controller bind:this={controller}></ion-action-sheet-controller>
  <!-- fab placed to the bottom end -->
  <ion-fab vertical="bottom" horizontal="end" slot="fixed" >
    <ion-fab-button on:click={openEffectSelection} disabled={fabButton}><span class="fab-text" >+</span></ion-fab-button>
  </ion-fab>
</ion-content>

<style>
  ion-reorder-group {
    width: 100%;
  }

  .center-effects {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    top: 0;
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
</style>
