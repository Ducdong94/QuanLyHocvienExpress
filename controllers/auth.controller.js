const { default: mongoose } = require("mongoose");
const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/api.route");


const AuthController = {
    signUp: async (req, res, next) => {
        try {
            // Lấy req body
            let body = req.body;

            // Validate body data

            // Kiểm tra trong username trong db 
            let existed = await User.findOne({ username: body.username });
            if (existed) {
                res.status(500).json(new BaseRessponse(ResponseCode.USER_EXISTED, ResponseMessage.USER_EXISTED));
                return;
            }

            // Khởi tạo model
            let user = new User({
                username: body.username,
                password: body.password,
                salt: '',
                email: body.email,
                phone: body.phone,
                status: true,
                createdBy: body.username,
                createdDate: req.currentDate,
                updatedBy: body.username,
                updatedDate: req.currentDate
            });

            // Lưu vào db
            let data = await user.save();

            // let token = this.generateToken(data);
            console.log(token);
            // Response
            res.status(201).json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, data));

        } catch (error) {
            console.log(error);
            res.status(500).json(new BaseRessponse(ResponseCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR));
        }
    },
    signIn: async (req, res, next) => {
        // lấy req body
        let body = req.body;
        // lấy trong db ra bản ghi có username = body.username
        let user = await User.findOne({ username: body.username });
        if (!user) {
            res.status(404).json(new BaseRessponse(ResponseCode.USER_NOT_EXISTED, ResponseMessage.USER_NOT_EXISTED));
            return;
        }
        // kiểm tra mật khẩu
        let pwdInDb = user.password;
        let pwd = body.password;
        if (!bcrypt.compareSync(pwd, pwdInDb)) {
            return res.status(401).json(new BaseRessponse(ResponseCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED));
        }
        // trả jwt cho FE
        let token = AuthController.generateToken({ username: user.username, hashed: pwdInDb });
        res.json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, { token }))
    },
    generateToken: (data) => {
        try {
            return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED_IN });
        } catch (error) {
            console.log(error);
            return '';

        }
    },
    restrictTo: (...roles) => {
        // Arguments object
        return (req, res, next) => {
            try {
                if (!roles.includes(req.user.role)) {
                    return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
                }
                next();
            } catch (error) {
                console.log(error);
            }
        }
    }
}
module.exports = AuthController;