"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
const config = {
    development: {
        username: (_a = process.env.POSTGRES_USER) !== null && _a !== void 0 ? _a : "postgres",
        password: (_b = process.env.POSTGRES_PASSWORD) !== null && _b !== void 0 ? _b : "postgres",
        database: (_c = process.env.DB_NAME) !== null && _c !== void 0 ? _c : "ngcash_dev",
        host: (_d = process.env.POSTGRES_HOST) !== null && _d !== void 0 ? _d : "localhost",
        port: (_e = Number(process.env.POSTGRES_PORT)) !== null && _e !== void 0 ? _e : 5432,
        dialect: "postgres",
    },
    test: {
        username: (_f = process.env.DB_USER) !== null && _f !== void 0 ? _f : "postgres",
        password: (_g = process.env.DB_PASS) !== null && _g !== void 0 ? _g : "root",
        database: (_h = process.env.DB_NAME) !== null && _h !== void 0 ? _h : "ngcash_test",
        host: (_j = process.env.DB_HOST) !== null && _j !== void 0 ? _j : "localhost",
        port: (_k = Number(process.env.DB_PORT)) !== null && _k !== void 0 ? _k : 3306,
        dialect: "postgres",
    },
    production: {
        username: (_l = process.env.DB_USER) !== null && _l !== void 0 ? _l : "postgres",
        password: (_m = process.env.DB_PASS) !== null && _m !== void 0 ? _m : "root",
        database: (_o = process.env.DB_NAME) !== null && _o !== void 0 ? _o : "ngcash_prod",
        host: (_p = process.env.DB_HOST) !== null && _p !== void 0 ? _p : "localhost",
        port: (_q = Number(process.env.DB_PORT)) !== null && _q !== void 0 ? _q : 3306,
        dialect: "postgres",
    },
};
module.exports = config;
