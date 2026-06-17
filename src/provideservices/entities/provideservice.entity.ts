import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Admin } from "src/admins/schemas/admin.schema";

@Schema({ timestamps: true })
export class Provideservice {

    @Prop({ required: true, trim: true })
    title!: string

    @Prop({ required: true, trim: true })
    description!: string

    @Prop({ required: true, trim: true })
    category!: string

    @Prop({ default: [], type: [String] })
    images!: string[]

    @Prop({ default: true })
    isActive!: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
    createdBy!: Types.ObjectId | Admin

}
export const provideServicesSchema = SchemaFactory.createForClass(Provideservice)