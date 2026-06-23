import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateQueryDto {

    @ApiProperty({ example: 'Enter the user name' })
    @IsString()
    @IsNotEmpty()
    Name!: string;

    @ApiProperty({ example: 'Enter the user email' })
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'Enter the user phoneNumber' })
    @IsString()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty({ example: 'Enter the user message' })
    @IsString()
    @IsNotEmpty()
    message!: string;


    @ApiProperty({ example: 'Enter the serviceId' })
    @IsMongoId()
    service!: string;

}
