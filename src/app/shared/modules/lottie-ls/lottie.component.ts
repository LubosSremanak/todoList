import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnimationItem, AnimationSegment } from 'lottie-web';
import { LottieAnimationsService } from './service/lottie-animations.service';

@Component({
  selector: 'app-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieComponent implements OnInit, OnDestroy {
  @Input() lottieId: string | null;
  @Input() path: string | null;
  @Input() loop: boolean | null;
  @Input() autoPlay: boolean | null;
  @Input() hoverPlay: boolean | null;
  @Input() width: string | null;
  @Input() height: string | null;
  @Input() initSegments: AnimationSegment | undefined;
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private lottieService: LottieAnimationsService) {
    this.lottieId = null;
    this.path = null;
    this.loop = false;
    this.autoPlay = false;
    this.hoverPlay = false;
    this.width = null;
    this.height = null;
    this.initSegments = undefined;
  }

  private _animation: AnimationItem | undefined;

  get animation(): AnimationItem {
    return <AnimationItem>this._animation;
  }

  private _animationOptions: any;

  get animationOptions(): any {
    return this._animationOptions;
  }

  ngOnDestroy(): void {
    this.lottieService.removeAnimationById(this.lottieId);
  }

  ngOnInit(): void {
    this._animationOptions = {
      path: this.path,
      loop: this.loop,
      autoplay: this.autoPlay,
    };
    if (!this.lottieId) {
      this.lottieId = String(this.lottieService.length);
      console.warn('New id', this.lottieId);
    }
    if (!this.path) {
      throw new Error('"path" can\'t be empty!');
    }
    this.lottieService.createLottie(this.lottieId, this.animationOptions);
  }

  animationCreated(animationItem: AnimationItem): void {
    this._animation = animationItem;
    if (this.initSegments) {
      animationItem.setSegment(this.initSegments[0], this.initSegments[1]);
    }
    this.animation.setSubframe(false);
    this.lottieService.addAnimationReference(this.lottieId!, this.animation);
    this.isLoaded.emit(true);
  }

  onHover(): void {
    if (this.lottieId && this.hoverPlay) {
      if (!this.initSegments) {
        this.initSegments = [0, this.animation.totalFrames];
      }

      const segments = this.initSegments as AnimationSegment;
      this.lottieService.playAnimationInRange(this.lottieId, segments);
    }
  }
}
