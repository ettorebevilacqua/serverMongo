module.exports = objForSchema => {
    return {
        ...objForSchema, _info: {
            uc: {
                type: String,
                required: false,
                trim: true,
            },
            uu: {
                type: String,
                required: false,
                trim: true,
            },
        }
    }
};