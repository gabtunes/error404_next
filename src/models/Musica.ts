import mongoose, {Document, Schema} from "mongoose";

export interface IMusica extends Document {
    membro: number,
    ano: number,
    albums: Array<object>,
    tracks: Array<object>,
    updated_at: Date,
}

const musicaSchema:Schema = new mongoose.Schema({
    membro: {
        type: Number,
        required: true,
      },
  ano: {
    type: Number,
    required: true,
  },
  albums: {
    type: Array<object>,
    required: true,
  },
  tracks: {
    type: Array<object>,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  }
},{  collection: 'musica' });

const Musica = mongoose.models?.Musica || mongoose.model<IMusica>("Musica", musicaSchema);

export default Musica;