const multer = require('multer');

const file_size = 1000000; // 1 mb
const destination = './server/public/images';
const filename = (req, file, cb) => {
	cb(null, `${Date.now()}-${file.originalname}`);
};

//================================================

const createStorage = (path, filename) =>
	multer.diskStorage({
		destination: `${destination}${path}`,
		filename
	});

const createMulter = (storage, fileSize) =>
	multer({
		storage,
		limits: { fileSize }
	}).single('image');

//================================================

const usersStorage = createStorage('/users', filename);
const groupsStorage = createStorage('/groups', filename);

//================================================

const userImage = createMulter(usersStorage, file_size);
const groupImage = createMulter(groupsStorage, file_size);

//================================================

module.exports = {
	userImage,
	groupImage
};
