import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { Services } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
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

@Controller('services')
export class ServicesController {
  constructor(private readonly Service: Services) { }

  @Post()
  @ApiTags('Create-Services')
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
      required: ['title', 'description', 'images'],
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)

  create(@Body() dto: CreateServiceDto, @Req() req, @UploadedFiles() file: Express.Multer.File[]) {
    return this.Service.createService(dto, file, req.user);
  }

  @Get()
  @ApiTags('getAllServices')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  findAll(@Req() req) {
    return this.Service.findAll(req.user, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.Service.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Service.remove(+id);
  }
}




