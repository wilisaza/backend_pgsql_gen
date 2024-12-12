import  impPool from 'pg'
import logger from '../util/logger.js'

import { functions } from './crudPgsqlFunctions.js'
import { sentences } from './crudPgsqlSentences.js'

const { Pool} = impPool

const libName = '[[api/crudPgsqlExecuteFunctions.js]]'

export const executeFunctions = {

  async executePgsqlString(header, sql) {
    const functionName = `${libName} [executePgsqlString]`
    let pool
    try {
      process.env.DBCONN ? pool = new Pool({connectionString: process.env.DBCONN, ssl: { rejectUnauthorized: false }}) : pool = new Pool(functions.extractDbConn(header))
      logger.info(`${functionName} - Connection success by ${process.env.DBCONN ?  'ENV' : 'Header'}`)
      logger.info(`${functionName} SQL= ${sql}`)
      if(!process.env.DBCONN){
        let setSchema = pool.query(`SET search_path TO '${header.dbschema}';`);
        await setSchema;
      }
      const res = await pool.query(sql);
      return { success: true, data:res.rows?? [], rowsAfffected:res.rowCount?? 0 }
    } catch (error) {
      logger.error(`${functionName} ${error.stack}`)
      return { success: false, error: error.stack };
    } finally {
      if (pool) {
        await pool.end()
        logger.info(`${functionName} - Close connection`)
      }
    }
  },
  
}
