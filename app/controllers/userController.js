const User = require('../models/userModel');

class UserController {
    async index(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            res.status(500).json({ Message: 'Error user' });
        }
    }

    async createUser(req, res) {
        try {
            const email = req.body.email
            const isUser = await User.findOne({email});
            if (isUser) {
                return res.status(404).json({ Message: "Email existed" });
            }
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ Message: err });
        }
    }
}

module.exports = new UserController();
