import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Role } from 'src/admins/schemas/admin.schema';
import { CreateProvideserviceDto } from './dto/create-provideservice.dto';
import { Provideservice } from './entities/provideservice.entity';


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
        description,
        images: images,
        createdBy: admin.userId,
      })



    }

    catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll(userId: string, admin) {
    try {
      //const admin = this.AdminModel.find()
      if (admin.role === Role.SUPER_ADMIN)
        return this.serviceModel.find().populate("createdBy", "name email");
      const service = this.serviceModel.find({ createdBy: userId }).populate('createdBy', 'name email');
      return service
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  // update(id: number, updateServiceDto: UpdateServiceDto) {
  //   return `This action updates a #${id} service`;
  // }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}