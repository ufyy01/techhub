'use server';

import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveToLocal = async (data: FormData) => {
  const images = data.getAll('images');
  const multipleBuffersPromise = images.map(async (image) => {
    if (image instanceof File) {
      const data = await image.arrayBuffer();
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = image.type.split('/')[1];

      // const uploadDir = path.join(process.cwd(), 'public', `/${name}.${ext}`); //Doesn't work in vercel

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);

      return { filepath: uploadDir, filename: image.name };
    }

    return null;
  });

  const result = await Promise.all(multipleBuffersPromise);

  return result;
};

const saveToCloud = async (newFiles: any) => {
  const multiplePhotoPromise = newFiles.map((file: any) =>
    cloudinary.uploader.upload(file.filepath, { folder: 'TechHubs_upload' })
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
    newImages.map((file: any) => fs.unlink(file.filepath));

    interface Photo {
      public_id: string;
      secure_url: string;
    }
    const newPhotos: Photo[] = [];

    photos.map((photo) => {
      newPhotos.push({
        public_id: photo.public_id,
        secure_url: photo.secure_url,
      });
    });

    return { msg: 'Upload successfull', newPhotos };
  } catch (error: any) {
    return { err: error.message };
  }
};
