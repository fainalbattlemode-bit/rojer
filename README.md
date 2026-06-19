# Rojer - AI 塗り絵書籍出版プラットフォーム

AI を活用して、塗り絵書籍を企画から出版まで一気通貫でサポートするプラットフォームです。

## プロジェクト概要

Rojer は、以下の流れで AI 塗り絵書籍の出版をサポートします：

### Phase 1（現在）：リサーチ～企画書生成
- **リサーチフェーズ**：ユーザー提案テーマの市場分析
- **隙間分析**：AI が市場の隙間を自動検出（5 案提案）
- **企画案選定**：ユーザーが最適な案を選択
- **企画書生成**：自動生成企画書のカスタマイズ

### Phase 2（今後）：画像生成
- AI による塗り絵画像の自動生成

### Phase 3（今後）：本文・装丁制作
- 本文テンプレートの自動生成
- 表紙・背表紙のデザイン自動生成

### Phase 4（今後）：Amazon KDP サポート
- KDP フォーマット検証
- メタデータ管理
- アップロード補助

---

## 技術スタック

### フロントエンド
- **Next.js** + React
- TypeScript
- Tailwind CSS（UI/UX）

### バックエンド
- **Node.js** + Express
- MongoDB（データベース）
- Codex + ChatGPT API 連携

### AI API
- **ChatGPT（GPT-4）**：市場分析、企画書生成
- **Codex**：コード補助、拡張機能開発

---

## プロジェクト構成

```
rojer/
├── frontend/                 # Next.js フロントエンド
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── package.json
├── backend/                  # Express バックエンド
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
├── docs/                     # ドキュメント
│   ├── SYSTEM_DESIGN.md     # システム設計書
│   ├── API_SPEC.md          # API 仕様書
│   └── DATABASE_SCHEMA.md   # DB スキーマ
└── README.md
```

---

## セットアップ

### 前提条件
- Node.js v18+
- npm または yarn
- MongoDB（ローカルまたはクラウド）
- ChatGPT API キー
- Codex API キー

### インストール

```bash
# フロントエンド
cd frontend
npm install

# バックエンド
cd ../backend
npm install
```

### 環境変数設定

`.env.local` ファイルを作成：

```
NEXT_PUBLIC_API_URL=http://localhost:5000
CHATGPT_API_KEY=your-api-key
CODEX_API_KEY=your-api-key
MONGODB_URI=mongodb://localhost:27017/rojer
```

### 開発サーバー起動

```bash
# ターミナル 1: フロントエンド
cd frontend
npm run dev

# ターミナル 2: バックエンド
cd backend
npm run dev
```

フロントエンド：http://localhost:3000
バックエンド：http://localhost:5000

---

## 主要機能

### Phase 1：リサーチ～企画書生成

#### 1. ユーザー入力
- テーマ入力フォーム
- 基本情報（対象年齢、スタイルなど）

#### 2. 市場分析（ChatGPT）
分析項目：
- 競合分析
- 市場規模・トレンド
- ターゲット層
- 市場の隙間・ニッチ
- 価格帯戦略
- 販売チャネル分析

#### 3. AI 隙間提案
- 5 個のニッチアイデア提案
- 各案の評価スコア：
  - **市場規模**：1～10（小さい→大きい）
  - **普及度**：1～10（低い→高い）
  - **実現難度**：1～10（簡単→難しい）
- **フィルタリング条件**：市場規模が小さく、普及度が低く、実現難度が高い隙間を優先表示

#### 4. 企画案選定
- 5 案から 1 つを選択
- 選定理由の自動記録

#### 5. 企画書自動生成
デフォルトセクション：
- タイトル
- コンセプト
- ターゲット層
- 競合分析
- マネタイズ方針
- スケジュール

（※ 後から追加項目対応可能）

---

## API エンドポイント（Phase 1）

### POST /api/research
テーマとユーザー情報から市場分析を実行
- **リクエスト**：テーマ、対象年齢、スタイル等
- **レスポンス**：市場分析結果 + 隙間提案（5 案）

### POST /api/proposal
提案された隙間を企画書テンプレートに変換
- **リクエスト**：選択した隙間 ID
- **レスポンス**：企画書ドラフト

### PUT /api/proposal/:id
企画書をカスタマイズ・保存
- **リクエスト**：編集内容
- **レスポンス**：更新された企画書

---

## 拡張性の設計

### リサーチ項目の追加
- JSON ベースの項目管理
- 新規項目追加時はデータベース+API に追記

### 企画書セクションの追加
- コンポーネント化した設計
- 新しいセクション用コンポーネントを登録するだけで対応

### AI モデルの変更
- ChatGPT → 別の LLM への切り替え対応可能
- API ラッパーレイヤーで抽象化

---

## 開発ロードマップ

- [ ] Phase 1：リサーチ～企画書生成（現在進行中）
- [ ] Phase 2：画像生成機能
- [ ] Phase 3：本文・装丁制作
- [ ] Phase 4：Amazon KDP サポート

---

## ライセンス

MIT License

---

## サポート

問題や機能リクエストは、GitHub Issues で報告してください。

