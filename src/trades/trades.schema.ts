import { Schema, Document, model } from 'mongoose';

export interface ITrade extends Document {
  stockId: Schema.Types.ObjectId,
  type:String,
  price:Number
}

export enum TRADE_TYPES{
  BUY="BUY",
  SELL="SELL"
}

const TradesSchema = new Schema<ITrade>(
  {
    stockId:{
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: TRADE_TYPES
    },
    price: {
      type: Number,
      required: true
    }

  },
  { timestamps: true },
);

export default { name: 'Trades', schema: TradesSchema };
