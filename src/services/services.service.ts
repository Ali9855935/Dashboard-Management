import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schema/service.schema';
import { Model } from 'mongoose';
import { Role } from 'src/admins/schemas/admin.schema';

@Injectable()
export class Services {
  AdminModel: any;
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
  ) { }


  async createService(dto: CreateServiceDto, files: Express.Multer.File[], admin) {
    try {
      const images = files.map(e =>
        e.filename
      )
      const description = Array.isArray((dto as any).description)
        ? (dto as any).description
        : [(dto as any).description].filter(Boolean)

      return this.serviceModel.create({
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
      const services = this.serviceModel.find({ createdBy: userId }).populate('createdBy', 'name email');
      return { services }
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
