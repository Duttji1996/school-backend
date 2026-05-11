"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homework = void 0;
const typeorm_1 = require("typeorm");
const subject_entity_1 = require("../../curriculum/entities/subject.entity");
const school_class_entity_1 = require("../../curriculum/entities/school-class.entity");
let Homework = class Homework {
    id;
    subject;
    schoolClass;
    title;
    description;
    dueDate;
    createdAt;
};
exports.Homework = Homework;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Homework.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.Subject),
    __metadata("design:type", subject_entity_1.Subject)
], Homework.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_class_entity_1.SchoolClass),
    __metadata("design:type", school_class_entity_1.SchoolClass)
], Homework.prototype, "schoolClass", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Homework.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Homework.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Homework.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Homework.prototype, "createdAt", void 0);
exports.Homework = Homework = __decorate([
    (0, typeorm_1.Entity)('homeworks')
], Homework);
//# sourceMappingURL=homework.entity.js.map