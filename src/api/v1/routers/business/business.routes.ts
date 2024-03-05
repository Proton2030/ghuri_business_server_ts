import express from 'express';
import multer from 'multer';
import { createBusiness, getBusiness } from '../../controllers/business/business.controller';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/postBusiness', upload.any(), createBusiness); 
router.get('/getBusiness', getBusiness); 

module.exports = router ;
