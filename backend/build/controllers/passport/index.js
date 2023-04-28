"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_get_1 = __importDefault(require("lodash.get"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = __importDefault(require("./strategies"));
const user_1 = __importDefault(require("../../models/user"));
const passportController = () => {
    passport_1.default.serializeUser((data, done) => {
        done(null, { id: data._id });
    });
    passport_1.default.deserializeUser(async (data, done) => {
        const _id = data.id;
        try {
            const user = await user_1.default.findById(_id);
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    });
    Object.keys(strategies_1.default).forEach((strategy) => {
        const { socialType, socialName, fileds, isEnabled, auth } = strategies_1.default[strategy];
        if (isEnabled) {
            passport_1.default.use(auth(async ({ profile, done }) => {
                const dataFields = Object.keys(fileds).reduce((a, s) => ({
                    ...a,
                    [s]: (0, lodash_get_1.default)(profile, fileds[s], ""),
                }), {});
                const conditions = {
                    token: dataFields.token,
                    socialType,
                };
                let user = await user_1.default.findOne(conditions);
                if (!user) {
                    user = new user_1.default({
                        ...dataFields,
                        socialType,
                        socialName,
                    });
                    await user.save();
                }
                return done(null, user);
            }));
        }
    });
};
exports.default = passportController;
