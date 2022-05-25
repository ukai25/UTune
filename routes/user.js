const   express = require('express'),
        router  = express.Router(),
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
        middleware = require('../middleware'),
        User    = require('../models/user');

router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        } else {
            res.render('user/show.ejs',{ user: foundUser});
        }
    });
});

router.get("/:id/edit", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render('user/edit.ejs',{ user: foundUser});
        }
    });
}); 
router.post('/:id/edit',upload.single('image'), function(req, res){
    if(req.file){
        req.body.user.profileImage = '/upload/'+req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/user/'+req.params.id);
        }
    })
})

router.get('/:id/fav', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        } else {
            res.render('user/fav.ejs',{ user: foundUser});
        }
    });
});
module.exports = router;