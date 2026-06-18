import express from 'express'
import { updateProperty, createProperty, getProperty, deleteProperty  ,getMyListings} from "../controller/propertycontroller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/create-property', verifyToken, createProperty)
router.get('/propertycontroller/my-listings', verifyToken, getMyListings) // to be added in controller
router.get('/get/:id', getProperty)
router.put('/update/:id', verifyToken, updateProperty)
router.delete('/listings/:id', verifyToken, deleteProperty)

export default router

