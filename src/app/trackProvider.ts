import { Injectable } from '@angular/core';

@Injectable()
export class SharedProvider {
    cancion: any;

    audio = new Audio("");

    current!: number;
}