package com.paint.demo.model;

import java.util.ArrayList;

public class Memento {
	private ArrayList<Shape> shapes = new ArrayList<>();

	public Memento(ArrayList<Shape> shapes) {
		this.shapes = shapes;
	}

	public ArrayList<Shape> getShapes() {
		return shapes;
	}
}
