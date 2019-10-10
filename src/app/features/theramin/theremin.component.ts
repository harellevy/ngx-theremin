import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

const REAL_TIME_FREQUENCY = 440;
const maxXValue = 600;
const maxYValue = 600;
@Component({
  selector: 'app-theremin',
  templateUrl: './theremin.component.html',
  styleUrls: ['./theremin.component.scss']
})
export class ThereminComponent implements OnInit, AfterViewInit {
  @ViewChild('video', {static: true}) video: ElementRef;
  predictions: any;
  x: number;
  y: number;
  gain: number;
  frequency: number;
  model: any;
  loading = true;
  audioOn = false;
  constructor() { }

  async ngOnInit() {
    const audioContext = new AudioContext();
    const myOscillator = audioContext.createOscillator();
    myOscillator.start();
    const gain = audioContext.createGain();
    gain.gain.value = 0;
    myOscillator.connect(gain);
    gain.connect(audioContext.destination);
    console.log('loading mobilenet model...');
    this.model = await posenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;

    setInterval(async () => {

      const pre = await this.model.estimateSinglePose(this.video.nativeElement, {flipHorizontal: true});
      this.predictions = pre.keypoints.filter(keyPoint => keyPoint.part === 'rightWrist' && keyPoint.score > 0.5);

      if (this.predictions && this.predictions[0]) {
        this.x = this.predictions[0].position.x;
        this.y = this.predictions[0].position.y;
        myOscillator.frequency.value = this.frequency = Math.pow(2, 1 / 12) * (this.x / maxXValue * 6) * REAL_TIME_FREQUENCY;
        gain.gain.value = this.gain = 1 - (this.y / maxYValue);
      } else {
        gain.gain.value = 0;
      }
      await tf.nextFrame();
    }, 50);
  }


  async ngAfterViewInit() {
    const vid = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          vid.srcObject = stream;

        })
        .catch((err) => {
          console.log('Something went wrong!');
        });
    }
  }

}
