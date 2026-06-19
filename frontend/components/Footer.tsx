export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Rojer</h3>
            <p className="text-sm">AI塗り絵書籍出版プラットフォーム</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">製品</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">リサーチ機能</a></li>
              <li><a href="#" className="hover:text-white">企画書生成</a></li>
              <li><a href="#" className="hover:text-white">出版サポート</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">企業</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">ブログ</a></li>
              <li><a href="#" className="hover:text-white">サポート</a></li>
              <li><a href="#" className="hover:text-white">利用規約</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">法務</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">プライバシー</a></li>
              <li><a href="#" className="hover:text-white">利用規約</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Rojer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
