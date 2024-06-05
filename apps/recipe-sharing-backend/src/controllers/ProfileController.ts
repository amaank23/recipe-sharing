import { NextFunction, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import CustomError from "../utils/error";
import { UserRepository } from "../repository/user.repository";
import User from "../entities/User";
import { ProfileRepository } from "../repository/profile.repository";
import handleUpload from "../cloudinary/cloudinary.config";
import { UploadedFile } from "express-fileupload";

interface bodyInterface {
  about: string;
  country: string;
  city: string;
}

export async function createProfile(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const body: bodyInterface = req.body;
    const user: User = await UserRepository.findOne({
      where: { id: req.user.data.id },
    });
    const profile = ProfileRepository.create();
    profile.user = user;

    if (body.about) {
      profile.about = body.about;
    }
    if (body.city) {
      profile.city = body.city;
    }
    if (body.country) {
      profile.country = body.country;
    }
    if (req.files && req.files.profileImage) {
      const profileImgUrl = await ProfileRepository.uploadProfileOrCover(
        req.files.profileImage
      );
      profile.profileImgUrl = profileImgUrl;
    }
    if (req.files && req.files.coverImage) {
      const coverImgUrl = await ProfileRepository.uploadProfileOrCover(
        req.files.coverImage
      );
      profile.coverImgUrl = coverImgUrl;
    }
    await ProfileRepository.save(profile);
    delete profile.user.password;
    res
      .status(201)
      .json({ message: "Profile Created Successfully!", data: profile });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export async function updateProfile(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { profileId } = req.params;
    const body: bodyInterface = req.body;
    const profile = await ProfileRepository.findOne({
      where: {
        id: profileId,
      },
    });
    if (!profile) {
      throw new CustomError(
        "Profile with assosiated id does not exist",
        404
      ).errorInstance();
    }
    if (body.about) {
      profile.about = body.about;
    }
    if (body.city) {
      profile.city = body.city;
    }
    if (body.country) {
      profile.country = body.country;
    }
    if (req.files && req.files.profileImage) {
      const profileImgUrl = await ProfileRepository.uploadProfileOrCover(
        req.files.profileImage
      );
      profile.profileImgUrl = profileImgUrl;
    }
    if (req.files && req.files.coverImage) {
      const coverImgUrl = await ProfileRepository.uploadProfileOrCover(
        req.files.coverImage
      );
      profile.coverImgUrl = coverImgUrl;
    }
    await ProfileRepository.save(profile);
    // delete profile.user.password;
    res
      .status(201)
      .json({ message: "Profile Updated Successfully!", data: profile });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { createProfile, updateProfile };
