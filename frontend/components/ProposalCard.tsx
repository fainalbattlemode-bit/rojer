import { useRouter } from 'next/router';
import { useState } from 'react';
import { proposalApi } from '@/services/api';

interface Niche {
  id: string;
  idea: string;
  description: string;
  marketSize: number;
  popularity: number;
  implementationDifficulty: number;
  score?: number;
}

interface ProposalCardProps {
  niche: Niche;
  researchId: string;
}

export default function ProposalCard({ niche, researchId }: ProposalCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectNiche = async () => {
    setIsLoading(true);
    try {
      const response = await proposalApi.createProposal({
        researchId,
        selectedNicheId: niche.id,
      });
      router.push(`/proposal/${response.proposalId}`);
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('企画書生成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const ScoreBar = ({ value, max = 10 }: { value: number; max?: number }) => (
    <div className="flex items-center gap-2">
      <div className="flex-grow bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-6">{value}/10</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden animate-fadeIn">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{niche.idea}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{niche.description}</p>

        <div className="space-y-3 mb-6">
          <div>
            <label className="text-xs font-semibold text-gray-700">市場規模</label>
            <ScoreBar value={niche.marketSize} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">普及度</label>
            <ScoreBar value={niche.popularity} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">実現難度</label>
            <ScoreBar value={niche.implementationDifficulty} />
          </div>
        </div>

        {niche.score && (
          <div className="mb-6 p-3 bg-indigo-50 rounded-lg">
            <p className="text-xs text-gray-600">スコア</p>
            <p className="text-2xl font-bold text-indigo-600">{(niche.score * 100).toFixed(0)}%</p>
          </div>
        )}

        <button
          onClick={handleSelectNiche}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? '生成中...' : 'この案で企画書を生成'}
        </button>
      </div>
    </div>
  );
}
