import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from './entities/query.entity'

@Injectable()
export class QueryService {
  constructor(
    @InjectModel(Query.name)
    private queryModel: Model<Query>
  ) { }



  async createQuery(dto: CreateQueryDto) {
    const query = await this.queryModel.create(dto);
    return {
      message: 'query created successfully',
      query
    }
  }

  async findAll() {
    return await this.queryModel.find().populate('service', 'title');
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} query`;
  // }

  // update(id: number, updateQueryDto: UpdateQueryDto) {
  //   return `This action updates a #${id} query`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} query`;
  // }
}
