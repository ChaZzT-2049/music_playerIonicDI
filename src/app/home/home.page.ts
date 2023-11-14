import { Component } from '@angular/core';
import { SharedProvider } from '../trackProvider';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(public trackProvider: SharedProvider) {
    this.getInfo();
  }

  url = 'https://deezerdevs-deezer.p.rapidapi.com/infos';
  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2e5ff2764msh658e6f9f45eea17p18c5dajsn13cae43fb8c9',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  country!: string;
  working!: boolean;
  albums = [{}];
  artists = [{}];
  contAlbums!: any;
  contArtists!: any;

  tracks: any[] = JSON.parse(localStorage.getItem("tracks") || "[]");

  getInfo = async () =>{
    try {
      const response = await fetch(this.url, this.options);
      const result = await response.json();
      this.country = result.country
      this.working = result.open
    } catch (error) {
      console.error(error);
    }
    
    this.tracks.forEach((track)=>{
      let id = track.album.id;
      this.albums[id] = this.albums[id] ;
    })

    this.contAlbums = Object.keys(this.albums).map((id) => {
      return { id: id};
    });

    this.tracks.forEach((track)=>{
      let id = track.artist.id;
      this.artists[id] = this.artists[id] ;
    })

    this.contArtists = Object.keys(this.artists).map((id) => {
      return { id: id};
    });
  }

}
