import Konva from 'konva';
import { Shape } from './interface';
export class ellipseShape implements Shape {
  structure: any;
  constructor
  (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    stroke: string,
    strokeWidth: number,
    scaleX:number,
    scaleY:number,
    rotation: number,
    draggable: boolean
  ) {
    this.structure = new Konva.Ellipse({
      name: 'ellipse',
      id: id,
      x: x,
      y: y,
      radiusX: Math.abs(width) / 2,
      radiusY: Math.abs(height) / 2,
      fill: fillColor,
      stroke: stroke,
      strokeWidth: strokeWidth,
      scaleX: scaleX,
      scaleY: scaleY,
      rotation:rotation,
      draggable: draggable,
    });
  }
  public get(): any {
    return this.structure;
  }
}
