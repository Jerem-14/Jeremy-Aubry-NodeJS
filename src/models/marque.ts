import { Schema, model, Document } from 'mongoose';

interface Marque extends Document {
  name: string;
  logo?: string;
}

const marqueSchema = new Schema<Marque>({
  name: { type: String, required: true },
  logo: { type: String },
});

const Marque = model<Marque>('Marque', marqueSchema);
export {Marque}