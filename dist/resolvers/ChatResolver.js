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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResolver = void 0;
const Chat_1 = require("../entities/Chat");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const NEWCHAT = "NEW_CHAT_ADDED";
let ChatResolver = class ChatResolver {
    async chats() {
        return [];
    }
    async createChat(input, publish) {
        const chat = {
            id: (0, uuid_1.v4)(),
            message: input,
            time: new Date()
        };
        console.log("new chat created ==== ", chat);
        await publish(chat);
        return chat;
    }
    newChat({ id, message, time }) {
        console.log("subscription firing ===== ", { id, message, time });
        return { id, message, time };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Chat_1.Chat]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "chats", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Chat_1.Chat),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.PubSub)(NEWCHAT)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "createChat", null);
__decorate([
    (0, type_graphql_1.Subscription)({ topics: NEWCHAT }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Chat_1.Chat)
], ChatResolver.prototype, "newChat", null);
ChatResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => Chat_1.Chat)
], ChatResolver);
exports.ChatResolver = ChatResolver;
//# sourceMappingURL=ChatResolver.js.map