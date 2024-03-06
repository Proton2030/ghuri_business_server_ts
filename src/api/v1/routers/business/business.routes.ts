import express from 'express';
import multer from 'multer';
import { createBusiness, deleteBusinessById, editBusinessStatusById, getBusiness, getFilteredBusiness } from '../../controllers/business/business.controller';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getBusiness', getBusiness); 
router.get('/getFilteredBusiness', getFilteredBusiness); 

router.post('/postBusiness', upload.any(), createBusiness); 

router.patch('/editBusiness', editBusinessStatusById); 

router.delete('/deleteBusiness', deleteBusinessById); 

module.exports = router ;
