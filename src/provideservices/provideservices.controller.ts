
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

@Controller('provideservices')
export class ProvideservicesController {
  constructor(private readonly provideservicesService: ProvideServices) { }

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

  create(@Body() dto: CreateProvideserviceDto, @Req() req, @UploadedFiles() file: Express.Multer.File[]) {
    return this.provideservicesService.createService(dto, file, req.user);
  }

  @Get()
  @ApiTags('getAllServices')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  findAll(@Req() req) {
    return this.provideservicesService.findAll(req.user, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provideservicesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.provideservicesService.update(+id, updateServiceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provideservicesService.remove(+id);
  }
}




