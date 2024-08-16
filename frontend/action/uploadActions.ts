'use server';

import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const saveToLocal = async (data: FormData) => {
  const images = data.getAll('images');
  const multipleBuffersPromise = images.map((image) => {
    if (image instanceof File) {
      image.arrayBuffer().then((data) => {
        const buffer = Buffer.from(data);
        const name = uuidv4();
        const ext = image.type.split('/')[1];

        const tempDir = os.tmpdir();
        const uploadDir = path.join(tempDir, `${name}.${ext}`);
        fs.writeFile(uploadDir, buffer);
        return { filepath: uploadDir, filename: image.name };
      });
    }
  });

  return await Promise.all(multipleBuffersPromise);
};

const saveToCloud = async (newFiles: any) => {
  const multiplePhotoPromise = newFiles.map((file: any) =>
    cloudinary.uploader.upload(file.filepath, { folder: 'TechHubs' })
  );
  return await Promise.all(multiplePhotoPromise);
};

export const uploadPhoto = async (data: FormData) => {
  try {
    //save to temp file
    const newImages = await saveToLocal(data);

    //upload to cloudinary
    const photos = await saveToCloud(newImages);

    //delete from temp file after upload
    // newImages.map((file: any) => fs.unlink(file.filepath));

    return { msg: 'Upload successfull' };
  } catch (error: any) {
    return { err: error.message };
  }
};
