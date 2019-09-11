<svelte:head>
	<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@4.9.0/dist/ionic/ionic.esm.js"></script>
	<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@4.9.0/dist/ionic/ionic.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core@4.9.0/css/ionic.bundle.css"/>
</svelte:head>

<svelte:window on:touchstart|once={startContext} on:touchend|once={startContext} on:click|once={startContext}/>

<script>
	import InstrumentTab from './InstrumentTab.svelte';
	import EffectsTab from './EffectsTab.svelte';
	import Tone from 'tone';

	function startContext(event) {
		Tone.start();
	}
</script>

<ion-app>
	<ion-tabs>
		<ion-tab tab="tab-instrument" >
			<InstrumentTab />
		</ion-tab>

		<ion-tab tab="tab-effects-routing" >
			<EffectsTab maxEffects="5"/>
		</ion-tab>

		<ion-tab-bar slot="bottom">
			<ion-tab-button tab="tab-instrument">
				<i class="material-icons">fiber_manual_record</i>
			</ion-tab-button>

			<ion-tab-button tab="tab-effects-routing">
				<i class="material-icons">stop</i>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
	<!--modal for editing effect parameters-->
	<ion-modal-controller></ion-modal-controller>
</ion-app>

<style>
	:root {
		--ion-background-color: var(--ion-color-dark);
		--ion-overlay-background-color: var(--ion-color-primary);
		--ion-tab-bar-border-color: var(--ion-color-tertiary);
		--ion-tab-bar-color: var(--ion-color-secondary);
		--ion-tab-bar-background: var(--ion-color-tertiary);


		--ion-color-primary: #4ecca3;
		--ion-color-primary-rgb: 78,204,163;
		--ion-color-primary-contrast: #000000;
		--ion-color-primary-contrast-rgb: 0,0,0;
		--ion-color-primary-shade: #45b48f;
		--ion-color-primary-tint: #60d1ac;

		--ion-color-secondary: #eeeeee;
		--ion-color-secondary-rgb: 238,238,238;
		--ion-color-secondary-contrast: #000000;
		--ion-color-secondary-contrast-rgb: 0,0,0;
		--ion-color-secondary-shade: #d1d1d1;
		--ion-color-secondary-tint: #f0f0f0;

		--ion-color-tertiary: #393e46;
		--ion-color-tertiary-rgb: 57,62,70;
		--ion-color-tertiary-contrast: #ffffff;
		--ion-color-tertiary-contrast-rgb: 255,255,255;
		--ion-color-tertiary-shade: #32373e;
		--ion-color-tertiary-tint: #4d5159;

		--ion-color-success: #10dc60;
		--ion-color-success-rgb: 16,220,96;
		--ion-color-success-contrast: #ffffff;
		--ion-color-success-contrast-rgb: 255,255,255;
		--ion-color-success-shade: #0ec254;
		--ion-color-success-tint: #28e070;

		--ion-color-warning: #ffce00;
		--ion-color-warning-rgb: 255,206,0;
		--ion-color-warning-contrast: #ffffff;
		--ion-color-warning-contrast-rgb: 255,255,255;
		--ion-color-warning-shade: #e0b500;
		--ion-color-warning-tint: #ffd31a;

		--ion-color-danger: #f35d80;
		--ion-color-danger-rgb: 243,93,128;
		--ion-color-danger-contrast: #000000;
		--ion-color-danger-contrast-rgb: 0,0,0;
		--ion-color-danger-shade: #d65271;
		--ion-color-danger-tint: #f46d8d;

		--ion-color-dark: #232931;
		--ion-color-dark-rgb: 35,41,49;
		--ion-color-dark-contrast: #ffffff;
		--ion-color-dark-contrast-rgb: 255,255,255;
		--ion-color-dark-shade: #1f242b;
		--ion-color-dark-tint: #393e46;

		--ion-color-medium: #989aa2;
		--ion-color-medium-rgb: 152,154,162;
		--ion-color-medium-contrast: #ffffff;
		--ion-color-medium-contrast-rgb: 255,255,255;
		--ion-color-medium-shade: #86888f;
		--ion-color-medium-tint: #a2a4ab;

		--ion-color-light: #f4f5f8;
		--ion-color-light-rgb: 244,244,244;
		--ion-color-light-contrast: #000000;
		--ion-color-light-contrast-rgb: 0,0,0;
		--ion-color-light-shade: #d7d8da;
		--ion-color-light-tint: #f5f6f9;
	}
</style>
