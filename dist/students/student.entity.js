var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
let Student = class Student {
    id;
    firstName;
    lastName;
    phone;
    groupId;
    courseName;
    courseId;
    status;
    enrolledDate;
    notes;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Student.prototype, "groupId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "courseName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "courseId", void 0);
__decorate([
    Column({ default: 'active' }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Student.prototype, "enrolledDate", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "notes", void 0);
Student = __decorate([
    Entity()
], Student);
export { Student };
//# sourceMappingURL=student.entity.js.map