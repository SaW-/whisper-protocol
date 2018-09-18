var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var nickName = process.argv[2];
  var password = process.argv[3];
  var encryptionType = process.argv[4];
  var topic = process.argv[5];

  var data = {
    nickName : nickName,
    password : password,
    encryptionType : encryptionType,
    topic : topic
  }
  

  res.render('index',data);
});

module.exports = router;
