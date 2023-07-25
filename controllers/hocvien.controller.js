const BaseRessponse = require("../interfaces/response.interface");
const HocVien = require("../models/hocvien.model");

const HocVienController = {
    getAllStudent: async function (req, res, next) {
        res.json((new BaseRessponse('SUCCESSFUL', 'SUCCESSFUL', await HocVien.find())));
    },
    addStudent: async function (req, res, next) {
        let body = req.body;
        let hv = new HocVien({
            name: body.name,
            address: body.address,
            age: body.age,
            avg: body.avg,
            createdAt: req.currentDate,
            createdBy: '',
            updatedAt: req.currentDate,
            updatedBy: ''
        });

        let data = await hv.save();
        res.status(201).json(new BaseRessponse('SUCCESSFUL', 'SUCCESSFUL', data));
    },
    editStudent: async function (req, res, next) {
        // lấy parameters: req.query 
        // lấy path variable | route params: req.params
        let param = req.query;
        let body = req.body;
        let hv = {
            name: body.name,
            address: body.address,
            age: body.age,
            avg: body.avg,
            createdAt: req.currentDate,
            createdBy: '',
            updatedAt: req.currentDate,
            updatedBy: ''
        };
        await HocVien.updateOne({ _id: param.id }, { $set: hv });
        res.json(new BaseRessponse('SUCCESSFUL', 'SUCCESSFUL', hv));
    },
    deleteStudent: async function (req, res, next) {
        let id = req.query.id;
        await HocVien.deleteOne({ _id: id });
        res.json(new BaseRessponse('SUCCESSFUL', 'SUCCESSFUL'));
    }
}

module.exports = HocVienController;