
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/admins/schemas/admin.schema';
import { Roles } from 'src/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { extname, resolve } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateProvideserviceDto } from './dto/create-provideservice.dto';
import { ProvideServices } from './provideservices.service';
import { UpdateProvideserviceDto } from './dto/update-provideservice.dto';

@Controller('provideservices')
export class ProvideservicesController {
  constructor(private readonly provideservicesService: ProvideServices) { }

  @Post('create-Service')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const targetPath = resolve(process.cwd(), 'uploads');
          if (!existsSync(targetPath)) {
            mkdirSync(targetPath, { recursive: true });
          }
          cb(null, targetPath);
        },
        filename: (_req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        catagory: { type: 'string' },


        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      },
      required: ['title', 'description', 'catagory', 'images'],
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() dto: CreateProvideserviceDto, @Req() req, @UploadedFiles() file: Express.Multer.File[]) {
    return this.provideservicesService.createService(dto, file, req.user);
  }

  //Protected Api
  @Get('fetchAllServices')
  @ApiTags('getAllServices')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  findAll(@Req() req) {
    return this.provideservicesService.findAll(req.user.userId);
  }

  @Get('public')
  @ApiTags('getAllServices')
  findAl(@Req() req) {
    return this.provideservicesService.publicServices();
  }



  @Delete('deletdServices/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string, @Req() req) {
    return this.provideservicesService.remove(id, req.user.userId);
  }



  @Patch('updateServices/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const targetPath = resolve(process.cwd(), 'uploads');
          if (!existsSync(targetPath)) {
            mkdirSync(targetPath, { recursive: true });
          }
          cb(null, targetPath);
        },
        filename: (_req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProvideserviceDto,
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    // ORDER: 1. id, 2. dto, 3. user object, 4. files array
    return this.provideservicesService.update(id, dto, req.user, files);
  }
}




