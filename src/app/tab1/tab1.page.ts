import { Component} from '@angular/core';
import { SharedProvider } from '../trackProvider';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public trackProvider :SharedProvider) {}

  url: string = "https://deezerdevs-deezer.p.rapidapi.com/track/";
  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2e5ff2764msh658e6f9f45eea17p18c5dajsn13cae43fb8c9',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  tracksApi = new Array;

  get = () => {
    this.tracksApi = []
    let tracks: [] = JSON.parse(localStorage.getItem("tracks") || "[]");
    this.tracksApi = tracks
  }

  setTrack(track: any){
    if(!this.trackProvider.cancion){
      this.trackProvider.cancion = track
      this.trackProvider.audio.src = this.trackProvider.cancion.preview
      this.trackProvider.audio.play();
    }else{
      if(this.trackProvider.cancion.id === track.id){
        if(this.trackProvider.audio.paused){
          this.trackProvider.audio.play();
        }else{
          this.trackProvider.audio.pause();
        }
      }else{
        this.trackProvider.cancion = track
        this.trackProvider.audio.src = track.preview
        this.trackProvider.audio.play();
      }
    }
  }

  ionViewWillEnter(){
    this.get();
  }

  randomTrack(){
    let tracks: [] = JSON.parse(localStorage.getItem("tracks") || "[]");
    let random = Math.floor(Math.random() * tracks.length)
    this.trackProvider.cancion = tracks[random]
    this.trackProvider.audio.src = this.trackProvider.cancion.preview
    this.trackProvider.audio.play();
  }
}
