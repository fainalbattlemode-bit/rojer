import { useState } from 'react';
import { useRouter } from 'next/router';
import ResearchForm from '@/components/ResearchForm';
import { researchApi } from '@/services/api';

export default function ResearchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await researchApi.createResearch(formData);
      // 分析結果ページにリダイレクト
      router.push(`/analysis/${response.researchId}`);
    } catch (err: any) {
      setError(err.message || '市場分析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          新しいリサーチを開始
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <ResearchForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
