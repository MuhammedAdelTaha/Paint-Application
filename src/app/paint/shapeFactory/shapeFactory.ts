import { circleShape } from './circle';
import { rectangleShape } from './rectangle';
import {ellipseShape  } from './ellipse';
import { Shape } from './interface';
import {lineSegment } from './lineSegment';
import {triangleShape } from './triangle';
import {Injectable} from '@angular/core';
@Injectable({ providedIn: 'root' })
export abstract class ShapeFactory {
  constructor() {}
  public abstract factoryClass(
    id: string,
    name: string,
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
  ): Shape;
}
@Injectable({ providedIn: 'root' })
export class ShapCreator extends ShapeFactory {
  public factoryClass(
    id: string,
    name: string,
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
    draggable: boolean,
  ): any {
    let shape;
    switch (name) {
      case 'circle':
        shape = new circleShape(id,
            x,
            y,
            width,
            height,
            fillColor,
            stroke,
            strokeWidth,
            scaleX,scaleY,
            rotation,
            draggable);
        break;
      case 'rectangle':
        shape = new rectangleShape(id,
            x,
            y,
            width,
            height,
            fillColor,
            stroke,
            strokeWidth,
            scaleX,
            scaleY,
            rotation,
            draggable);
        break;
      case 'triangle':
        shape = new triangleShape(id,
            x,
            y,
            width,
            height,
            fillColor,
            stroke,
            strokeWidth,
            scaleX,scaleY,rotation,
            draggable);
        break;
      case 'ellipse':
        shape = new ellipseShape(id,
            x,
            y,
            width,
            height,
            fillColor,
            stroke,
            strokeWidth,
            scaleX,scaleY,
            rotation,
            draggable);
        break;
      case 'lineSegment':
        shape = new lineSegment(id,
            x,
            y,
            width,
            height,
            fillColor,
            fillColor,
            strokeWidth,
            scaleX,scaleY,
            rotation,
            draggable);
        break;
        case 'square':
          shape = new rectangleShape(id,
              x,
              y,
              width,
              width,
              fillColor,
              stroke,
              strokeWidth,
              scaleX,scaleY,rotation,
              draggable);
        break;
    }
    return shape;
  }
}
