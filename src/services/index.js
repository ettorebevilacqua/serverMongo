const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

module.exports.authService = require('./auth.service');
module.exports.emailService = require('./email.service');
module.exports.tokenService = require('./token.service');
module.exports.userService = require('./user.service');
module.exports.viewService = require('./views.service');
module.exports.questionService = require('./question.service');

function ModelService(Model) {
    const create = async (dataBody, user, appFunct, errorMessage) => {
        // if (appFunct && Model[appFunct] && await Model[appFunct](dataBody, user)) {
        if (Model[appFunct]) {
            return Model[appFunct](dataBody, user);
        }

        dataBody._info = { uc: user && user.id };
        const [dataBodyModel, error] = Model.beforeServiceSave ? await Model.beforeServiceSave(Model, user, dataBody) : [dataBody, null];
        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        }
        return Model.create(dataBody);
    };

    /**
    * Query for Moduli
    * @param {Object} filter - Mongo filter
    * @param {Object} options - Query options
    * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
    * @param {number} [options.limit] - Maximum number of results per page (default = 10)
    * @param {number} [options.page] - Current page (default = 1)
    * @returns {Promise<QueryResult>}
    */
    const query = async (filter, options) => {
        const Models = await Model.paginate(filter, options);
        return Models;
    };

    /**
     * Get user by id
     * @param {ObjectId} id
     * @returns {Promise<User>}
     */
    const getById = async (id) => {
        return Model.findById(id);
    };

    /**
     * Update user by id
     * @param {ObjectId} userId
     * @param {Object} updateBody
     * @returns {Promise<User>}
    */
    const update = async (id, updateBody, validateFunc, user) => {
        const item = await getById(id);
        if (!item) {
            throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
        }
        if (validateFunc) {
            const validatErroreMessage = validateFunc(item);
            if (validatErroreMessage) {
                throw new ApiError(httpStatus.BAD_REQUEST, validatErroreMessage);
            }
        }

        updateBody._info = { ...item._info, uu: user && user.id };
        // console.log('xxxx id', id);
        const [dataBodyModel, error] = Model.beforeServiceSave ? await Model.beforeServiceSave(Model, user, updateBody, id) : [updateBody, null];
        if (error) {
            throw new ApiError(httpStatus.CONFLICT, error);
        }

        Object.keys(dataBodyModel).map(key => item[key] = dataBodyModel[key]);
        Object.assign(item, dataBodyModel);
        await item.save();
        return item;
    };
    const deleteItem = async (id) => {
        const item = await getById(id);
        if (!item) {
            throw new ApiError(httpStatus.CONFLICT, 'item not found');
        }
        await item.remove();
        return item;
    };


    return {
        create,
        query,
        getById,
        update,
        delete: deleteItem,
    }
}

module.exports.ModelService = ModelService;
