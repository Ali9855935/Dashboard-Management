import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty, IsString } from "class-validator"


export class CreateServiceDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Enter your Title' })
    title!: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Enter your Descriptions' })
    description!: string

}
