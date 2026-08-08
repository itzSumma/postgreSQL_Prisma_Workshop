import { Router } from "express";


const router =Router();

router.post("/products", async (req, res) => {
    try{
       const productData= req.body;
const data= await prisma.product.create(ProductData);
res.json({
    success: true,
    message: "Product created successfully",
    data: data
}); 
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error creating product",
            data: null
        });
    }

})