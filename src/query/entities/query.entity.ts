import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";



@Schema({ timestamps: true })

export class Query {
    @Prop({ required: true, trim: true, })
    Name!: string;

    @Prop({ required: true, trim: true })
    email!: string;

    @Prop({ required: true, trim: true })
    phone!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Provideservice', required: true })
    service: Types.ObjectId;


    @Prop({ required: true, })
    message!: string;


}
export const querySchema = SchemaFactory.createForClass(Query);
