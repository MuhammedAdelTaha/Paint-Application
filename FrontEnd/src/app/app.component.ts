import { Component, OnInit } from '@angular/core';
import { KonvaService } from './konva.service';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { ShapeCreator } from './paint/shapeFactory/shapeFactory';

import { View } from './paint/view';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  title = 'painter';
  color!: any;
  id!: number;
  fileExtension!: string;
  shapeObject: any;
  tr: any;
  shapeFactory: any;
  stage!: Stage;
  view!: View;
  currentShape!: string;
  Services: any;

  constructor(factory: ShapeCreator, service: KonvaService) {
    this.shapeFactory = factory;
    this.Services = service;
  }

  ngOnInit() {
    this.id = 0;
    this.color = '#ffffff';
    this.currentShape = '0';

    // Create a stage and add two layers.
    this.view = new View();
    this.view.staticLayer = new Layer();
    this.view.dynamicLayer = new Layer();

    // Add the layers to the stage.
    this.stage = new Stage({
      container: 'board',
      width: 1470 * (38 / 46),
      height: 700 * (44 / 46),
    });
    this.stage.add(this.view.staticLayer, this.view.dynamicLayer);

    // Add the transformer to the stage.
    this.tr = new Konva.Transformer();
    this.view.staticLayer.add(this.tr);
    this.view.dynamicLayer.add(this.tr);

    // Creating the event listeners.
    this.createListeners();
  }

  private createListeners() {
    const component = this;

    // Stage click handler.
    this.stage.on('click tap', function (e) {
      if (e.target == component.stage) {
        component.tr.nodes([]);
        return;
      }
      e.target.draggable(true);
      component.tr.nodes([e.target]);
    });

    // Track the initial state to determine what changed.
    let initialRotation: number;
    let initialScale: { x: number; y: number };

    // Transform start handler.
    this.tr.on('transformstart', function(e: any) {
      const shape = e.target;
      initialRotation = shape.rotation();
      initialScale = {
        x: shape.scaleX(),
        y: shape.scaleY()
      };
    });

    // Transform end handler.
    this.tr.on('transformend', function(e: any) {
      const shape = e.target;
      component.currentShape = shape.id();

      if (shape) {
        // Calculate changes
        const scaleXDiff = Math.abs(shape.scaleX() - initialScale.x);
        const scaleYDiff = Math.abs(shape.scaleY() - initialScale.y);
        const rotationDiff = Math.abs(shape.rotation() - initialRotation);

        // Define thresholds for significant changes
        const SCALE_THRESHOLD = 0.001; // scale difference
        const ROTATION_THRESHOLD = 0.1;  // degrees

        // Check if the scale changed significantly
        if (scaleXDiff > SCALE_THRESHOLD || scaleYDiff > SCALE_THRESHOLD) {
          component.Services.resizeShape(
            shape.id(),
            shape.scaleX(),
            shape.scaleY()
          );
          console.log('Resize Complete:', {
            id: shape.id(),
            scaleX: shape.scaleX(),
            scaleY: shape.scaleY()
          });
        }

        // Check if rotation changed significantly
        if (rotationDiff > ROTATION_THRESHOLD) {
          component.Services.rotateShape(shape.id(), shape.rotation());
          console.log('Rotation Complete:', {
            id: shape.id(),
            rotation: shape.rotation()
          });
        }

        shape.draggable(false);
      }
    });

    // Drag and drop handler.
    this.view.staticLayer.on('dragend', function(e:any){
      console.log('dragend');
      component.currentShape = e.target.attrs.id;
      let shape = component.stage.findOne('#' + component.currentShape);
      shape.moveToTop();
      component.Services.moveShape(shape.id(),(shape.attrs.x).toFixed(3),(shape.attrs.y).toFixed(3));
      console.log(shape.id(),shape.x(),shape.y(),shape.scaleX(),shape.scaleY(),shape.rotation());
      e.target.draggable(false);
    });

    // Mouse down handler.
    this.stage.on('mousedown', (event: any) => {
      if (event.target.attrs.id == undefined) {
        console.log('undefined');
        return;
      } else {
        this.currentShape = event.target.attrs.id;
        let shape = this.stage.findOne('#' + this.currentShape);
        shape.moveToTop();
        console.log('@' + this.currentShape);
        this.color = shape.attrs.fill;
      }
    });
  }

  add(shape: string) {
    this.shapeObject = this.shapeFactory.factoryClass(
      this.id.toString(),
      shape,
      this.stage.width() / 2,
      this.stage.height() / 2,
      200,
      100,
      '#ffffff',
      '#000000',
      3,
      1,
      1,
      0,
      false
    ).get();

    const shapeName = this.shapeObject.attrs.name;
    let strokeColor:string = '#ffffff';
    if (shapeName == "lineSegment")
      strokeColor = this.shapeObject.attrs.stroke = '#000000';

    this.view.staticLayer.add(this.shapeObject);
    this.Services.addShape(
      this.id.toString(),
      shape,
      this.stage.width() / 2,
      this.stage.height() / 2,
      200,
      100,
      strokeColor.substring(1),
      '000000',
      3,
      1,
      1,
      0,
      false
    );
    this.id = this.id + 1;
  }

  copy() {
    console.log('copy');
    let shape = this.stage.findOne('#' + this.currentShape);
    let copy = shape.clone();
    copy.x(shape.attrs.x + 20);
    copy.id(this.id.toString());
    this.view.staticLayer.add(copy);
    this.Services.addShape(
      copy.id(),
      copy.name(),
      copy.x(),
      copy.y(),
      copy.width(),
      copy.height(),
      copy.fill().substring(1),
      copy.stroke().substring(1),
      copy.strokeWidth(),
      copy.scaleX(),
      copy.scaleY(),
      copy.rotation(),
      false,
    );
    this.id = this.id + 1;
  }

  delete() {
    console.log(' deleting ' + this.currentShape);
    this.Services.removeShape(this.currentShape);
    this.stage.findOne('#' + this.currentShape).remove();
  }

  undo() {
    this.Services.undoAction().subscribe((x: any) => {
      x = JSON.stringify(x);
      x = x.substring(10);
      x = x.substring(0, x.length - 1);
      x = JSON.parse(x);
      this.ngOnInit();
      for (let i = 0; i < x.length; i++) {
        this.shapeObject = this.shapeFactory.factoryClass(
          x[i].id,
          x[i].name,
          x[i].x,
          x[i].y,
          x[i].width,
          x[i].height,
          '#'+x[i].fillColor,
          "#"+x[i].stroke,
          x[i].strokeWidth,
          x[i].scaleX,
          x[i].scaleY,
          x[i].angle,
          x[i].draggable
        ).get();
        this.view.staticLayer.add(this.shapeObject);
      }
    });
  }

  redo() {
    const component = this;
    this.Services.redoAction().subscribe((x:any) => {
      x = JSON.stringify(x);
      x = x.substring(10);
      x = x.substring(0, x.length - 1);
      x = JSON.parse(x);
      this.ngOnInit();
      for (let i = 0; i < x.length; i++) {
        component.shapeObject = component.shapeFactory.factoryClass(
          x[i].id,
          x[i].name,
          x[i].x,
          x[i].y,
          x[i].width,
          x[i].height,
          '#' + x[i].fillColor,
          '#' + x[i].stroke,
          x[i].strokeWidth,
          x[i].scaleX,
          x[i].scaleY,
          x[i].angle,
          x[i].draggable
        ).get();
        component.view.staticLayer.add(this.shapeObject);
      }
    });
  }

  clear() {
    this.Services.clearShapes();
    this.view.staticLayer.destroyChildren();
  }

  fill() {
    let shape = this.stage.findOne('#' + this.currentShape);
    console.log('fill' + shape.attrs.fill);
    if (shape.getClassName() == 'Line') {
      shape.attrs.stroke = this.color;
    } else {
      shape.attrs.fill = this.color;
    }
    this.Services.colorShape(shape.attrs.id, shape.attrs.fill.substring(1));
    shape.draw();
  }

  save(path: string, filename: string, extension:string) {
    if (extension == 'json') {
      console.log(filename)
      this.Services.saveJSON(path, filename);
    } else if (extension == 'xml') {
      this.Services.saveXML(path, filename);
    }
  }

  load(path: string) {
    if(path.includes('json')){
      path=path.substring(0, path.length-5);
        this.Services.loadJSON(path).subscribe((x: any) => {
        console.log("1");
        x = JSON.stringify(x);
        x = x.substring(10);
        x = x.substring(0, x.length - 1);
        x = JSON.parse(x);
        console.log("2");
        this.ngOnInit();
        for (let i = 0; i < x.length; i++) {
          this.shapeObject = this.shapeFactory.factoryClass(
              x[i].id,
              x[i].name,
              x[i].x,
              x[i].y,
              x[i].width,
              x[i].height,
              '#'+x[i].fillColor,
              "#"+x[i].stroke,
              x[i].strokeWidth,
              x[i].scaleX,
              x[i].scaleY,
              x[i].angle,
              x[i].draggable
            ).get();
          this.view.staticLayer.add(this.shapeObject);
        }
      });

    }else if(path.includes('xml')){
        path=path.substring(0, path.length-4);
        this.Services.loadXML(path).subscribe((x: any) => {
        console.log("1");
        x = JSON.stringify(x);
        x = x.substring(10);
        x = x.substring(0, x.length - 1);
        x = JSON.parse(x);
        console.log("2");
        this.ngOnInit();
        for (let i = 0; i < x.length; i++) {
          this.shapeObject = this.shapeFactory.factoryClass(
              x[i].id,
              x[i].name,
              x[i].x,
              x[i].y,
              x[i].width,
              x[i].height,
              '#'+x[i].fillColor,
              "#"+x[i].stroke,
              x[i].strokeWidth,
              x[i].scaleX,
              x[i].scaleY,
              x[i].angle,
              x[i].draggable
            ).get();
          this.view.staticLayer.add(this.shapeObject);
        }
      });

    }

    }
}
