
var models = require('../models');

exports.view = function(req, res) {
    var message = false;
    if(req.session.messages){
        message = req.session.messages.pop();
    }

    res.render('new_account', {
    	'message':message
    });

}

exports.createAccount = function(req, res) {
	if(!req.session.messages) {
        req.session.messages = [];
    } 

    if (req.body.terms!="check"){
    	req.session.messages.push(['danger','Please agree to the terms and services!']);
		res.redirect('/new_account');
    }else{

	    models.User
			.find({"username": req.body.username})
			.exec(checkUsername);

		function checkUsername(err, user) {
			if(user[0]!=null){
				req.session.messages.push(['danger','Username is taken!']);
	  			res.redirect('/new_account');
			}else{
				var newAccount = new models.User ({
	    			"username": req.body.username,
	    			"password": req.body.userPassword,
				});

				newAccount.save(afterSaving);

				function afterSaving(err) { // this is a callback
					if(err) {console.log(err); res.send(500); }
					req.session.messages.push(['success','Account created!']);
					res.redirect('/login');
				}
			}
		}
	}
}