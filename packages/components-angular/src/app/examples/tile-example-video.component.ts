import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tile-example-video',
  template: `
    <p-tile class="scheme-dark" [gradient]="'bottom'" [hoverEffect]="'zoom'">
      <video
        #video
        slot="background"
        src="http://localhost:3002/mood-porsche-gts.mp4"
        poster="http://localhost:3002/mood-porsche-gts.webp"
        autoplay
        loop
        [muted]="true"
        playsinline
        aria-hidden="true"
        (play)="isPaused = false"
        (pause)="isPaused = true"
      ></video>
      <p-heading slot="bottom" [tag]="'h3'" [size]="'md'" [weight]="'semibold'">GTS models</p-heading>
      <p-button
        slot="bottom"
        class="ms-auto relative z-2"
        [type]="'button'"
        [variant]="'secondary'"
        [icon]="isPaused ? 'play' : 'pause'"
        [hideLabel]="true"
        [compact]="true"
        (click)="onClick(video)"
      >
        {{ isPaused ? 'Play video' : 'Pause video' }}
      </p-button>
      <p-link
        slot="bottom"
        [variant]="'secondary'"
        [icon]="'arrow-right'"
        [hideLabel]="true"
        [compact]="true"
        [cover]="true"
      >
        <a href="#">GTS models</a>
      </p-link>
    </p-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TileExampleVideoComponent {
  // a video is paused until it plays, since its autoplay can be prevented, e.g. by the tile if the user prefers reduced
  // motion
  isPaused = true;

  onClick(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
