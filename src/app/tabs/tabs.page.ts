import { Component } from '@angular/core';
import { SharedProvider } from '../trackProvider';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public trackProvider :SharedProvider) {
    this.tracker();
  }

  tracker(){
    this.trackProvider.audio.addEventListener('timeupdate', () => {
      this.trackProvider.current = this.trackProvider.audio.currentTime;
    }, false);
    this.trackProvider.audio.addEventListener("ended", () => {
      this.randomTrack();
    });
  }

  randomTrack(){
    let tracks: [] = JSON.parse(localStorage.getItem("tracks") || "[]");
    let random = Math.floor(Math.random() * tracks.length)
    this.trackProvider.cancion = tracks[random]
    this.trackProvider.audio.src = this.trackProvider.cancion.preview
    this.trackProvider.audio.play();
  }
}
