// Object constructor
const BaseRessponse = function (code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
}

// {
//     'code': 'successful',
//     'message': 'successful',
//     'data': null
// }

// {
//     'code': 'failed',
//     'message': '',
//     'data': null
// }

module.exports = BaseRessponse;