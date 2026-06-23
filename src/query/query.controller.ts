import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/admins/schemas/admin.schema';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) { }

  @Post('create-query')
  create(@Body() dto: CreateQueryDto) {
    return this.queryService.createQuery(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  @Get('fetchAll-query')
  findAll() {
    return this.queryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.queryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
  //   return this.queryService.update(+id, updateQueryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.queryService.remove(+id);
  // }
}
