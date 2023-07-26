const Constan = require("../constans/constan");

const RenderController = {
    home: (req, res, next) => {
        try {
            res.render(Constan.viewVersion + '/index');
        } catch (error) {
            console.log(error);
            
        }
    },
    litsStudent: (req, res, next) => {
        try {
            res.render(Constan.viewVersion + '/index', { title: 'Express today' });
        } catch (error) {
            console.log(error);
        }
    },
    findStudent: (req, res, next) => {
        try {
            res.render(Constan.viewVersion + '/index', { title: 'Express today' });
        } catch (error) {
            console.log(error);
        }
    },
    createStudent: (req, res, next) => {

    },
    editStudent: (req, res, next) => {

    },
    deleteStudent: (req, res, next) => {

    },
    error: (req, res, next) => {
        // res.render('error', { title: 'Express today' });
    },
}

module.exports = RenderController;