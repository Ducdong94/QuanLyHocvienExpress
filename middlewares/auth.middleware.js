const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.protecting = async (req, res, next) => {
    try {
        // skip check với signin và signup
        console.log(req.path)
        if (req.path.endsWith('signin') || req.path.endsWith('signup')) {
            next();
            return;
        }
        // 1. lấy token từ req header
        let token;

        let auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer')) {
            // cắt chuỗi || thay đổi chuỗi
            token = auth.replace('Bearer ', '');
        }
        if (!token) {
            return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
        }
        // 2. Verify token
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);

        // let decoded = await 
        let decodePromise = new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        })
        let decoded = await decodePromise;
        console.log(decoded);
        // 3. Kiểm tra user còn tồn tại hay không
        let user = await User.findOne({ username: decoded.username });
        if (!user) {
            return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
        }
        // 3.1 user có đang active hay không
        if (!user.status) {
            return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
        }

        // 4. User đã đổi password
        let pwdInDb = decoded.hashed;
        console.log(pwdInDb);
        console.log(user.password);
        if (pwdInDb !== user.password) {
            return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN))
    }
}