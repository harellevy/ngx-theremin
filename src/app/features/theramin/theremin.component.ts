import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { TheraminBase, ThereminService } from './theremin.service';

const RECOGNITION_THRESHOLD = .3;
// LA - The note A frequency
const REAL_TIME_FREQUENCY = 440;
// a division of 1/12 (each half tone), pow 2 is the log scale for each octave. first 440, second 880, 1760 etc)
const OCTAVE = Math.pow(2, 1 / 12);
// number of octaves to split view size
const NUM_OF_OCTAVES = 7;
// maximum volume wanted 0-1
const MAX_VOLUME = .3;
const MAX_X_VALUE = 600;
const MAX_Y_VALUE = 600;

@Component({
  selector: 'app-theremin',
  templateUrl: './theremin.component.html',
  styleUrls: ['./theremin.component.scss']
})
export class ThereminComponent implements OnInit, AfterViewInit {
  @ViewChild('video', {static: true}) video: ElementRef;
  cords: any =  {rightWrist: {}, leftWrist: {}};
  gain: any = {};
  frequency: any = {};
  model: posenet.PoseNet;
  audioModelRightHand: TheraminBase;
  audioModelLeftHand: TheraminBase;
  constructor(
    private thereminService: ThereminService
  ) { }

  async ngOnInit() {
    this.audioModelRightHand = await this.thereminService.initOsc();
    this.audioModelLeftHand = await this.thereminService.initOsc();
    this.model = await posenet.load();
    setInterval(async () => {
      const predictions = await this.model.estimateSinglePose(this.video.nativeElement, {flipHorizontal: true});
      this._prediction(predictions, 'rightWrist', this.audioModelRightHand);
      this._prediction(predictions, 'leftWrist', this.audioModelLeftHand);
      await tf.nextFrame();
    }, 80);
  }

  ngAfterViewInit() {
    const vid = this.video.nativeElement;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          vid.srcObject = stream;
        })
        .catch((err) => {
          console.log('Something not working!');
        });
    }
  }

  private _prediction(predictions: posenet.Pose, part: string, audioModel: TheraminBase) {
    const filteredPredictions = predictions.keypoints.filter(keyPoint => keyPoint.part === part && keyPoint.score > RECOGNITION_THRESHOLD);

    if (filteredPredictions && filteredPredictions[0]) {
      // calculate gain and frequency for this prediction
      this.cords[part].x = filteredPredictions[0].position.x;
      this.cords[part].y = filteredPredictions[0].position.y;
      this.gain[part] = (1 - (this.cords[part].y / MAX_Y_VALUE)) * MAX_VOLUME;
      this.frequency[part] = OCTAVE * (this.cords[part].x / MAX_X_VALUE * NUM_OF_OCTAVES) * REAL_TIME_FREQUENCY;
      this.thereminService.startNote(audioModel, this.gain[part], this.frequency[part]);
    } else {
      this.resetCords(part);
      this.resetFrequencyAndGain(part);
      this.thereminService.stopNote(audioModel);
    }
  }

  private resetFrequencyAndGain(part: string) {
    delete this.gain[part];
    delete this.frequency[part];
  }
  private resetCords(part: string) {
    if (this.cords && this.cords[part]) {
      this.cords[part] = {};
    }
  }
}
