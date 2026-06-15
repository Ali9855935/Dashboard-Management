import { PartialType } from '@nestjs/swagger';
import { CreateProvideserviceDto } from './create-provideservice.dto';

export class UpdateProvideserviceDto extends PartialType(CreateProvideserviceDto) {}
