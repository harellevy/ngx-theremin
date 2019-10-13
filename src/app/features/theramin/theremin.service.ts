import { Injectable } from '@angular/core';
export interface TheraminBase {
  ctx: AudioContext;
  gain: GainNode;
  osc: OscillatorNode;
}
@Injectable({
  providedIn: 'root'
})
export class ThereminService {
  constructor() { }

  async initOsc(): Promise<TheraminBase> {
    const audioContext = new AudioContext();
    const myOscillator = audioContext.createOscillator();
    myOscillator.start();
    const gain = audioContext.createGain();
    gain.gain.value = 0;
    myOscillator.connect(gain);
    gain.connect(audioContext.destination);
    return {
      ctx: audioContext,
      gain: gain,
      osc: myOscillator
      };
  }
  startNote(model: TheraminBase, gain, detune) {
    model.osc.detune.value = detune;
    model.gain.gain.value = gain;
  }
  stopNote(model: TheraminBase) {
    model.gain.gain.value = 0;
  }
}
