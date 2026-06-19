# Rojer - Backend

Rojer のバックエンド API（Express.js + TypeScript）

## セットアップ

### 1. 依存関係をインストール

```bash
cd backend
npm install
```

### 2. 環境変数を設定

`.env.example` をコピーして `.env` を作成：

```bash
cp .env.example .env
```

`.env` を編集：

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rojer
JWT_SECRET=your-secret-key-here
CHATGPT_API_KEY=your-chatgpt-api-key
CODEX_API_KEY=your-codex-api-key
```

### 3. MongoDB をセットアップ

ローカル MongoDB が実行されていることを確認:

```bash
mongod
```

または Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

サーバーが `http://localhost:5000` で起動します。

## プロジェクト構成

```
src/
├── models/              # MongoDB スキーマ
│   ├── User.ts
│   ├── Research.ts
│   ├── Analysis.ts
│   └── Proposal.ts
├── controllers/         # ビジネスロジック
│   ├── auth.controller.ts
│   ├── research.controller.ts
│   └── proposal.controller.ts
├── routes/              # API ルート
│   ├── auth.routes.ts
│   ├── research.routes.ts
│   └── proposal.routes.ts
├── services/            # 外部サービス統合
│   └── chatgpt.service.ts
├── middleware/          # Express ミドルウェア
│   ├── auth.ts
│   └── errorHandler.ts
└── index.ts             # アプリケーションエントリポイント
```

## API エンドポイント

### 認証

- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン

### リサーチ

- `POST /api/research` - 市場分析を実行
- `GET /api/research/:researchId` - リサーチ詳細取得
- `GET /api/research/list` - リサーチ一覧取得

### 企画書

- `POST /api/proposal` - 企画書生成
- `GET /api/proposal/:proposalId` - 企画書詳細取得
- `PUT /api/proposal/:proposalId` - 企画書更新
- `DELETE /api/proposal/:proposalId` - 企画書削除

## 技術スタック

- **フレームワーク**: Express.js
- **言語**: TypeScript
- **データベース**: MongoDB + Mongoose
- **認証**: JWT
- **AI API**: ChatGPT (OpenAI API)

## 環境要件

- Node.js v18+
- MongoDB 5.0+
- npm または yarn

## ライセンス

MIT
