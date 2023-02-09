package com.paint.demo.model;

public class Shape implements Cloneable{
	
	private String name;
	private String id;
    private double x , y , width, height, scaleX, scaleY, angle;
    private String fillColor , stroke;
    private double strokeWidth;
    private boolean draggable;
    
	public Shape(String name, String id, double x, double y, double width, double height, String fillColor, String stroke,
			double strokeWidth, double scaleX, double scaleY, double angle, boolean draggable) {
		this.name = name;
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.fillColor = fillColor;
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.angle = angle;
		this.draggable = draggable;
	}
	
	public Object clone() throws CloneNotSupportedException{
		Shape clonedShape = null;
		try {
			clonedShape = (Shape) super.clone();
		} catch (CloneNotSupportedException e) {
			throw new RuntimeException(e);
		}
		return clonedShape;
	}

	public void setX(double x) {
		this.x = x;
	}
	public void setY(double y) {
		this.y = y;
	}
	public void setFillColor(String fillColor) {
		this.fillColor = fillColor;
	}
	public void setScaleX(double scaleX) {
		this.scaleX = scaleX;
	}
	public void setScaleY(double scaleY) {
		this.scaleY = scaleY;
	}
	public void setAngle(double angle) {
		this.angle = angle;
	}
	
}
