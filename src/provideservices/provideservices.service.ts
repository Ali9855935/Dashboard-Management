import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Role } from 'src/admins/schemas/admin.schema';
import { CreateProvideserviceDto } from './dto/create-provideservice.dto';
import { Provideservice } from './entities/provideservice.entity';
import { UpdatePropertyDto } from 'src/properties/dto/update-property.dto';
import { UpdateProvideserviceDto } from './dto/update-provideservice.dto';


@Injectable()
export class ProvideServices {
  constructor(
    @InjectModel(Provideservice.name)
    private serviceModel: Model<Provideservice>,
  ) { }


  async createService(dto: CreateProvideserviceDto, files: Express.Multer.File[], admin) {
    try {
      const images = files.map(e =>
        e.filename
      )

      let finalFeatures: string[] = [];

      if (dto.features) {
        if (typeof dto.features === 'string') {
          finalFeatures = (dto.features as string).split(',').map(f => f.trim());
        } else if (Array.isArray(dto.features)) {
          finalFeatures = dto.features;
        }
      }

      return await this.serviceModel.create({
        ...dto,
        features: finalFeatures,
        images: images,
        createdBy: admin.userId,
      })

    }

    catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(userId: string, admin: any) {
    try {
      if (admin.role === Role.SUPER_ADMIN) {
        // Sabhi admins ki services
        return this.serviceModel.find().populate('createdBy', 'name role');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid User ID');
      }

      // Normal admin
      return this.serviceModel
        .find({ createdBy: new Types.ObjectId(userId) })
        .populate('createdBy', 'name role');

    } catch (error) {
      // console.log(error);

      // Agar error pehle se BadRequestException hai, toh use waise hi throw karein
      throw new BadRequestException("Something went wrong");
    }
  }


  async publicServices() {
    return this.serviceModel.find();

  }

  async update(id: string, dto: UpdateProvideserviceDto, admin, files: Express.Multer.File[]) {


    // 1. Check karo ki service exist karti hai ya nahi
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException('Services Not Found');
    }
    if (files && files.length > 0) {
      const fileNames = files.map(file => file.filename);
      dto.images = fileNames;
    }
    const updatedService = await this.serviceModel.findByIdAndUpdate(id, dto, { new: true });
    return {
      message: 'Services updated successfully By SuperAdmin',
      update: updatedService
    };
  }

  async remove(id: string, admin) {
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    if (admin.role === Role.SUPER_ADMIN && service.createdBy.toString() !== admin.userId) {
      throw new BadRequestException('Admin Not allowed for Deleted service');
    }
    const deletedService = await this.serviceModel.findByIdAndDelete(id);
    return {
      message: 'Service DeletedBy SuperAdmin',
      deletedService
    }
  }


}