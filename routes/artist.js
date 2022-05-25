const   express = require('express'),
        router  = express.Router(),
        multer  = require('multer'),
        path    = require('path'),
        coverStorage        = multer.diskStorage({
            destination: function(req, file, callback){
                callback(null,'./public/uploads/covers/');
            },
            filename: function(req, file, callback){
                callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        }),
        imageFilter         = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only JPG, JPEG, PNG and GIF image files allowed!'), false);
            }
            callback(null, true);
        },
        audioStorage        = multer.diskStorage({
            destination: function(req, fule, callback){
                callback(null, './public/uploads/audios/');
            },
            filename: function(req, file, callback){
                callback(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
            }
        }),
        audioFilter         = function(req, file, callback){
            if(!file.originalname.match(/\.(mp3)$/i)){
                return callback(new Error('Only MP3 audio files allowed!'), false);
            }
            callback(null, true);
        },
        coverUploads        = multer({storage: coverStorage, fileFilter: imageFilter}),
        audioUploads        = multer({storage: audioStorage, fileFilter: audioFilter}),
        middleware = require('../middleware'),
        Artist  = require('../models/artist'),
        User    = require('../models/user')
        passport= require('passport');

// router.get("/", function(req, res){
//     res.render("artist/artist.ejs");
// });

router.get("/login", function(req, res){
    res.render("artist/login_art.ejs");
});

router.get("/signup", function(req, res){
    res.render("artist/signup_art.ejs");
});

router.post("/login", passport.authenticate('local',{
    successRedirect: '/artist/home',
    failureRedirect: '/artist/login',
    successFlash: true,
    failureFlash: true,
    successFlash: 'Successfully logged in',
    failureFlash: 'Invalid username or password'
    }), function(req, res){
});

router.post("/signup", function(req, res){
    var newArtist = new Artist({username: req.body.username, 
                                fullname: req.body.fullname,
                                email: req.body.email,
                                status: 'artist'});
    User.register(newArtist, req.body.password, function(err, artist){
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/signup');
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Registered successfully');
                res.redirect('/artist/home');
            })
        }
    });
})

router.get("/home",  isLoggedIn, function(req, res){
    let id = req.params.artistId;
    res.render("artist/artist_home.ejs",{id});
});

router.post("/home", isLoggedIn, coverUploads.single('cover'), audioUploads.single('audio'), function(req, res){
    req.body.music.cover = '/coverUploads/'+ req.file.filename;
    req.body.music.audio = '/audioUploads/'+ req.file.filename;
    req.body.music.author = {
        artistId: req.user._id,
        artistName: req.user.username,
        title: req.body.music.title,
        lyrics: req.body.music.lyrics,
    };
    Music.create(req.body.music, function(err, music){
        if(err){
            console.log(err);
        } else {
            res.redirect("/success");
        }
    });
})

router.get("/success", function(req,res){
    res.render("artist/artist_success.ejs")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You need to log in first!");
    res.redirect('/login');
}

module.exports = router;