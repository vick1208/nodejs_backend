import express from "express";

import { single, multiple } from "./middlewares/upload.middleware";
import { handleUpload } from "./utils/cloudinary";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Testing");
});

router.post("/upload/single", single, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 400,
                message: "File is required"
            });
        }

        const result = await handleUpload(req.file.buffer, req.file.originalname);

        res.status(200).json({
            status: 200,
            result: result.secure_url,
            message: "Single File Uploaded"
        });

    } catch (error) {
        console.error("Error uploading:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }

});
router.post("/upload/multiple", multiple, (req, res) => {
    const files = req.files;

});

export default router;
