const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');
const routes = require('./routes/router');
require('dotenv').config();


// set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');


// mongoose.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });
    
// Set up session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: false }));
        
// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(routes);


// const PORT = process.env.PORT || 3000;

// Set up express server
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});

UserDetails.register({username:'nemo', active:false}, '123');