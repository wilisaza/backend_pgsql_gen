import { Router } from 'express';

export const router = Router();

import { pgsqlCtrl } from '../controllers/pgsql.controller.js';

router.get('/', function (req, res) {res.send('Hello World')});

router.get('/:object', pgsqlCtrl.getAllObjects);

router.post('/custom/:object', pgsqlCtrl.postAllCustomObjects);

router.post('/function/:nomFunction', pgsqlCtrl.postFunctionObject);

router.post('/procedure/:nomProcedure', pgsqlCtrl.postProcedureObject);

router.post('/query', pgsqlCtrl.postQuery)

router.post('/transaction', pgsqlCtrl.postTransaction)

router.post('/:object', pgsqlCtrl.postObject);

router.put('/:object', pgsqlCtrl.putObjects);

router.delete('/:object', pgsqlCtrl.deleteObjects);

