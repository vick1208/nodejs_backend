import express from "express";

import { single, multiple } from "./middlewares/upload.middleware";
import { handleUpload } from "./utils/cloudinary";

const router = express.Router();


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
        console.error("Error uploading a file:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }

});
router.post("/upload/multiple", multiple, async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Files are required"
            });
        }
        const filesArr = req.files as Express.Multer.File[];


        const uploadedFileUrls: string[] = [];

        for (const file of filesArr) {
            const result = await handleUpload(file.buffer, file.originalname);
            uploadedFileUrls.push(result.secure_url);
        }

        res.status(200).json({
            status:200,
            result: uploadedFileUrls,
            message: "Multiple Files Uploaded"
        });
    } catch (error) {
        console.error("Error uploading multiple files :", error);

        res.status(500).json({ error: "Internal server error" });
    }

});

export default router;
