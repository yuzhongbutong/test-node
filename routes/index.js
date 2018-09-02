var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/sse', function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    var timer = setInterval(() => {
        var date = new Date();
        console.log(date);
        res.write('data: {"date": "' + date + '"}\n\n');
    }, 2000);
    req.connection.addListener('close', () => {
        clearInterval(timer);
        console.log('====CLOSE====');
    }, false);
});

module.exports = router;
