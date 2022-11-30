const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
var MongoDBStore = require('connect-mongodb-session')(session)

const {verifyJWT} = require('./utils/auth')
const Config = require('./config')

const login = require('./routes/login')
const customer = require('./routes/customer')
const delivery_partner = require('./routes/delivery_partner')
const admin = require('./routes/admin')
const { FRONTEND_HOST } = require('./config')

const PORT = Config.PORT;
const DB_URL = Config.DB_URL;
const HOST =  Config.SERVER_HOST;

const app = express();


app.use(cors({
    // origin: [FRONTEND_HOST],
    methods: ['GET', 'POST', 'PATCH', 'DELETE','OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isAuth = (req, res, next) => {

    console.log(req.session.id);

    if (req.session.isAuth) next();
    else return res.status(440).send({status:false, message:"Session expired. Please login"});
}

const store = new MongoDBStore({
    uri: DB_URL,
    collection: 'mysessions',
    databaseName: 'shipments'
})


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to mongoDB');
    })

app.use(session({
    secret: Config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 365*60*60*1000,
    },
    store: store
}, (err) => {
    console.log('Saving Session Failed!!')
    console.log(err);
}))


app.get("/", async (req, res, next) => {
    console.log(req.session)

    // req.session.isAuth = true;
    res.send("Backend")
})


app.use("/app", login)
app.use('/customer', isAuth, verifyJWT, customer)
app.use('/delivery_partner', isAuth, verifyJWT, delivery_partner)
app.use('/admin', isAuth, verifyJWT, admin)


app.use(function (err, req, res, next) {

    if (err.name === 'JsonSchemaValidation') {

        console.log(err.message);
        // logs "express-jsonschema: Invalid data found"

        // Set a bad request http response status 
        res.status(406);

        console.log(err.validations);

        // Format the response body 
        responseData = {
            status: false,
            message: err.validations.body ? err.validations.body[0].messages[0] : err.validations.query[0].messages[0]
        };

        // Take into account the content type if your app serves various content types
        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            // If this is an html request then you should probably have
            // some type of Bad Request html template to respond with
            res.send({ status: false, message: "Invalid content-type." });
        }
    } else {
        // pass error to next error middleware handler
        next(err);
    }

})


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`)
})

