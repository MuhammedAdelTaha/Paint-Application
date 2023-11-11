import Konva from 'konva';
import { Shape } from './interface';
export class lineSegment implements Shape {
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
    this.structure = new Konva.Line({
      name: 'lineSegment',
      id: id,
      points: [x, y, width, height],
      stroke: stroke,
      strokeWidth: strokeWidth,
      lineCap: 'round',
      lineJoin: 'round',
      draggable: draggable,
      scaleX: scaleX,
      scaleY: scaleY,
      fillColor: fillColor,
      rotation:rotation,
    });
  }
  public get(): any {
    return this.structure;
  }
}
