interface AnalysisResultProps {
  analysis: any;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="space-y-8">
      {/* 競合分析 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">競合分析</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.competitorAnalysis}</p>
      </div>

      {/* 市場規模 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">市場規模</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.marketSize}</p>
      </div>

      {/* トレンド */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">トレンド</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.trend}</p>
      </div>

      {/* ターゲット層 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">ターゲット層</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.targetAudience}</p>
      </div>

      {/* 価格戦略 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">価格戦略</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.pricingStrategy}</p>
      </div>

      {/* 販売チャネル */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">販売チャネル</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis?.salesChannels}</p>
      </div>
    </div>
  );
}
