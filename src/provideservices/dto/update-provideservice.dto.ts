import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProvideserviceDto } from './create-provideservice.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProvideserviceDto extends PartialType(CreateProvideserviceDto) {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Give the title' })
    title!: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Give the description' })
    description!: string;


    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    images?: string[];


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Give the catagory' })
    category!: string;
}
