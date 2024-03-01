import { Schema, Document, model } from 'mongoose';

export interface IStock extends Document {
  name: string;
}

const StocksSchema = new Schema<IStock>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default { name: 'Stocks', schema: StocksSchema };
