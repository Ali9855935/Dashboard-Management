import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, IsOptional, IsBoolean } from "class-validator";
import { Transform } from "stream";

export class CreateProvideserviceDto {

    @ApiProperty({ example: 'Structural Fabrication works' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: 'High-quality industrial fabrication services.' })
    @IsString()
    @IsNotEmpty()
    shortDescription!: string;

    @ApiProperty({ example: 'We provide heavy-duty structural fabrication works for industries...' })
    @IsString()
    @IsNotEmpty()
    longDescription!: string;

    @ApiProperty({ example: 'Heavy-duty MS sheets, Anti-corrosive paint' })
    // @IsArray() // Ab ye validation fail nahi hogi, kyunki upar wali line ise array bana chuki hai
    // @IsString({ each: true })
    @IsNotEmpty()
    features!: any;

    // @ApiProperty({ example: ['https://example.com/img1.jpg'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images!: string[];

    @ApiProperty({ example: true, default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}