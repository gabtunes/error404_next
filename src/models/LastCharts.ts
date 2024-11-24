import mongoose, {Schema} from "mongoose";

export interface ILastCharts {
    tmdb: number,
    titulo: string,
    oscar: boolean,
    media: number,
    logs: Array<Array<Object>>,
    percent: number,
    selo: string
}

const lastChartsSchema:Schema = new mongoose.Schema({
  tmdb: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  oscar: {
    type: Boolean,
    required: false,
  },
  media: {
    type: Number,
    required: true,
  },
  logs: {
    type: Array<Array<Object>>,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  selo: {
    type: String,
    required: true,
  }
}, {  collection: 'LastCharts' });

const LastCharts = mongoose.models.LastCharts || mongoose.model<ILastCharts>("LastCharts", lastChartsSchema);

export default LastCharts;