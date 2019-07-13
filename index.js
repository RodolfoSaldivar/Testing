require('./server/app');

// const path = require('path');
// const multer = require('multer');
// const express = require('express');

// const storage = multer.diskStorage({
// 	destination: './public/images/',
// 	filename: function(req, file, cb) {
// 		cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
// 	}
// });

// const upload = multer({
// 	storage: storage,
// 	limits: { fileSize: 1000000 }
// }).single('myImage');

// const app = express();

// app.use('/api/images', express.static(path.join(__dirname, '/public')));

// app.post('/api/upload', function(req, res) {
// 	upload(req, res, function(err) {
// 		console.log('Request ---', req.body);
// 		console.log('Request file ---', req.file); //Here you get file.
// 		/*Now do where ever you want to do*/
// 		if (!err) {
// 			return res.send(200).end();
// 		}
// 	});
// });

// app.listen(process.env.PORT || 5000);
