import mongoose, {Schema} from "mongoose";

export interface IBubbling {
    tmdb: number,
    titulo: string,
    duracao: number,
    notas_nao_nula: number,
    membros_n: number
}

const bubblingSchema:Schema = new mongoose.Schema({
  tmdb: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  duracao: {
    type: Number,
    required: true,
  },
  notas_nao_nula: {
    type: Number,
    required: true,
  },
  membros_n: {
    type: Number,
    required: true,
  }
}, {  collection: 'Bubbling' });

const Bubbling = mongoose.models?.Bubbling || mongoose.model<IBubbling>("Bubbling", bubblingSchema);

export default Bubbling;