import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class KonvaService {
  url = 'http://localhost:8080/paint';
  constructor(private http: HttpClient) {}
  create(
    id: string,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    stroke: string,
    strokeWidth: number,
    scaleX: number,
    scaleY: number,
    rotation: number,
    draggable: boolean
  ) {
    console.log(`${this.url}/add/${id}/${name}/${x}/${y}/${width}/${height}/${fillColor}/${stroke}/${strokeWidth}/${scaleX}/${scaleY}/${rotation}/${draggable}`);
    this.http
      .get(
        `${this.url}/add/${id}/${name}/${x}/${y}/${width}/${height}/${fillColor}/${stroke}/${strokeWidth}/${scaleX}/${scaleY}/${rotation}/${draggable}`
      ).subscribe();
  }
  colour(id: string, fillColor: string) {
    console.log(`${this.url}/color/${id}/${fillColor}`);
    this.http.get(`${this.url}/color/${id}/${fillColor}`).subscribe();
  }
  resize(id: string, scaleX: number, scaleY: number) {
    console.log(`${this.url}/resize/${id}/${scaleX}/${scaleY}`);
    this.http
      .get(`${this.url}/resize/${id}/${scaleX}/${scaleY}`)
      .subscribe();
  }
  rotate(id: string, rotation: number) {
    console.log(`${this.url}/rotate/${id}/${rotation}`);
    this.http.get(`${this.url}/rotate/${id}/${rotation}`).subscribe();
  }
  move(id: string, x: number, y: number) {
    console.log(`${this.url}/move/${id}/${x}/${y}`);
    this.http.get(`${this.url}/move/${id}/${x}/${y}`).subscribe();
  }
  remove(id: string) {
    console.log(`${this.url}/remove/${id}`);
    this.http.get(`${this.url}/remove/${id}`).subscribe();
  }
  saveJson(path: string, filename: string) {
    this.http.post(`${this.url}/saveJSON`,`${path}${filename}.json`).subscribe();
  }
  saveXML(path: string, filename: string) {
    this.http.post(`${this.url}/saveXML`,`${path}${filename}.xml`).subscribe();
  }
  loadJson(path: string) {
    return this.http.post(`${this.url}/LoadJSON`,`${path}.json`);
  }
  loadXML(path: string) {
    return this.http.post(`${this.url}/loadXML`,`${path}.xml`);
  }
  undo() {
    console.log(`${this.url}/undo`);
    return this.http.get(`${this.url}/undo`);
  }
  redo() {
    console.log(`${this.url}/redo`);
    return this.http.get(`${this.url}/redo`);
  }
}
