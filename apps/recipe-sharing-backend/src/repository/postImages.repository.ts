import { myDataSource } from "../app-data-source";
import handleUpload from "../cloudinary/cloudinary.config";
import PostImages from "../entities/PostImages";

export const PostImagesRepository = myDataSource
  .getRepository(PostImages)
  .extend({
    async uploadImages(images, postId) {
      const filesUrls = [];
      try {
        if (Array.isArray(images)) {
          for (let i = 0; i < images.length; i++) {
            const b64 = Buffer.from(images[i].data).toString("base64");
            let dataURI = "data:" + images[i].mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI);
            const image: PostImages = this.create({
              url: cldRes.secure_url,
              post: postId,
            });
            await this.save(image);
            filesUrls.push(cldRes.secure_url);
          }
        } else {
          const b64 = Buffer.from(images.data).toString("base64");
          let dataURI = "data:" + images.mimetype + ";base64," + b64;
          const cldRes = await handleUpload(dataURI);
          const image: PostImages = this.create({
            url: cldRes.secure_url,
            post: postId,
          });
          await this.save(image);
          filesUrls.push(cldRes.secure_url);
        }

        return filesUrls;
      } catch (error) {
        return { error: error.message };
      }
    },
  });
