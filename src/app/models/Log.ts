import mongoose, {Document, Schema} from "mongoose";

export interface ILog extends Document {
    data: Date,
    membro: string,
    nota: number,
    tmdb: number,
    updated_at: Date,
    watched: Boolean
}

const logSchema:Schema = new mongoose.Schema({
  data: {
    type: Date,
    required: true,
  },
  tmdb: {
    type: Number,
    required: true,
  },
  membro: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  watched: {
    type: Boolean,
    required: true,
  }
},{  collection: 'log' });

const Log = mongoose.models.Log || mongoose.model<ILog>("Log", logSchema);

export default Log;