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
const NEWCHAT = "NEW_CHAT_ADDED";
let ChatResolver = class ChatResolver {
    async chats() {
        const options = {
            page: 1,
            limit: 2,
            collation: {
                locale: 'en',
            },
        };
        const chats = await Chat_1.ChatModel.paginate({}, options);
        console.log("holt output ======", chats);
        return chats.docs;
    }
    async createChat(input, publish) {
        const chat = new Chat_1.ChatModel({
            message: input,
        });
        await chat.save().then(async (e) => {
            console.log("user response====== ", e);
            await publish(e);
        });
        return chat;
    }
    async deleteChat(id) {
        await Chat_1.ChatModel.findByIdAndDelete({ _id: id })
            .catch(e => {
            console.log("is delete error ======", e);
            return false;
        });
        return true;
    }
    async updateChat(id, input) {
        const updatedChat = await Chat_1.ChatModel.findByIdAndUpdate({ _id: id }, { message: input }, { new: true })
            .catch(e => {
            console.log("is delete error ======", e);
        });
        return updatedChat;
    }
    newChat({ _id, message, createdAt, updatedAt }) {
        console.log("subscription firing ===== ", { _id, message, createdAt, updatedAt });
        return { _id, message, createdAt, updatedAt };
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
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "deleteChat", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Chat_1.Chat),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "updateChat", null);
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