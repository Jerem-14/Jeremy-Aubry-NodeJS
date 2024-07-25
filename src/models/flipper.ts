import { Schema, model, Document, Types } from 'mongoose';

interface Dimensions {
  longueur?: number;
  largeur?: number;
  hauteur?: number;
}

interface Images {
  logo?: string;
}

interface Flipper extends Document {
  nom: string;
  prix: string;
  etat: string;
  marque_id: Types.ObjectId;
  stock: string;
  arrivage: string;
  date_sortie: string;
  note: string;
  dimensions?: Dimensions;
  poids?: string;
  images?: Images;
  stock_label: string;
}

const flipperSchema = new Schema<Flipper>({
  nom: { type: String, required: true },
  prix: { type: String, required: true },
  etat: { type: String, required: true },
  marque_id: { type: Schema.Types.ObjectId, ref: 'Marque', required: true },
  stock: { type: String, required: true },
  arrivage: { type: String },
  date_sortie: { type: String, required: true },
  note: { type: String, required: true },
  dimensions: {
    longueur: { type: Number },
    largeur: { type: Number },
    hauteur: { type: Number },
  },
  poids: { type: String },
  images: {
    logo: { type: String },
  },
  stock_label: { type: String, required: true },
});

const Flipper = model<Flipper>('Flipper', flipperSchema);
export {Flipper}