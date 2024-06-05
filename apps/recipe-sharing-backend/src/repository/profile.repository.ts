import { myDataSource } from "../app-data-source";
import handleUpload from "../cloudinary/cloudinary.config";
import Profile from "../entities/Profile";

export const ProfileRepository = myDataSource.getRepository(Profile).extend({
  async uploadProfileOrCover(file: any) {
    const b64 = Buffer.from(file.data).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    return cldRes.secure_url;
  },
});
