import knex from "knex";
import env from "./env.js";
import knexConfig from "../../knexfile.js";

const environment = env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

export default db;
