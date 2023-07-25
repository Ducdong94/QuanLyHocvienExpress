const BaseRessponse = require("../interfaces/response.interface");
const HocVien = require("../models/hocvien.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.checkIdHocVien = async (req, res, next) => {
    let id = req.query.id;
    // Các cách lấy dữ liệu theo id
    // HocVien.findById(id); => {}
    // HocVien.findOne({_id: id}); => {}
    // HocVien.find({_id: id}); => []
    try {
        await HocVien.findById(id);
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json(new BaseRessponse('NOT_FOUND', 'Không tìm thấy thông tin học viên'));
    }
}