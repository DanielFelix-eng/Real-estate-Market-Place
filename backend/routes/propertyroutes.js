import express from 'express'
import {
  updateProperty,
  createProperty,
  getProperty,
  deleteProperty,
  getMyListings,
  searchListings,
} from "../controller/propertycontroller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/create-property', verifyToken, createProperty)
router.get('/my-listings', verifyToken, getMyListings)
router.get('/get/:id', getProperty)
router.put('/update/:id', verifyToken, updateProperty)
router.delete('/listings/:id', verifyToken, deleteProperty)
router.get('/search', searchListings)
export default router


