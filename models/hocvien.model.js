const { default: mongoose } = require("mongoose");

const HocVien = mongoose.model('HocVien', new mongoose.Schema({
    name: String,
    address: String,
    age: Number,
    avg: Number,
    createdAt: Date,
    createdBy: String,
    updatedAt: Date,
    updatedBy: String,
}));

module.exports = HocVien;