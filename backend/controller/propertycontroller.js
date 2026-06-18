import { Property } from "../models/property.js" 
import { errorHandler } from "../utils/error.js"
export const createProperty = async (req,res,next) => {
  try {
    const propertyData = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      regularPrice: req.body.regularPrice,
      discountPrice: req.body.discountPrice || 0,
      bathrooms: req.body.bathrooms,
      bedrooms: req.body.bedrooms,
      furnished: req.body.furnished,
      parking: req.body.parking,
      type: req.body.type || 'rent',
      offer: req.body.offer || false,
      imageUrls: req.body.imageUrls || [],
      userRef: req.userId,
    };

    const property = await Property.create(propertyData);
    return res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty  = async (req, res, next) => {
  try {
    const  property  = await Property.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, 'Listing not found'));
    }
    if (req.userId !== property.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings'));
    }
    await Property.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Listing has been deleted' });
  } catch (error) {
    next(error);
  }
};



export const getMyListings = async (req, res, next) => {
  try {
    const userId = req.userId;
    const listings = await Property.find({ userRef: userId });
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, 'Listing not found'));
    }
    return res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, 'Listing not found'));
    }
    if (req.userId !== property.userRef) {
      return next(errorHandler(401, 'You can only update your own listings'));
    }
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};
   //  searchh Logic 
    export const  searchListings  = async (res,req,next) =>{ 
    try {
        const  limit  =  parseInt(req.query.parse) || '9'  
       const startIndex  =  parseInt(req.query.startIndex) || '0'
         
        let offer =  req.query.offer 
        let furnished  =  req.query.furnished
  
        let parking =  req.query.parking
 
          if(offer === undefined || offer === 'false') {
          offer = { $in : [false,true]}
         }
          if(furnished === undefined || furnished === 'false') {
          furnished = { $in : [false,true]}
         }
          if(parking === undefined || parking === 'false') {
          parking = { $in : [false,true]}
         }
          const searchTerm =  req.query.searchTerm || ''
           const sort = req.query.sort || 'createdAt'
           const order = req.query.order || 'desc'
             const property =  await Property.find({
               name: {$regex:  searchTerm  , $options: 'i'  } ,
                offer, 
                 furnished  ,
                  parking
    }) 
     .sort({ [sort] :order})
     .limit(limit)
      .skip(startIndex)
       return res.status(200).json(property)
     
      } catch (error) {
      next(error)
    }
    }