import Konva from 'konva';
import { Shape } from './interface';
export class rectangleShape implements Shape {
  structure: any;
  constructor(
    id: string,
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
    this.structure = new Konva.Rect({
      name: 'rectangle',
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fillColor,
      stroke: stroke,
      scaleX: scaleX,
      scaleY: scaleY,
      strokeWidth: strokeWidth,
      rotation:rotation,
      draggable: draggable,
    });
  }
  public get(): any {
    return this.structure;
  }
}
