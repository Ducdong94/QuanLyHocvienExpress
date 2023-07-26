const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");

const ErrorController = {
    pathNotFound: async function (req, res, next) {
        res.status(404).json(new BaseRessponse(ResponseCode.PATH_NOT_FOUND, ResponseMessage.PATH_NOT_FOUND));
    }
}


module.exports = ErrorController;