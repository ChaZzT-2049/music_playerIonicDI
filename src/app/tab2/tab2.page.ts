import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {
    this.get()
  }
  tracksList!: any;

  get = () => {
    this.tracksList = []
    let tracks: [] = JSON.parse(localStorage.getItem("tracks") || "[]");
    this.tracksList = tracks
  }

}
