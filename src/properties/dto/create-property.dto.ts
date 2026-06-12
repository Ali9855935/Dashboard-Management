import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePropertyDto {
    @IsString()
    @ApiProperty({ example: 'Give the title' })
    title!: string;


    @IsString()
    @ApiProperty({ example: 'Give the description' })
    description!: string;

    @IsNumber()
    @ApiProperty({ example: 'Give the price' })
    @Type(() => Number)
    price!: number


    // @IsString()
    // @IsNotEmpty()
    // location!: string;

}