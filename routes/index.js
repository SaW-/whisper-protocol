var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var nickName = process.argv[2] || "Nick Name";
  var encryptionType = process.argv[3] || "asym";
  var topic = process.argv[4] || "test-topic";

  var data = {
    nickName : nickName,
    encryptionType : encryptionType,
    topic : topic
  }
  

  res.render('index',data);
});

module.exports = router;
