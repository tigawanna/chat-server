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
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
let User = class User {
};
__decorate([
    (0, type_graphql_2.Field)(() => String, { nullable: false }),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_2.Field)(() => String, { nullable: false }),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_2.Field)(() => String, { nullable: false }),
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
const schemaOptions = { schemaOptions: { timestamps: { createdAt: true, } } };
exports.UserModel = (0, typegoose_1.getModelForClass)(User, schemaOptions);
//# sourceMappingURL=User.js.map