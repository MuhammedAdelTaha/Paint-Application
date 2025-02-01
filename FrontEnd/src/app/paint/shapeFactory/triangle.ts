import Konva from 'konva';
import { Shape } from './interface';
export class triangleShape implements Shape {

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
    rotation:number,
    draggable: boolean
  ) {
    this.structure = new Konva.RegularPolygon({
      name: 'triangle',
      id: id,
      x: x,
      y: y,
      sides: 3,
      radius: Math.abs(width),
      fill: fillColor,
      stroke: stroke,
      strokeWidth: strokeWidth,
      scaleX:scaleX,
      scaleY:scaleY,
      rotation:rotation,
      draggable: draggable
    });
  }
  public get(): any {
    return this.structure;
  }
}
