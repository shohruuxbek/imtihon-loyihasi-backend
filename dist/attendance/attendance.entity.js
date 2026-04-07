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
let Attendance = class Attendance {
    id;
    studentId;
    courseId;
    date;
    status;
    notes;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Attendance.prototype, "studentId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Attendance.prototype, "courseId", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Attendance.prototype, "date", void 0);
__decorate([
    Column({ default: 'present' }),
    __metadata("design:type", String)
], Attendance.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
__decorate([
    Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Attendance.prototype, "createdAt", void 0);
Attendance = __decorate([
    Entity()
], Attendance);
export { Attendance };
//# sourceMappingURL=attendance.entity.js.map