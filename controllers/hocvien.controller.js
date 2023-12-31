const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");
const HocVien = require("../models/hocvien.model");

const HocVienController = {
    getAllStudent: async function (req, res, next) {
        try {
            res.json((new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, await HocVien.find())));
        } catch (e) {
            console.log(e);
        }
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
        res.status(201).json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, data));
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
        res.json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, hv));
    },
    deleteStudent: async function (req, res, next) {
        let id = req.query.id;
        await HocVien.deleteOne({ _id: id });
        res.json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL));
    }
}

module.exports = HocVienController;