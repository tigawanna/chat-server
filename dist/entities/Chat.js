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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.Chat = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let Chat = class Chat {
};
__decorate([
    (0, type_graphql_2.Field)(() => String, { nullable: false }),
    __metadata("design:type", mongodb_1.ObjectId)
], Chat.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_2.Field)(() => String, { nullable: false }),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Chat.prototype, "message", void 0);
__decorate([
    (0, type_graphql_2.Field)(),
    __metadata("design:type", Date)
], Chat.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_2.Field)(),
    __metadata("design:type", Date)
], Chat.prototype, "updatedAt", void 0);
Chat = __decorate([
    (0, type_graphql_1.ObjectType)()
], Chat);
exports.Chat = Chat;
const ChatSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId, auto: true },
    message: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });
ChatSchema.plugin(mongoose_paginate_v2_1.default);
exports.ChatModel = mongoose_1.default.model('Chat', ChatSchema);
//# sourceMappingURL=Chat.js.map