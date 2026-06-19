import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Rojer</h1>
          <p className="text-xl text-gray-600">
            AI を活用して、塗り絵書籍を企画から出版まで一気通貫でサポート
          </p>
        </div>

        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              いらっしゃいませ、{user?.name}さん
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/research"
                className="block p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
              >
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  新しいリサーチを開始
                </h3>
                <p className="text-gray-700">
                  テーマを入力して、市場分析を実行します
                </p>
              </Link>

              <Link
                href="/research-history"
                className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
              >
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  過去のリサーチを表示
                </h3>
                <p className="text-gray-700">保存されたリサーチ結果を確認します</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-lg text-gray-600 mb-6">
              ログインまたは登録してから開始してください
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                登録
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
