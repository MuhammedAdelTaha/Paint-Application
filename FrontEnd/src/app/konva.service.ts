import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class KonvaService {
  url = 'http://localhost:8080/paint';
  constructor(private http: HttpClient) {}
  addShape (
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
  colorShape(id: string, fillColor: string) {
    console.log(`${this.url}/color/${id}/${fillColor}`);
    this.http.get(`${this.url}/color/${id}/${fillColor}`).subscribe();
  }
  resizeShape(id: string, scaleX: number, scaleY: number) {
    console.log(`${this.url}/resize/${id}/${scaleX}/${scaleY}`);
    this.http
      .get(`${this.url}/resize/${id}/${scaleX}/${scaleY}`)
      .subscribe();
  }
  rotateShape(id: string, rotation: number) {
    console.log(`${this.url}/rotate/${id}/${rotation}`);
    this.http.get(`${this.url}/rotate/${id}/${rotation}`).subscribe();
  }
  moveShape(id: string, x: number, y: number) {
    console.log(`${this.url}/move/${id}/${x}/${y}`);
    this.http.get(`${this.url}/move/${id}/${x}/${y}`).subscribe();
  }
  removeShape(id: string) {
    console.log(`${this.url}/remove/${id}`);
    this.http.get(`${this.url}/remove/${id}`).subscribe();
  }

  clearShapes() {
    console.log(`${this.url}/clear`);
    this.http.get(`${this.url}/clear`).subscribe();
  }

  undoAction() {
    console.log(`${this.url}/undo`);
    return this.http.get(`${this.url}/undo`);
  }

  redoAction() {
    console.log(`${this.url}/redo`);
    return this.http.get(`${this.url}/redo`);
  }

  saveJSON(path: string, filename: string) {
    this.http.post(`${this.url}/saveJSON`,`${path}${filename}.json`).subscribe();
  }
  saveXML(path: string, filename: string) {
    this.http.post(`${this.url}/saveXML`,`${path}${filename}.xml`).subscribe();
  }
  loadJSON(path: string) {
    return this.http.post(`${this.url}/LoadJSON`,`${path}.json`);
  }
  loadXML(path: string) {
    return this.http.post(`${this.url}/loadXML`,`${path}.xml`);
  }
}
