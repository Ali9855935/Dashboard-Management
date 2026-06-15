import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateProvideserviceDto {



    @IsString()
    @ApiProperty({ example: 'Give the title' })
    title!: string;


    @IsString()
    @ApiProperty({ example: 'Give the description' })
    description!: string;


}






// @IsString()
// @IsNotEmpty()
// location!: string;

