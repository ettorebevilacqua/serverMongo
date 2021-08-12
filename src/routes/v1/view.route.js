const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const viewController = require('../../controllers/view.controller');

const router = express.Router();

router
    .route('/getQuestions').get(auth('admin', 'manager'),
        validate(questionValidation.getItems), viewController.getQuestions);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: View
 *   description: View management and retrieval
 */

/**
 * @swagger
 * /view/getQuestions:
 *   get:
 *     summary: Get a Question xx
 *     description: admin and manager can list , user only idCorso. Only admins can fetch other Question.
 *     tags: [View]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idmodulo
 *         required: false
 *         schema:
 *           type: string
 *         description: Modulo id
 *       - in: query
 *         name: idcorso
 *         required: false
 *         schema:
 *           type: string
 *         description: Corso id
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: closeAt
 *         required: false
 *         schema:
 *           type: string
 *         description:  closed question, true pr false or date
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
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: full
 *         schema:
 *           type: string
 *         description: with nested field
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
