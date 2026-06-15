import { Module } from '@nestjs/common';
import { Services } from './services.service';
import { ServicesController } from './services.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schema/service.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Service.name,
        schema: ServiceSchema
      }
    ])
  ],
  controllers: [ServicesController],
  providers: [Services],
})
export class ServicesModule { }
