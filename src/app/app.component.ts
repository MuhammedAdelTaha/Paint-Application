import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { KonvaService } from './konva.service';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { ShapCreator } from './paint/shapeFactory/shapeFactory';

import { View } from './paint/view';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  
  title = 'painter';
  colour!: any;
  id!: number;
  fileExtension!: string;
  shapeObject: any;
  tr: any;
  shapeFactory: any;
  stage!: Stage;
  view!: View;
  currentShape!: string;
  Services: any;

  constructor(factory: ShapCreator, service: KonvaService) {
    this.shapeFactory = factory;
    this.Services = service;
  }

  ngOnInit() {
    this.id = 0;
    this.tr = new Konva.Transformer();
    this.colour = '#ffffff';
    this.currentShape = '0';
    this.stage = new Stage({
      container: 'board',
      width: 1470 * (38 / 46),
      height: 700 * (44 / 46),
    });
    this.view = new View();
    this.view.dynamicLayer = new Layer();
    this.view.staticLayer = new Layer();
    this.stage.add(this.view.staticLayer, this.view.dynamicLayer);
    this.transform();
    this.view.staticLayer.add(this.tr);
    this.view.dynamicLayer.add(this.tr);
    this.stage.on('mousedown', (event: any) => {
      if (event.target.attrs.id == undefined) {
        console.log('undefined');
        return;
      } else {
        this.currentShape = event.target.attrs.id;
        var shape = this.stage.findOne('#' + this.currentShape);
        shape.moveToTop();
        console.log('@' + this.currentShape);
        this.colour = shape.attrs.fill;
      }
    });
  }  

  reset() {
    this.ngOnInit();
  }

  copy() {
    console.log('copy');
    var shape = this.stage.findOne('#' + this.currentShape);
    var copy = shape.clone();
    copy.x(shape.attrs.x + 20);
    copy.id(this.id.toString());
    this.view.staticLayer.add(copy);
    this.Services.create(
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

  fill() {
    var shape = this.stage.findOne('#' + this.currentShape);
    console.log('fill' + shape.attrs.fill);
    if (shape.getClassName() == 'Line') {
      shape.attrs.stroke = this.colour;
    } else {
      shape.attrs.fill = this.colour;
    }
    this.Services.colour(shape.attrs.id, shape.attrs.fill);
    shape.draw();
  }

  delete() {
    console.log(' deleting ' + this.currentShape);
    this.Services.remove(this.currentShape);
    this.stage.findOne('#' + this.currentShape).remove();
  }
  transform() {
    const component = this;
    this.stage.on('click tap', function (e) {
      if (e.target == component.stage) {
        component.tr.nodes([]);
        return;
      }
      e.target.draggable(true);
      component.tr.nodes([e.target]);
    });

    this.tr.on('transformend', function (e:any) {
      component.currentShape = e.target.attrs.id;
      var shape = component.stage.findOne('#' + component.currentShape);
      shape.moveToTop();
      component.Services.resize(shape.id(),shape.scaleX(),shape.scaleY());
      component.Services.rotate(shape.id(), shape.rotation());
      e.target.draggable(false);
      console.log(shape.id(),shape.x(),shape.y(),shape.scaleX(),shape.scaleY(),shape.rotation());
    });
    this.view.staticLayer.on('dragend', function(e:any){
      component.currentShape = e.target.attrs.id;
      var shape = component.stage.findOne('#' + component.currentShape);
      shape.moveToTop();
      component.Services.move(shape.id(),(shape.attrs.x).toFixed(3),(shape.attrs.y).toFixed(3));
      console.log(shape.id(),shape.x(),shape.y(),shape.scaleX(),shape.scaleY(),shape.rotation());
      e.target.draggable(false);
    });
  }
  addShape(shape: string) {

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
    
    const shapeName = this.shapeObject.attrs.name
    var strokeColor:string = '#ffffff'
    if (shapeName == "lineSegment"){
      strokeColor = this.shapeObject.attrs.stroke = '#000000'
    }

    this.view.staticLayer.add(this.shapeObject);
    this.Services.create(
      this.id.toString(),
      shape,
      this.stage.width() / 2,
      this.stage.height() / 2,
      200,
      100,
      strokeColor,
      '#000000',
      3,
      1,
      1,
      0,
      false
    );
    this.id = this.id + 1;
  }
  save(path: string, filename: string,extesion:string) {

    if (extesion == 'json') {
      console.log(filename)
      this.Services.saveJson(path, filename);
    } else if (extesion == 'xml') {
      this.Services.saveXML(path, filename);
    }
  }
  getExtension(value:string): any {
    this.fileExtension=value;
  }
  load(path: string) {
    if(path.includes('json')){
      path=path.substring(0, path.length-5);
        this.Services.loadJson(path).subscribe((x: any) => {
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

  undo() {
    this.Services.undo().subscribe((x: any) => {
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
    this.Services.redo().subscribe((x:any) => {
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
}
