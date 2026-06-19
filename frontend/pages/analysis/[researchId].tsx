import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AnalysisResult from '@/components/AnalysisResult';
import ProposalCard from '@/components/ProposalCard';
import { researchApi } from '@/services/api';

interface Analysis {
  researchId: string;
  theme: string;
  analysis: any;
}

export default function AnalysisPage() {
  const router = useRouter();
  const { researchId } = router.query;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!researchId) return;

    const fetchAnalysis = async () => {
      try {
        const data = await researchApi.getResearch(researchId as string);
        setAnalysis(data);
      } catch (err: any) {
        setError(err.message || 'データ取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [researchId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">分析結果を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'データが見つかりません'}</p>
          <button
            onClick={() => router.push('/research')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            新しいリサーチに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          市場分析結果
        </h1>
        <p className="text-center text-gray-600 mb-12">テーマ: {analysis.theme}</p>

        <AnalysisResult analysis={analysis.analysis} />

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            市場の隙間提案（5 選）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.analysis?.marketNiches?.map((niche: any) => (
              <ProposalCard
                key={niche.id}
                niche={niche}
                researchId={analysis.researchId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
