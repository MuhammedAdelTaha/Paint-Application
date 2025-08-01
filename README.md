# Table of Contents

- [Summary](#summary)
- [Setup Instructions](#setup-instructions)
- [Design Pattern Impact](#design-pattern-impact)
- [Demo Video](demo-video)

## Summary

A collaborative drawing application with undo/redo capabilities, built with Angular (frontend) and Spring Boot (backend), demonstrating clean architecture and design pattern implementation.

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
