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
      const description = Array.isArray((dto as any).description)
        ? (dto as any).description
        : [(dto as any).description].filter(Boolean)

      return await this.serviceModel.create({
        ...dto,
        images: images,
        createdBy: admin.userId,
      })



    }

    catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll(userId: string) {
    try {
      //const admin = this.AdminModel.find()
      // const objectId = new Types.ObjectId(userId);

      return this.serviceModel.find().populate('createdBy', 'name role');


    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }

  async publicServices() {
    return this.serviceModel.find();

  }

  async update(id: string, dto: UpdateProvideserviceDto, admin, files: Express.Multer.File[]) {
    // const objectId = new Types.ObjectId(id);

    // 1. Check karo ki service exist karti hai ya nahi
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException('Services Not Found');
    }

    // 2. Security Check: Agar logged-in admin iska creator nahi hai, toh block karo
    // (Agar aap chahte ho ki Super Admin kisi ki bhi service edit kar sake, toh condition me !== lagao. 
    // Agar sirf creator hi edit kar sake, toh niche waala logic best hai)
    // if (admin.role === Role.SUPER_ADMIN && service.createdBy.toString() !== admin.userId) {
    //   throw new ForbiddenException('You do not have permission to update this service');
    // }

    // 3. Handle Multiple Files: Agar nayi images aayi hain, toh array banakar DTO me daalo
    if (files && files.length > 0) {
      const fileNames = files.map(file => file.filename);
      dto.images = fileNames; // Controller ke schema me 'images' tha, isliye dto.images use kiya
    }

    // 4. Database me update karo
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