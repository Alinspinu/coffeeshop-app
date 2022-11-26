const express = require('express');
const router = express.Router();
const multer = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage})


const ExpressError = require('../utilities/expressError');
const { produsSchema } = require('../schema.js');

const meniu = require('../controlers/meniu')
const Produs = require('../models/produs');

const { isLoggedIn, isAdmin, validateCat, validateProdus} = require('../middleware')
const catchAsync = require('../utilities/catchasync')

const cpUpload = 
router.route('/')
    .get(catchAsync(meniu.renderMeniu))

router.route('/cats')
    .get(isAdmin,meniu.renderCatNou)
    .post(isAdmin, upload.single('catImg'), validateCat, catchAsync(meniu.catNou))
    

router.route('/cat/:id')
    .get(catchAsync(meniu.renderProduse))
    .put(isAdmin, upload.single('catImg'), validateCat, catchAsync(meniu.catEdit))
    .delete(isAdmin,catchAsync(meniu.catDelete))

router.route('/cats/produs/nou')
    .get(isAdmin,catchAsync(meniu.renderProdusNou))
    .post(isAdmin, upload.single('imagine'), validateProdus, catchAsync((meniu.produsNou)))

router.route('/cats/produs/:id')
    .get(catchAsync(meniu.renderProdusView))
    .put(isAdmin, upload.single('imagine'), validateProdus, catchAsync(meniu.produsEdit))
    .delete(isAdmin,meniu.produsDelete)

router.route('/cats/produs/:id/edit')
    .get(isAdmin,catchAsync(meniu.renderProdusEdit))

router.route('/cats/:id/edit')
    .get(isAdmin, catchAsync(meniu.renderCatEdit))

module.exports = router 
