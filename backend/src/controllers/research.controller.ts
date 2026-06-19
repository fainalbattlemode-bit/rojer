import { Request, Response, NextFunction } from 'express';
import { Research } from '../models/Research';
import { Analysis } from '../models/Analysis';
import { ChatGPTService } from '../services/chatgpt.service';
import { ApiError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: any;
}

export const createResearch = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { theme, targetAge, style, additionalInfo } = req.body;
    const userId = req.user.userId;

    if (!theme || !targetAge || !style) {
      throw new ApiError(
        400,
        'Theme, targetAge, and style are required',
        'VALIDATION_ERROR'
      );
    }

    // Create research record
    const research = new Research({
      userId,
      theme,
      targetAge,
      style,
      additionalInfo: additionalInfo || {},
      status: 'pending',
    });

    await research.save();

    // Generate market analysis using ChatGPT
    try {
      const analysisData = await ChatGPTService.analyzeMarket({
        theme,
        targetAge,
        style,
        additionalInfo,
      });

      const analysis = new Analysis({
        researchId: research._id,
        ...analysisData,
      });

      await analysis.save();

      research.analysisId = analysis._id;
      research.status = 'completed';
      await research.save();

      res.status(201).json({
        researchId: research._id,
        theme: research.theme,
        targetAge: research.targetAge,
        style: research.style,
        status: research.status,
        analysis: {
          analysisId: analysis._id,
          competitorAnalysis: analysis.competitorAnalysis,
          marketSize: analysis.marketSize,
          trend: analysis.trend,
          targetAudience: analysis.targetAudience,
          marketNiches: analysis.marketNiches,
          pricingStrategy: analysis.pricingStrategy,
          salesChannels: analysis.salesChannels,
        },
        createdAt: research.createdAt,
        updatedAt: research.updatedAt,
      });
    } catch (chatgptError: any) {
      research.status = 'archived';
      await research.save();

      throw new ApiError(
        500,
        chatgptError.message || 'ChatGPT API error',
        'CHATGPT_ERROR'
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getResearch = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { researchId } = req.params;
    const userId = req.user.userId;

    const research = await Research.findOne({
      _id: researchId,
      userId,
    }).populate('analysisId');

    if (!research) {
      throw new ApiError(404, 'Research not found', 'RESEARCH_NOT_FOUND');
    }

    res.json({
      researchId: research._id,
      userId: research.userId,
      theme: research.theme,
      targetAge: research.targetAge,
      style: research.style,
      additionalInfo: research.additionalInfo,
      status: research.status,
      analysis: research.analysisId,
      createdAt: research.createdAt,
      updatedAt: research.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const listResearch = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const query: any = { userId };
    if (status) {
      query.status = status;
    }

    const total = await Research.countDocuments(query);
    const researches = await Research.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      data: researches.map((research) => ({
        researchId: research._id,
        theme: research.theme,
        status: research.status,
        createdAt: research.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};
