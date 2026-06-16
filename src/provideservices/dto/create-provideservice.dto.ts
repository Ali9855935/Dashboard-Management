import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateProvideserviceDto {



    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Give the title' })
    title!: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Give the description' })
    description!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Give the catagory' })
    catagory!: string;

}






// @IsString()
// @IsNotEmpty()
// location!: string;

