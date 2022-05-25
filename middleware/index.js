const   user = require('../models/user');

const   middlewareObj = {};

middlewareObj.checkUserOwner = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                res.redirect('back');
            } else {
                if(foundUser.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "Please login");
        res.redirect('/login');    
    }
}
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to login first');
    res.redirect('/login');
}

module.exports = middlewareObj;