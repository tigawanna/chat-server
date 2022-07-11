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
exports.UserResolver = void 0;
const types_1 = require("../types");
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const NEWUSER = "NEW_USER_ADDED";
let UserResolver = class UserResolver {
    async users() {
        const users = await User_1.UserModel.find({});
        console.log("user returned========", users);
        return users;
    }
    async createUser(input, publish) {
        const user = new User_1.UserModel({
            name: input.name,
            email: input.email,
        });
        await user.save().then(async (e) => {
            await publish(e);
        });
        return user;
    }
    userAdded({ id, name, email }) {
        return { id, name, email };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.PubSub)(NEWUSER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UserInput, Function]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Subscription)({ topics: NEWUSER }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", User_1.User)
], UserResolver.prototype, "userAdded", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map