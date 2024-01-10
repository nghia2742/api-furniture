const User = require('../model/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../controller/middlewareController');
const saltRounds = 10;

const authController = {
    index: async (req, res) => {
        res.status(200).json(req.user);
    },

    login: async (req, res) => {
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare password together
        const hash = user.password;
        const checkPassword = bcrypt.compareSync(data.password, hash);
        if (!checkPassword)
            return res.status(401).json({ message: 'Wrong password' });

        const { password, ...infoUser } = user._doc;
        res.status(200).json(infoUser);

        // const { password, ...infoUser } = user._doc;
        // const accessToken = generateToken(infoUser);
        // const optCookie = {
        //     maxAge: 5*60*1000,
        //     httpOnly: true,
        //     sameSite: 'None',
        //     secure: true,
        // }
        // res.cookie('access_token', accessToken, optCookie);
        // res.status(200).json({ accessToken, optCookie });
    },

    register: async (req, res) => {
        const data = req.body;
        // Checking existed user
        const userExist = await User.findOne({ email: data.email });
        if (userExist) {
            return res.status(409).json({ message: 'Email existed' });
        }

        // Creating a new user
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data.password, salt);
        const newUser = new User({ ...data, password: hash });
        await newUser.save();
        res.status(201).json({ message: 'Created new account' });
    },

    logout: async (req, res) => {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'Deleted access token' });
    },
};

module.exports = authController;
