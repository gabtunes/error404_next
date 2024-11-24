import mongoose, {Document, Schema} from "mongoose";

export interface ICharts extends Document {
    updated_at: Date,
    ano: number,
    limite: boolean,
    chart: Array<object>
}

const chartsSchema:Schema = new mongoose.Schema({
  updated_at: {
    type: Date,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  limite: {
    type: Boolean,
    required: true,
  },
  chart: {
    type: Array<Object>,
    required: true,
  }
}, {  collection: 'charts' });

const Charts = mongoose.models.Charts || mongoose.model<ICharts>("Charts", chartsSchema);

export default Charts;
