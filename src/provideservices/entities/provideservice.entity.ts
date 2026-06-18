import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Admin } from "src/admins/schemas/admin.schema";

@Schema({ timestamps: true })
export class Provideservice {

    @Prop({ required: true, trim: true, })
    title!: string;

    @Prop({ required: true, trim: true })
    shortDescription!: string;

    @Prop({ required: true, trim: true })
    longDescription!: string;

    @Prop({ type: [String], default: [] })
    features!: string[];

    @Prop({ type: [String], default: [] })
    images!: string[];

    @Prop({ default: true })
    isActive!: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
    createdBy!: Types.ObjectId | Admin;

}

export const provideServicesSchema = SchemaFactory.createForClass(Provideservice);