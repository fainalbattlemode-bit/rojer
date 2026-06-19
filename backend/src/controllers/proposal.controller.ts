import { Request, Response, NextFunction } from 'express';
import { Proposal } from '../models/Proposal';
import { Research } from '../models/Research';
import { Analysis } from '../models/Analysis';
import { ChatGPTService } from '../services/chatgpt.service';
import { ApiError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: any;
}

export const createProposal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { researchId, selectedNicheId } = req.body;
    const userId = req.user.userId;

    if (!researchId || !selectedNicheId) {
      throw new ApiError(
        400,
        'researchId and selectedNicheId are required',
        'VALIDATION_ERROR'
      );
    }

    // Verify research exists and belongs to user
    const research = await Research.findOne({
      _id: researchId,
      userId,
    }).populate('analysisId');

    if (!research) {
      throw new ApiError(404, 'Research not found', 'RESEARCH_NOT_FOUND');
    }

    // Find selected niche
    const analysis = research.analysisId as any;
    const niche = analysis.marketNiches.find((n: any) => n.id === selectedNicheId);

    if (!niche) {
      throw new ApiError(404, 'Niche not found', 'NICHE_NOT_FOUND');
    }

    // Generate proposal using ChatGPT
    const proposalData = await ChatGPTService.generateProposal({
      originalTheme: research.theme,
      nicheIdea: niche.idea,
      nicheDescription: niche.description,
    });

    // Create proposal
    const proposal = new Proposal({
      userId,
      researchId,
      analysisId: analysis._id,
      selectedNicheId,
      title: proposalData.sections[0]?.content || niche.idea,
      sections: proposalData.sections,
      status: 'draft',
    });

    await proposal.save();

    res.status(201).json({
      proposalId: proposal._id,
      researchId: proposal.researchId,
      selectedNiche: {
        id: niche.id,
        idea: niche.idea,
        description: niche.description,
      },
      title: proposal.title,
      sections: proposal.sections,
      status: proposal.status,
      createdAt: proposal.createdAt,
      updatedAt: proposal.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const getProposal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { proposalId } = req.params;
    const userId = req.user.userId;

    const proposal = await Proposal.findOne({
      _id: proposalId,
      userId,
    }).populate('researchId');

    if (!proposal) {
      throw new ApiError(404, 'Proposal not found', 'PROPOSAL_NOT_FOUND');
    }

    res.json({
      proposalId: proposal._id,
      researchId: proposal.researchId,
      selectedNicheId: proposal.selectedNicheId,
      title: proposal.title,
      sections: proposal.sections,
      status: proposal.status,
      createdAt: proposal.createdAt,
      updatedAt: proposal.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProposal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { proposalId } = req.params;
    const { title, sections, status } = req.body;
    const userId = req.user.userId;

    const proposal = await Proposal.findOne({
      _id: proposalId,
      userId,
    });

    if (!proposal) {
      throw new ApiError(404, 'Proposal not found', 'PROPOSAL_NOT_FOUND');
    }

    if (title) proposal.title = title;
    if (sections) proposal.sections = sections;
    if (status) proposal.status = status;

    await proposal.save();

    res.json({
      proposalId: proposal._id,
      title: proposal.title,
      sections: proposal.sections,
      status: proposal.status,
      updatedAt: proposal.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProposal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { proposalId } = req.params;
    const userId = req.user.userId;

    const proposal = await Proposal.findOneAndDelete({
      _id: proposalId,
      userId,
    });

    if (!proposal) {
      throw new ApiError(404, 'Proposal not found', 'PROPOSAL_NOT_FOUND');
    }

    res.json({
      message: 'Proposal deleted successfully',
      proposalId,
    });
  } catch (error) {
    next(error);
  }
};
