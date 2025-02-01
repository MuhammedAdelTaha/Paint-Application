+++
title = 'Paint Application'
date = 2024-02-01T08:53:04+02:00
description = "Comprehensive Paint Application with various features such as creating, modifying and deleting shapes, manipulating colors, copying, resizing, and undo/redo actions"
slug = "paint-application"
authors = ["Mohamed Adel"]
tags = [
    "Design Patterns",
    "Angular",
    "Spring Boot",
    "HTML",
    "CSS",
    "Java",
    "JSON",
    "XML"
]
categories = ["Web Development", "Design Patterns"]
+++

# Table of Contents

- [Summary](#summary)
- [Key Design Patterns](#key-design-patterns)
  - [Frontend Patterns](#frontend-patterns)
  - [Backend Patterns](#backend-patterns)
- [Architecture Overview](#architecture-overview)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [Key Benefits](#key-benefits)
- [Setup Instructions](#setup-instructions)
- [Design Pattern Impact](#design-pattern-impact)
- [Demo Video](demo-video)

## Summary

A collaborative drawing application with undo/redo capabilities,
built with Angular (frontend) and Spring Boot (backend),
demonstrating clean architecture and design pattern implementation.

## Key Design Patterns

### Frontend Patterns

#### 1. **Factory Method Pattern** (`shapeFactory/`)

- **Implementation:** Shape creation through `ShapeFactory` and concrete classes (`circle.ts`, `rectangle.ts`)
- **Benefits:**
  - Encapsulates shape creation logic
  - Enables easy addition of new shape types
  - Centralizes shape configuration management
- **Code Example:**
  ```typescript
  this.shapeFactory.factoryClass(/* params */).get();
  ```

#### 2. **Observer Pattern**

- **Implementation:** RxJS Observables in `KonvaService`
- **Benefits:**
  - Asynchronous handling of backend responses
  - Decouples UI components from API communication
  - Enables reactive programming paradigm
- **Code Example:**
  ```typescript
  this.konvaService.resize(...).subscribe(...);
  ```

#### 3. **Singleton Pattern**

- **Implementation:** Angular services (`KonvaService`, `ShapeFactory`)
- **Benefits:**
  - Single instance across application
  - Consistent state management
  - Efficient resource utilization

#### 4. **Command Pattern**

- **Implementation:** Operation classes for undo/redo
- **Benefits:**
  - Encapsulates drawing operations as objects
  - Enables transactional behavior
  - Simplifies history management

### Backend Patterns

#### 1. **Memento Pattern** (`Memento.java`, `Originator.java`, `CareTakerController.java`)

- **Implementation:**
  - `Originator`: Manages current state
  - `Memento`: State snapshot storage
  - `CareTaker`: Undo/redo stack management
- **Benefits:**
  - Clean state management separation
  - Efficient history tracking
  - Low memory footprint through deep cloning
- **Class Diagram:**
  ```text
  Originator <--> Memento
  CareTaker manages Memento history
  ```

#### 2. **Strategy Pattern**

- **Implementation:** Different serialization strategies (JSON/XML)
- **Benefits:**
  - Interchangeable file format handling
  - Easy addition of new formats
  - Decoupled serialization logic

## Architecture Overview

### Frontend Structure

```text
app/
├── components/           # UI components
├── services/             # Business logic
│   └── konva.service.ts  # API communication
└── models/
    └── shape/            # Shape implementations
        └── factory/      # Factory pattern
```

### Backend Structure

```text
src/main/java/
├── model/                # Domain models
│   ├── Memento.java
│   └── Originator.java
├── controller/           # REST endpoints
└── util/                 # Helper classes
```

## Key Benefits

1. **State Management**

   - Memento pattern provides robust undo/redo capabilities
   - Deep cloning ensures state isolation
   - CareTaker maintains clean operation history

2. **Extensibility**

   - Factory pattern enables easy shape additions
   - Strategy pattern supports multiple file formats
   - Observer pattern allows asynchronous operations

3. **Maintainability**

   - Clear separation of concerns
   - Decoupled components
   - Type-safe implementations

4. **Performance**
   - Batch drawing operations
   - Efficient state cloning
   - Layer-based rendering

## Setup Instructions

1. **Backend**

   ```bash
   mvn spring-boot:run
   ```

2. **Frontend**
   ```bash
   npm install
   ng serve
   ```

## Design Pattern Impact

| Pattern        | Problem Solved               | Implementation Location       |
| -------------- | ---------------------------- | ----------------------------- |
| Memento        | State versioning             | Backend model package         |
| Factory Method | Flexible object creation     | shapeFactory/ directory       |
| Observer       | Asynchronous communication   | konva.service.ts              |
| Singleton      | Single service instances     | Angular @Injectable decorator |
| Strategy       | Interchangeable file formats | PaintController save/load     |

This architecture demonstrates how proper pattern implementation leads to:

- Clear separation between presentation and business logic
- Testable and modular components
- Scalable feature additions
- Maintainable state management
- Robust error handling

## Demo Video

[Paint-Application Demo Video](video.mp4)
