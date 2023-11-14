import { Component  } from '@angular/core';
import { SharedProvider } from '../trackProvider';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public trackProvider: SharedProvider, private alertController: AlertController) {}

  url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2e5ff2764msh658e6f9f45eea17p18c5dajsn13cae43fb8c9',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  search: string = "";
  total!: number;
  results!: any;

  nextResults!: string;
  prevResults!: string;

  setButtons = (value: string, type: string) =>{
    if(value){
      if(type === "next"){
        this.nextResults = value.slice(32)
      }else{
        this.prevResults = value.slice(32)
      }
    }
  }

  get = async(params:string) => {
    window.scrollTo({top:0,behavior:'smooth'});
    this.nextResults = ""
    this.prevResults = ""
    try {
      const response = await fetch(this.url + params, this.options);
      const result = await response.json();
      this.results = result.data;
      this.total = result.total;
      this.setButtons(result.next, "next")
      this.setButtons(result.prev, "prev")
    } catch (error) {
      console.error(error);
    }
  }

  playPreview(track: any){
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


    this.trackProvider.audio.addEventListener('timeupdate', () => {
      this.trackProvider.current = this.trackProvider.audio.currentTime;
    }, false);
  }

  async existAlert() {
    const alert = await this.alertController.create({
      header: 'Ya Existe',
      subHeader: 'La cancion ya se encuentra en tu lista',
      message: 'Agrega otras canciones',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  async addedAlert(){
    const alert = await this.alertController.create({
      header: 'Agregada',
      subHeader: 'Cancion agregada exitosamente.',
      message: 'Agrega otras canciones',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async add (track: any){
    let tracks: any[] = JSON.parse(localStorage.getItem("tracks") || "[]");
    if(!tracks.some(t => t.id === track.id)){
      tracks.push(track)
      localStorage.setItem("tracks", JSON.stringify(tracks));
      this.addedAlert()
    }else{
      this.existAlert()
    }
  }
}
