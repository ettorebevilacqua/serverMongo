const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const modelValidation = require('../../validations/model.validation');
const modelController = require('../../controllers/model.controller');
const { Corsi, addEnte } = require('../../models');

const modelCtrl = modelController(Corsi, { onCreate: addEnte() });

const router = express.Router();

router
    .route('/')
    .post(auth('manager'), validate(modelValidation.create), modelCtrl.create)
    .get(auth('manager'), validate(modelValidation.getItems), modelCtrl.getItems);

router
    .route('/:id')
    .get(auth('manager'), validate(modelValidation.getItem), modelCtrl.getItem)
    .patch(auth('manager'), validate(modelValidation.update), modelCtrl.update)
    .delete(auth('manager'), validate(modelValidation.delete), modelCtrl.delete);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Corsi
 *   description: Corsi management and retrieval
 */

/**
 * @swagger
 * /corsi:
 *   post:
 *     summary: Create a Corso
 *     description: Only admins can create other Corso.
 *     tags: [Corsi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ente:
 *                 type: string
 *             example:
 *              ente: ente example,
 *              titolo: titolo corso,
 *              finanziatore: mycorso,
 *              sede: milano
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Corsi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Corsi
 *     description: Only admins can retrieve all Corsi.
 *     tags: [Corsi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of corsi
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Corsi'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /corsi/{id}:
 *   get:
 *     summary: Get a Corso
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Corsi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Corsi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Corso
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Corsi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: corso id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: fake name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Corsi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Corso
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Corsi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: corso id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
