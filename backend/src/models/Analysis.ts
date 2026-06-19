import mongoose, { Schema, Document } from 'mongoose';

export interface IMarketNiche {
  id: string;
  idea: string;
  description: string;
  marketSize: number;
  popularity: number;
  implementationDifficulty: number;
  score?: number;
}

export interface IAnalysis extends Document {
  researchId: mongoose.Types.ObjectId;
  competitorAnalysis: string;
  marketSize: string;
  trend: string;
  targetAudience: string;
  marketNiches: IMarketNiche[];
  pricingStrategy: string;
  salesChannels: string;
  generatedAt: Date;
}

const marketNicheSchema = new Schema({
  id: String,
  idea: String,
  description: String,
  marketSize: Number,
  popularity: Number,
  implementationDifficulty: Number,
  score: Number,
});

const analysisSchema = new Schema<IAnalysis>(
  {
    researchId: {
      type: Schema.Types.ObjectId,
      ref: 'Research',
      required: true,
    },
    competitorAnalysis: String,
    marketSize: String,
    trend: String,
    targetAudience: String,
    marketNiches: [marketNicheSchema],
    pricingStrategy: String,
    salesChannels: String,
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Analysis = mongoose.model<IAnalysis>('Analysis', analysisSchema);
