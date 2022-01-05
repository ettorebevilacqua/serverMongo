const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const modelValidation = require('../../validations/model.validation');
const modelController = require('../../controllers/model.controller');
const { Enti, addEnte } = require('../../models');

const modelCtrl = modelController(Enti, { onCreate: addEnte(), filterByEnte: true});

const router = express.Router();

router
    .route('/')
    .post(validate(modelValidation.create), modelCtrl.create)
    //.post('/register', validate(modelValidation.create), modelCtrl.create);
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
 *   name: Enti
 *   description: Enti management and retrieval
 */

/**
 * @swagger
 * /enti:
 *   post:
 *     summary: Create a Ente
 *     description: Only admins can create other Ente.
 *     tags: [enti]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descr:
 *                 type: string
 *             example:
 *              nome: newEnti,
 *              descr: generale
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Enti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Enti
 *     description: Only admins can retrieve all Enti.
 *     tags: [enti]
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
 *         description: Maximum number of ambiti
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
 *                     $ref: '#/components/schemas/Enti'
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
 * /enti/{id}:
 *   get:
 *     summary: Get a ente
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [enti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ente id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Enti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a ente
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [enti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ente id
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
 *               email: new@mail.com
 *               phone: 11111111
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Enti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a ente
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [enti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ente id
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
