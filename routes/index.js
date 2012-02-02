
/*
 * GET home page.
 */
var sechash = require('sechash')
  , User    = require('../lib/model').User;

exports.getIndex = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.postIndex = function(req, res){
  try {
    if (req.body && req.body.email && req.body.pass) {
      // Find user by email
      User.find({email: req.body.email}, function (err, users) {
        if (err) throw "[ERROR] User find err";
        if (users.length == 0) {
          // New user
          var hash = sechash.strongHashSync('md5', req.body.pass);  // random salt
          var user = new User();
          user.email      = req.body.email;
          user.hash       = hash;
          user.created_at = new Date();
          user.save(function (err) {
            if (err) throw "[ERROR] User save error.";
            res.send("New user added!");
          });
        } else if (users.length == 1) {
          // Known user
          if (sechash.testHashSync(req.body.pass, users[0].hash)) {
            res.send("Login success");
          } else {
            res.send("Login failed.");
          }
        } else {
          throw "[ERROR] Found users with same email";
        }
      });
    } else {
      throw "[ERROR] No post body"
    } 
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error');
  }
};
