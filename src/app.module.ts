import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PropertiesModule } from './properties/properties.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProvideservicesModule } from './provideservices/provideservices.module';
import { QueryModule } from './query/query.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get<string>('MONGO_URI'),
      };
    }
  }), CommonModule, PropertiesModule, AdminsModule, AuthModule, ProvideservicesModule, QueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
