var express = require('express');
var app = express();

// app.use(express.static('public')); // if you keep your images, CSS, and JavaScript files in a directory named public

app.get('/', function (req, res) {
   res.send('Hello World');
})

// app.get('/process_get', function (req, res) {
//     // Prepare output in JSON format
//     response = {
//        first_name:req.query.first_name,
//        last_name:req.query.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
//  })

// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post('/process_post', urlencodedParser, function (req, res) {
//     // Prepare output in JSON format
//     response = {
//        first_name:req.body.first_name,
//        last_name:req.body.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
//  })


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
