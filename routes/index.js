const productRouter = require('./product');
const authRouter = require('./auth');

const middlewareController = require('../app/controller/middlewareController')

function connection(app) {
    
    app.use('/products', productRouter);

    app.use('/auth', authRouter);
    
    app.use('/user', middlewareController.isAccessToken, (req, res) =>{
        res.json(req.user)
    })

    app.use('/', (req, res) => res.send('Homepage'));

}

module.exports = { connection };
