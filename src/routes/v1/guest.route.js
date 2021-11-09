const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { authGuest } = require('../../middlewares/tokenGuest');
const guestValidation = require('../../validations/guest.validation');
const guestCtrl = require('../../controllers/guest.controller');

const router = express.Router();

// GET' http://localhost/v1/guest/a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlQGhoLml0IiwiaWF0IjoxNjM2MzQ4MjM0fQ.RlopmKCgA0YbOuXHsqmn3B59YT6Zdoxh5MtVTEogIuw
// curl -X GET  'http://localhost/v1/guest/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlQGhoLml0IiwiaWF0IjoxNjM2MzQ4MjM0fQ.RlopmKCgA0YbOuXHsqmn3B59YT6Zdoxh5MtVTEogIuw'
// curl -X GET  'http://localhost/v1/guest/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODIwOTE5ZjllYzEyZjRjZWYxZmUwYSIsImVtYWlsIjoiZmVAaGguaXQiLCJpYXQiOjE2MzYzODk5OTF9.R-kT_MNIsSO6U54-cpkPQHy7SB9vkA2LhOf_EHFfBiA'
// router.get('/a/:token', validate(guestValidation.getGuestToken), guestCtrl.getQuestion);
router
    .route('/')
    // .post(auth('guest'), validate(guestValidation.create), guestCtrl.create)
    .get(auth('guest'), validate(guestValidation.getItems), guestCtrl.getQuestion);

// router.get('/a/:token', validate(guestValidation.getGuestToken), guestCtrl.getQuestion);


 router
    .route('/:token')
    .get(authGuest('guest'), validate(guestValidation.getGuestToken), guestCtrl.getQuestion)
     //.patch(auth('guest'), validate(guestValidation.update), model.update)
    // .delete(auth('guest'), validate(guestValidation.delete), guestCtrl.delete);

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
