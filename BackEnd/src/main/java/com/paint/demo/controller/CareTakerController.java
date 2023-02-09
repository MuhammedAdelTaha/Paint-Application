package com.paint.demo.controller;

import java.util.Stack;

import com.paint.demo.model.Memento;
import com.paint.demo.model.Originator;

public class CareTakerController {
	private Stack<Memento> undoStack = new Stack<>();
	private Stack<Memento> redoStack = new Stack<>();
	
	public void save(Originator originator) throws CloneNotSupportedException {
		undoStack.push(originator.save());
	}
	
	public void undo(Originator originator) {
		if(!undoStack.isEmpty()) {
			this.redoStack.push(this.undoStack.pop());
			if(this.undoStack.isEmpty()) {
				originator.create();
			}
			else {				
				originator.restore(undoStack.peek());
			}
		}
	}
	
	public void redo(Originator originator) {
		if(!redoStack.isEmpty()) {
			this.undoStack.push(this.redoStack.pop());
			originator.restore(undoStack.peek());
		}
	}
	
	public void clearRedo() {
		this.redoStack.clear();
	}
}
