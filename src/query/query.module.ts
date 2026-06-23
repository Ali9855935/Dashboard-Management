import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { querySchema, Query } from './entities/query.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Query.name, schema: querySchema }
  ])],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule { }
