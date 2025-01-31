import Konva from 'konva';
import { Shape } from './interface';

export class circleShape implements Shape {
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
    scaleX: number,
    scaleY: number,
    rotation: number,
    draggable: boolean
  ) {
    this.structure = new Konva.Circle({
      name: 'circle',
      id: id,
      x: x,
      y: y,
      radius: Math.abs(width) / 2,
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
