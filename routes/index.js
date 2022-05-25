
const   express = require('express'),
        router  = express.Router(),
        passport= require('passport'),
        multer  = require('multer'),
        path    = require('path'),
        storage = multer.diskStorage({
            destination: function(req, file, callback){
                callback(null,'./public/upload/');
            },
            filename: function(req, file, callback){
                callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
            }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png and gif.'), false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
        User    = require('../models/user');
        Artist  = require('../models/artist');
        Song    = require("../models/song");
        Trending = require("../models/trending");

router.get("/", function(req, res){
    Artist.find({}, function(err, allArtist){
        if(err){
            console.log(err)
        }else{
            res.render("home/landing.ejs",{artist:allArtist});
        }
    })
});

router.get("/home", function(req, res){
    Artist.find({}, function(err, allArtist){
        if(err){
            console.log(err)
        }else{
            res.render("home/landing.ejs",{artist:allArtist});
        }
    })
});

router.get("/trending", function(req, res){
    Trending.find({}, function(err, allTrending){
        if(err){
            console.log(err)
        }else{
            res.render("home/trending.ejs",{trending:allTrending});
        }
    })
});

router.get("/artist", function(req, res){
    res.render("artist/artist.ejs");
});

router.get('/search/:word',function(req, res){
    res.render('home/search.ejs');
});

router.post('/search',function(req,res){
    let searchword = req.body.word;
    Song.find({song:{$regex : searchword,$options : 'i'}}).exec(function(err, allSearch){
        if(err){
            console.log(err);
            return res.redirect('/');
        }else{
            res.render('home/search.ejs', {song : allSearch});
        }
    })
});

router.get("/login", function(req, res){
    res.render("home/login.ejs");
});

router.post("/login", passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true,
    successFlash: 'Successfully logged in',
    failureFlash: 'Invalid username or password'
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logOut();
    res.redirect('/home');
})

router.get("/signup", function(req, res){
    res.render("home/signup.ejs");
});

router.post("/signup", upload.single('profileImage'), function(req, res){
    req.body.profileImage = '/upload/'+ req.file.filename;
    var newUser = new User({username: req.body.username, 
                            fullname: req.body.fullname, 
                            email: req.body.email,
                            profileImage: req.body.profileImage,
                            status: 'user'});
    if(req.body.admincode === 'topsecret'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/signup');
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Registered successfully');
                res.redirect('/home');
            })
        }
    });
})

router.get('/:id', function(req, res){
    Trending.findById(req.params.id, function(err, foundTrending){
        if(err){
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        } else {
            res.render('home/description.ejs',{ trending: foundTrending});
        }
    });
});

module.exports = router;
