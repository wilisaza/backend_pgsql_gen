import {pgsqlApi} from '../api/crudPgsqlApi.js'
import { functions } from '../api/crudPgsqlFunctions.js'

export const pgsqlCtrl = {

  getAllObjects: async (req, res) => {
    let connError = []
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outdata;
    if (Object.keys(req.query).length === 0) {
      outdata = await pgsqlApi.getAll(req.params.object, req.headers);
    } 
    else {
      outdata = await pgsqlApi.getFiltered(req.params.object, req.query, req.headers);
    }
    res.json(outdata);
  },

  postObject: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }
    let outData = {}
    if (Array.isArray(req.body))
      outData = await pgsqlApi.executeTransaction(req.params.object, req.body, req.headers)

    if (!Array.isArray(req.body))
      outData = await pgsqlApi.insertOne(req.params.object, req.body, req.headers)
    
    res.json(outData)
  },

  postQuery: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await pgsqlApi.executeQuery(req.body, req.headers)
    res.json(outData)
  },

  postTransaction: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    if (!Array.isArray(req.body)){
      res.status(400).json({ success:false, error: 'Body requires an array' })
      return
    }

    let outData = {}
    if (Array.isArray(req.body))
      outData = await pgsqlApi.executeTransaction('', req.body, req.headers)
    
    res.json(outData)
  },

  putObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await pgsqlApi.updateFiltered(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  deleteObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await pgsqlApi.deleteFiltered(req.params.object, req.query, req.headers)
    res.json(outData)
  },

  postFunctionObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }
    
    let outData = await pgsqlApi.getFunction(req.params.nomFunction, req.body, req.headers)
    res.json(outData)
  },

  postAllCustomObjects : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await pgsqlApi.getCustomSelect(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  postProcedureObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await pgsqlApi.postProcedure(req.params.nomProcedure, req.body, req.headers)
    res.json(outData)
  },
};

