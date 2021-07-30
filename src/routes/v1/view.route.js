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
