import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Rojer
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/research" className="text-gray-700 hover:text-indigo-600">
                新規リサーチ
              </Link>
              <Link href="/research-history" className="text-gray-700 hover:text-indigo-600">
                履歴
              </Link>
              <div className="flex items-center gap-4 border-l pl-4">
                <span className="text-sm text-gray-600">ようこそ、{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  ログアウト
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-indigo-600">
                ログイン
              </Link>
              <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
