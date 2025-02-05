package com.paint.demo.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.paint.demo.model.Originator;
import com.paint.demo.model.Shape;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/paint")
public class PaintController {

	Gson gson = new Gson();
	Originator originator = new Originator();
	CareTakerController careTaker = new CareTakerController();

	@GetMapping("/add/{id}/{name}/{x}/{y}/{width}/{height}/{fillColor}/{stroke}/{strokeWidth}/{scaleX}/{scaleY}/{angle}/{draggable}")
	public void addShape(
			@PathVariable("id") String id,
			@PathVariable("name") String name,
			@PathVariable("x") double x,
			@PathVariable("y") double y,
			@PathVariable("width") double width,
			@PathVariable("height") double height,
			@PathVariable("fillColor") String fillColor,
			@PathVariable("stroke") String stroke,
			@PathVariable("strokeWidth") double strokeWidth,
			@PathVariable("scaleX") double scaleX,
			@PathVariable("scaleY") double scaleY,
			@PathVariable("angle") double angle,
			@PathVariable("draggable") boolean draggable
	) throws CloneNotSupportedException {
		System.out.println("addShape");
		this.originator.addShape(new Shape(name, id, x, y, width, height, fillColor, stroke, strokeWidth, scaleX, scaleY, angle, draggable));
		this.careTaker.save(originator);
		this.careTaker.clearRedo();
	}

	@GetMapping("/color/{id}/{fillColor}")
	public void colorShape(
			@PathVariable("id")String id,
			@PathVariable("fillColor") String fillColor
	) throws CloneNotSupportedException {
		System.out.println("colorShape");
		if(this.originator.getShapes().size() > Integer.parseInt(id)) {
			this.originator.getShapes().get(Integer.parseInt(id)).setFillColor(fillColor);
			this.careTaker.save(originator);
			this.careTaker.clearRedo();
		}
	}

	@GetMapping("/resize/{id}/{scaleX}/{scaleY}")
	public void resizeShape(
			@PathVariable("id") String id,
			@PathVariable("scaleX") double scaleX,
			@PathVariable("scaleY") double scaleY
	) throws CloneNotSupportedException {
		System.out.println("resizeShape");
		if(this.originator.getShapes().size() > Integer.parseInt(id)) {
			this.originator.getShapes().get(Integer.parseInt(id)).setScaleX(scaleX);
			this.originator.getShapes().get(Integer.parseInt(id)).setScaleY(scaleY);
			this.careTaker.save(originator);
			this.careTaker.clearRedo();
		}
	}

	@GetMapping("/rotate/{id}/{angle}")
	public void rotateShape(
			@PathVariable("id")String id,
			@PathVariable("angle") double angle
	) throws CloneNotSupportedException {
		System.out.println("rotateShape");
		if(this.originator.getShapes().size() > Integer.parseInt(id)) {
			this.originator.getShapes().get(Integer.parseInt(id)).setAngle(angle);
			this.careTaker.save(originator);
			this.careTaker.clearRedo();
		}
	}

	@GetMapping("/move/{id}/{x}/{y}")
	public void moveShape(
			@PathVariable("id")String id,
			@PathVariable("x") double x,
			@PathVariable("y") double y
	) throws CloneNotSupportedException {
		System.out.println("moveShape");
		if (this.originator.getShapes().size() > Integer.parseInt(id)) {
			this.originator.getShapes().get(Integer.parseInt(id)).setX(x);
			this.originator.getShapes().get(Integer.parseInt(id)).setY(y);
			this.careTaker.save(originator);
			this.careTaker.clearRedo();
		}
	}

	@GetMapping("/remove/{id}")
	public void removeShape(@PathVariable("id") String id) throws CloneNotSupportedException {
		System.out.println("removeShape");
		if (this.originator.getShapes().size() > Integer.parseInt(id)) {
			this.originator.getShapes().remove(Integer.parseInt(id));
			this.careTaker.save(originator);
			this.careTaker.clearRedo();
		}
	}

  @GetMapping("/clear")
  public void clearShapes() throws CloneNotSupportedException {
    System.out.println("clear");
    this.originator.create();
    this.careTaker.save(originator);
    this.careTaker.clearRedo();
  }

	@GetMapping("/undo")
	public String undoAction() {
		System.out.println("undo");
		this.careTaker.undo(originator);
		return gson.toJson(this.originator);
	}

	@GetMapping("/redo")
	public String redoAction() {
		System.out.println("redo");
		this.careTaker.redo(originator);
		return gson.toJson(this.originator);
	}

	@PostMapping("/saveJSON")
	public void saveJSON(@RequestBody String path) {
		System.out.println("saveJSON");
    try {
      System.out.println(path);
      String jsonString = gson.toJson(this.originator);
      File file = new File(path);
      FileWriter writer = new FileWriter(file);
      writer.write(jsonString);
      writer.flush();
      writer.close();
    } catch (Exception e) {
			System.out.println("System Error...");
    }
  }

	@PostMapping("/saveXML")
  public void saveXML(@RequestBody String path) {
		System.out.println("saveXML");
		try {
			File file = new File(path);
			JAXBContext jaxbContext = JAXBContext.newInstance(Originator.class);
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			marshaller.marshal(this.originator, file);
		} catch (Exception e) {
			System.out.println("System Error...");
		}
  }

	@PostMapping("/LoadJSON")
	public String loadJSON(@RequestBody String path) {
		System.out.println("loadJSON");
		BufferedReader bufferedReader = null;
		try {
      bufferedReader = new BufferedReader(new FileReader(path));
      this.originator = gson.fromJson(bufferedReader, Originator.class);
			return gson.toJson(this.originator);
    } catch (Exception e) {
      System.out.println("System Error...");
    } finally {
			if(bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) {
					System.out.println("System Error...");
				}
			}
		}
		return null;
  }

	@PostMapping("/loadXML")
  public String loadXML(@RequestBody String path) {
    System.out.println("loadXML");
    try {
      Path filename = Path.of(path);
      String xmlString = Files.readString(filename);
      JSONObject jsonObject = XML.toJSONObject(xmlString);
      jsonObject = jsonObject.getJSONObject("originator");
      jsonObject.put("shapes", jsonObject.get("shape"));
      jsonObject.remove("shape");
      this.originator = gson.fromJson(jsonObject.toString(3), Originator.class);
      return jsonObject.toString(3);
    } catch (Exception e) {
      System.out.println("System Error...");
    }
    return null;
  }
}
