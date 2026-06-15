import { Module } from '@nestjs/common';
import { ProvideServices } from './provideservices.service';
import { ProvideservicesController } from './provideservices.controller';
import mongoose from 'mongoose';
import { Provideservice, provideServicesSchema } from './entities/provideservice.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Provideservice.name,
        schema: provideServicesSchema,
      },
    ]),
  ],
  controllers: [ProvideservicesController],
  providers: [ProvideServices],
})
export class ProvideservicesModule { }
