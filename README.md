# Feedback Modulator
This is a Progressive Web App noise instrument created with [Svelte](https://svelte.dev/), [Ionic 4 Components](https://ionicframework.com/docs/components), and [Tone.js](https://tonejs.github.io/). 

## Files of Interest
- The precompiled source files are in the [src folder](https://github.com/michaelbauchert/feedback-modulator/tree/master/src)

## Instrument Tab
Sound is created when the user touches the screen on the Instrument tab; the microphone and speaker create a feedback loop. The user controls several effects using the main tab as an XY pad. Each finger controls parameters of a different effect.

Interacting with the screen on this tab creates geometric visuals using the HTML canvas. The visualizations become more complex with each finger touching this screen.

## Effects Tab
### Toggling Between Effect Arangement Modes
Each finger controls an effect, which can be added, deleted, and rearranged in the Effects tab. Pressing the button on the top right toggles between 'Deletion' and 'Sorting' modes indicated by the trash and list icons respectively. In 'Deletion' mode, the user may delete an effect by swipping an effect to the left side of the screen. In the 'Sorting' mode, effects may be rearanging by touching and draging an effect to its desired point in the signal chain.

### Signal Flow and Control
Signal moves through each effect starting from the top of the effects list and moving down. The order fingers are placed on the 'Instruments' tab determines which finger controls each effect. First finger controls first effect, second finger controls second effect, etc.

### Adding Effects
Adding effects is done by clicking the + button in the lower left of the screen in the Effects Tab. This action brings up a modal window allowing the user to choose between the available effects. The new effect is appended to the bottom of the effect list upon selection.


