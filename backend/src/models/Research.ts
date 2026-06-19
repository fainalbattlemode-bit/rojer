import mongoose, { Schema, Document } from 'mongoose';

export interface IResearch extends Document {
  userId: mongoose.Types.ObjectId;
  theme: string;
  targetAge: string;
  style: string;
  additionalInfo: Record<string, any>;
  status: 'pending' | 'completed' | 'archived';
  analysisId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const researchSchema = new Schema<IResearch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    targetAge: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'archived'],
      default: 'pending',
    },
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
    },
  },
  {
    timestamps: true,
  }
);

export const Research = mongoose.model<IResearch>('Research', researchSchema);
