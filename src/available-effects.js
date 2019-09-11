import Tone from 'tone';

export const availableEffects = {
  highpass:
  {
    symbol: 'Highpass',
    getEffect: function() {return new Tone.Filter (0, 'highpass');},
    xParam: function() {return effect.Q;},
    xScale: function(x) {return x * 6;},
    yParam: function() {return effect.frequency;},
    yScale: function(y) {return Math.pow(y, 5) * 20000;}
  },
  lowpass:
  {
    symbol: 'Lowpass',
    getEffect: function() {return new Tone.Filter (20000, 'lowpass');},
    xParam: function() {return effect.Q;},
    xScale: function(x) {return x * 6;},
    yParam: function() {return effect.frequency;},
    yScale: function(y) {return Math.pow(y, 5) * 20000;}
  },
  delay:
  {
    symbol: 'Delay',
    getEffect: function() {return new Tone.FeedbackDelay ();},
    xParam: function() {return effect.feedback;},
    xScale: function(x) {return x;},
    yParam: function() {return effect.delayTime;},
    yScale: function(y) {return y * 3;}
  },
  reverb:
  {
    symbol: 'Reverb',
    getEffect: function() {return new Tone.Freeverb();},
    xParam: function() {return effect.dampening;},
    xScale: function(x) {return Math.pow(x, 5) * 20000;},
    yParam: function() {return effect.roomSize;},
    yScale: function(y) {return y;}
  },
  tremelo:
  {
    symbol: 'Tremelo',
    getEffect: function() {return new Tone.Tremolo ();},
    xParam: function() {return effect.depth;},
    xScale: function(x) {return x;},
    yParam: function() {return effect.frequency;},
    yScale: function(y) {return Math.pow(y, 5) * 500;}
  },
  vibrato:
  {
    symbol: 'Vibrato',
    getEffect: function() {return new Tone.Vibrato ();},
    xParam: function() {return effect.depth;},
    xScale: function(x) {return x;},
    yParam: function() {return effect.frequency;},
    yScale: function(y) {return Math.pow(y, 5) * 500;}
  }
};
