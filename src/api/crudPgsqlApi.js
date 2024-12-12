import {sentences} from './crudPgsqlSentences.js';
import { functions } from './crudPgsqlFunctions.js';
import {executeFunctions} from './crudPgsqlExecuteFunctions.js';


let resWords = ["pags", "offset", "numrows", "orderby"]; //Array de palabras reservadas para ser excluidas del WHERE

export const pgsqlApi = {
  async getAll(table, header) {
    const sql = `SELECT * FROM "${table}"`;
    return executeFunctions.executePgsqlString(header, sql);
  },

  async getFiltered(table, where, header) {
    const sql = functions.paginationString(
      sentences.filterString(table, where, resWords),
      where
    );
    return executeFunctions.executePgsqlString(header, sql);
  },

  async getFunction(nomFunction, params, header) {
    const sql = sentences.functionString(nomFunction, params);
    return executeFunctions.executePgsqlString(header, sql);
  },

  async getCustomSelect(table, field, where, header) {
    const sql = functions.paginationString(
      sentences.customSelectString(table, field, where, resWords),
      where
    );
    return executeFunctions.executePgsqlString(header, sql);
  },

  async executeQuery(data, header) {
    const sql = data.query?? "SELECT 'No query'"
    const bind = data.bind?? {}
    return await executeFunctions.executePgsqlString(header,sql)
  },

  /*async executeTransaction(table, data, header) {
    return await executeFunctions.executePgsqlTransaction(table, header, data)
  },*/

  async insertOne(table, data, header) {
    //console.log("data", data);
    const sql = sentences.insertString(table, data);
    const res = await executeFunctions.executePgsqlString(header, sql);
    console.log("Post Inserción", res);
    if (res.success) return await this.getFiltered(table, data, header);
    else return res;
  },

  async updateFiltered(table, data, where, header) {
    const sql = sentences.updateString(table, data, where);
    const res = await executeFunctions.executePgsqlString(header, sql);
    console.log("Put Actualización", res);
    if (res.success) return await this.getFiltered(table, where, header);
    else return res;
  },

  async deleteFiltered(table, where, header) {
    let data = await this.getFiltered(table, where, header);
    const sql = sentences.deleteString(table, where);
    const res = await executeFunctions.executePgsqlString(header, sql);
    console.log("Delete", res);
    if (res.success) return data;
    else return res;
  },

};

