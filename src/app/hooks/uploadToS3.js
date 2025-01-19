import { useState } from "react";
import AWS from "aws-sdk";
import config from "../config";

const useS3Upload = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Configure AWS S3
    AWS.config.update({
        accessKeyId: config.s3Key, // Replace with your AWS Access Key
        secretAccessKey: config.s3KeySecret, // Replace with your AWS Secret Key
        region: config.s3Region, // Replace with your AWS region (e.g., "us-east-1")
    });

    const s3 = new AWS.S3();

    const getFileBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const buffer = Buffer.from(reader.result); // Create a Buffer from ArrayBuffer
                resolve(buffer);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
        });
    };


    const uploadToS3 = async (file) => {
        setUploading(true);
        setError(null);
        console.log({ file, s3 })
        if (!file) {
            setUploading(false);
            setError("No file provided!");
            return null;
        }
        const bufferedFile = await getFileBuffer(file);
        const params = {
            Bucket: config.s3Bucket,
            Key: `images/${Date.now()}-${file.name}`,
            Body: bufferedFile,
            ContentType: file.type,
        };

        try {
            const uploadResponse = await s3.upload(params).promise();
            console.log({ uploadResponse })
            return uploadResponse.Location; // Return the file URL
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Error uploading file. Check the console for details.");
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadToS3, uploading, error };
};

export default useS3Upload;
