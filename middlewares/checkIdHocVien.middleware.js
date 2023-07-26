const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");
const HocVien = require("../models/hocvien.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.checkIdHocVien = async (req, res, next) => {
    let id = req.query.id;
    // Các cách lấy dữ liệu theo id
    // HocVien.findById(id); => {}
    // HocVien.findOne({_id: id}); => {}
    // HocVien.find({_id: id}); => []
    // open connect
    try {
        await HocVien.findById(id);
        next();
    } catch (error) {
        res.status(404).json(new BaseRessponse(ResponseCode.STUDENT_NOT_FOUND, ResponseMessage.STUDENT_NOT_FOUND));
    } finally {
        // luôn được chạy
        // close connect
        console.log('finally');
    }
}