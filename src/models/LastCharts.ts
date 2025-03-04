import mongoose, {Schema} from "mongoose";

export interface ILastCharts {
    tmdb: number,
    titulo: string,
    oscar: boolean,
    media: number,
    logs: Array<object>,
    percent: number,
    selo: string,
    status: string
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
    required: true,
  },
  media: {
    type: Number,
    required: true,
  },
  logs: {
    type: Array<object>,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  selo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, {  collection: 'LastCharts' });

const LastCharts = mongoose.models?.LastCharts || mongoose.model<ILastCharts>("LastCharts", lastChartsSchema);

export default LastCharts;