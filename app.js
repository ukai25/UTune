const   express     = require("express"),
        app         = express(),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        passport    = require('passport'),
        LocalStrategy = require('passport-local'),
        flash       = require('connect-flash'),
        methodOverride = require('method-override'),
        User        = require('./models/user'),
        Artist      = require("./models/artist");
        Music       = require("./models/music");
        Song        = require("./models/song");
        Trending    = require("./models/trending");
        seedDB      = require('./seeds.js');

const   indexRoutes = require('./routes/index');
        artistRoutes = require('./routes/artist');
        userRoutes  = require("./routes/user")


mongoose.connect('mongodb://localhost/Utune');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})


app.use('/', indexRoutes);
app.use('/artist', artistRoutes);
app.use('/user', userRoutes);



app.listen(3000, function(){
    console.log("Activated");
});