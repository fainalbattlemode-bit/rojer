import mongoose, { Schema, Document } from 'mongoose';

export interface IProposalSection {
  sectionId: string;
  sectionName: string;
  content: string;
  order: number;
}

export interface IProposal extends Document {
  userId: mongoose.Types.ObjectId;
  researchId: mongoose.Types.ObjectId;
  analysisId?: mongoose.Types.ObjectId;
  selectedNicheId: string;
  title: string;
  sections: IProposalSection[];
  status: 'draft' | 'review' | 'approved';
  createdAt: Date;
  updatedAt: Date;
}

const proposalSectionSchema = new Schema({
  sectionId: String,
  sectionName: String,
  content: String,
  order: Number,
});

const proposalSchema = new Schema<IProposal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    researchId: {
      type: Schema.Types.ObjectId,
      ref: 'Research',
      required: true,
    },
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
    },
    selectedNicheId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sections: [proposalSectionSchema],
    status: {
      type: String,
      enum: ['draft', 'review', 'approved'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

export const Proposal = mongoose.model<IProposal>('Proposal', proposalSchema);
