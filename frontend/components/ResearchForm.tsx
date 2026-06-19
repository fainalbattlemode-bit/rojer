import { useState } from 'react';

interface ResearchFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function ResearchForm({ onSubmit, isLoading = false }: ResearchFormProps) {
  const [formData, setFormData] = useState({
    theme: '',
    targetAge: '',
    style: '',
    genre: '',
    uniquePoint: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          テーマ <span className="text-red-500">*</span>
        </label>
        <textarea
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          placeholder="例：子ども向けファンタジー塗り絵、大人向けマインドフルネス塗り絵"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            対象年齢 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="targetAge"
            value={formData.targetAge}
            onChange={handleChange}
            placeholder="例：6-12歳、20-50歳"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            スタイル <span className="text-red-500">*</span>
          </label>
          <select
            name="style"
            value={formData.style}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">選択してください</option>
            <option value="realistic">写実的</option>
            <option value="fantasy">ファンタジー</option>
            <option value="abstract">抽象的</option>
            <option value="geometric">幾何学模様</option>
            <option value="other">その他</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ジャンル（任意）
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="例：魔法の生き物、自然風景"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            独自ポイント（任意）
          </label>
          <input
            type="text"
            name="uniquePoint"
            value={formData.uniquePoint}
            onChange={handleChange}
            placeholder="例：AR機能対応、環境配慮"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {isLoading ? '分析中...' : '市場分析を実行'}
      </button>
    </form>
  );
}
