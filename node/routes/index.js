let express = require('express');
let router = express.Router();

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

let PhotoSchema = new Schema({
  PhotoId: String,
  title: String,
  image: String,
  address: String,
  description: String
}, { collection: 'Photos' });

let Photos = oldMong.model('Photos', PhotoSchema);

// Admin server page
router.get('/', async function (req, res, next) {
  res.render('index');
});




// Crud
router.post('/createPhoto', async function (req, res, next) {
  let retVal = { response: "fail" }
  await Photos.create(req.body,
    function (err, res) {
      if (!err) {
        retVal = { response: "success" }
      }
    }
  )
  res.json(retVal);
});

// cRud   Should use GET . . . we'll fix this is Cloud next term
router.post('/readPhoto', async function (req, res, next) {
  let data;
  if (req.body.cmd == 'all') {
    data = await Photos.find().lean()
  }
  else {
    data = await Photos.find({ _id: req.body._id }).lean()
  }
  res.json({ Photos: data });
})

// crUd   Should use PUT . . . we'll fix this is Cloud next term
router.post('/updatePhoto', async function (req, res, next) {
  let retVal = { response: "fail" }
  await Photos.findOneAndUpdate({ _id: req.body._id }, req.body,
    function (err, res) {
      if (!err) {
        retVal = { response: "success" }
      }
    }
  )
  res.json(retVal);
});

// cruD   Should use DELETE . . . we'll fix this is Cloud next term
router.post('/deletePhoto', async function (req, res, next) {
  let retVal = { response: "fail" }
  await Photos.deleteOne({ _id: req.body._id },
    function (err, res) {
      if (!err) {
        retVal = { response: "success" }
      }
    }
  )
  res.json(retVal);
});





router.post('/getPhotos', async function (req, res, next) {
  const Photos = await getPhotos();
  res.json(Photos);
});

async function getPhotos() {
  data = await Photos.find().lean();
  return { Photos: data };
}

router.post('/savePhoto', async function (req, res, next) {
  const Photos = await savePhoto(req.body);
  res.json(Photos);
});

async function savePhoto(thePhoto) {
  console.log('thePhoto: ' + thePhoto);
  await Photos.create(thePhoto,
    function (err, res) {
      if (err) {
        console.log('Could not insert new photo')
        return { savePhotoResponse: "fail" };
      }
    }
  )
  return { savePhotoResponse: "success" };
}

module.exports = router;