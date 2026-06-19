# システム設計書 - Rojer Phase 1

## 概要

Rojer Phase 1 は、ユーザーが提案した塗り絵書籍のテーマに対して、ChatGPT で市場分析を行い、AI が市場の隙間を自動検出する機能を提供します。

---

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                    フロントエンド (Next.js)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Pages                                                   │ │
│  │ ├─ /research        （リサーチ入力）                     │ │
│  │ ├─ /analysis        （市場分析結果表示）                 │ │
│  │ ├─ /proposals       （隙間提案表示）                     │ │
│  │ └─ /proposal-detail （企画書生成・編集）                │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Components                                              │ │
│  │ ├─ ResearchForm     （入力フォーム）                     │ │
│  │ ├─ AnalysisResult   （分析結果表示）                     │ │
│  │ ├─ ProposalCard     （隙間提案カード）                   │ │
│  │ └─ ProposalEditor   （企画書エディタ）                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             ↓ (REST API)
┌─────────────────────────────────────────────────────────────┐
│                    バックエンド (Express)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Routes                                                  │ │
│  │ ├─ POST /api/research          （市場分析実行）         │ │
│  │ ├─ POST /api/proposal          （企画書生成）           │ │
│  │ └─ PUT /api/proposal/:id       （企画書更新）           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Controllers                                             │ │
│  │ ├─ ResearchController                                  │ │
│  │ └─ ProposalController                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Services                                                │ │
│  │ ├─ ChatGPTService   （市場分析・企画書生成）             │ │
│  │ └─ ProposalService  （企画書ロジック）                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             ↓ (API Call)
┌─────────────────────────────────────────────────────────────┐
│                    外部 API                                   │
│  ├─ ChatGPT (GPT-4)   （市場分析・テキスト生成）            │
│  └─ Codex             （将来的なコード補助用）               │
└─────────────────────────────────────────────────────────────┘
                             ↓ (Query/Insert)
┌─────────────────────────────────────────────────────────────┐
│                    データベース (MongoDB)                     │
│  ├─ researches        （リサーチ履歴）                       │
│  ├─ analyses          （市場分析結果）                       │
│  ├─ proposals         （提案/企画書）                        │
│  └─ users             （ユーザー情報）                       │
└─────────────────────────────────────────────────────────────┘
```

---

## ユースケースフロー

### Phase 1：リサーチ～企画書生成

```
1. ユーザー入力
   ├─ テーマ入力
   ├─ 対象年齢
   ├─ スタイル（写実的/ファンタジー/etc）
   └─ その他基本情報

    ↓

2. 市場分析（ChatGPT）
   ├─ 競合分析
   ├─ 市場規模・トレンド
   ├─ ターゲット層
   ├─ 価格帯戦略
   └─ 販売チャネル分析

    ↓

3. AI 隙間検出
   ├─ 5 個のニッチアイデア提案
   ├─ 各案に評価スコア付与：
   │  ├─ 市場規模（1～10）
   │  ├─ 普及度（1～10）
   │  └─ 実現難度（1～10）
   └─ フィルタリング：「市場規模 < 5 AND 普及度 < 5 AND 実現難度 > 7」

    ↓

4. ユーザーが案を選択

    ↓

5. 企画書自動生成
   ├─ タイトル
   ├─ コンセプト
   ├─ ターゲット層
   ├─ 競合分析
   ├─ マネタイズ方針
   └─ スケジュール

    ↓

6. ユーザーが企画書をカスタマイズ・保存
```

---

## データモデル

### Research（リサーチ）
```json
{
  "_id": "ObjectId",
  "userId": "String",
  "theme": "String",
  "targetAge": "String",
  "style": "String",
  "additionalInfo": "Object",
  "status": "pending|completed|archived",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Analysis（市場分析）
```json
{
  "_id": "ObjectId",
  "researchId": "ObjectId (ref: Research)",
  "competitorAnalysis": "String",
  "marketSize": "String",
  "trend": "String",
  "targetAudience": "String",
  "marketNiches": [
    {
      "idea": "String",
      "description": "String",
      "marketSize": 3,          // 1-10
      "popularity": 2,          // 1-10
      "implementationDifficulty": 8  // 1-10
    }
  ],
  "pricingStrategy": "String",
  "salesChannels": "String",
  "generatedAt": "Date"
}
```

### Proposal（企画書）
```json
{
  "_id": "ObjectId",
  "researchId": "ObjectId (ref: Research)",
  "analysisId": "ObjectId (ref: Analysis)",
  "selectedNicheId": "String",
  "title": "String",
  "sections": [
    {
      "sectionId": "String",
      "sectionName": "String",
      "content": "String",
      "order": "Number"
    }
  ],
  "status": "draft|review|approved",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## API 仕様

### 1. POST /api/research

**目的**：市場分析を実行し、隙間提案を生成

**リクエストボディ**
```json
{
  "theme": "子ども向けファンタジー塗り絵",
  "targetAge": "6-12歳",
  "style": "ファンタジー",
  "additionalInfo": {
    "genre": "魔法の生き物",
    "uniquePoint": "AR機能対応"
  }
}
```

**レスポンス（成功時）**
```json
{
  "researchId": "ObjectId",
  "analysis": {
    "competitorAnalysis": "...",
    "marketSize": "...",
    "trend": "...",
    "targetAudience": "...",
    "marketNiches": [
      {
        "id": "niche_1",
        "idea": "大人向けマインドフルネス塗り絵",
        "description": "ストレス軽減に特化した複雑な幾何学模様",
        "marketSize": 4,
        "popularity": 3,
        "implementationDifficulty": 9
      },
      // ... 計5個
    ],
    "pricingStrategy": "...",
    "salesChannels": "..."
  }
}
```

**エラーレスポンス**
```json
{
  "error": "ChatGPT API error or validation error",
  "code": "ERROR_CODE"
}
```

---

### 2. POST /api/proposal

**目的**：選択した隙間から企画書を生成

**リクエストボディ**
```json
{
  "researchId": "ObjectId",
  "selectedNicheId": "niche_1"
}
```

**レスポンス（成功時）**
```json
{
  "proposalId": "ObjectId",
  "title": "大人向けマインドフルネス塗り絵",
  "sections": [
    {
      "sectionId": "title",
      "sectionName": "タイトル",
      "content": "大人向けマインドフルネス塗り絵",
      "order": 1
    },
    {
      "sectionId": "concept",
      "sectionName": "コンセプト",
      "content": "...",
      "order": 2
    },
    // ... 他のセクション
  ],
  "status": "draft"
}
```

---

### 3. PUT /api/proposal/:id

**目的**：企画書をカスタマイズ・保存

**リクエストボディ**
```json
{
  "sections": [
    {
      "sectionId": "title",
      "content": "修正されたタイトル"
    },
    // ... 修正されたセクション
  ]
}
```

**レスポンス**
```json
{
  "proposalId": "ObjectId",
  "title": "修正されたタイトル",
  "sections": [...],
  "updatedAt": "2024-06-19T..."
}
```

---

## ChatGPT プロンプトテンプレート

### 市場分析プロンプト

```
あなたは本の市場分析のエキスパートです。

以下のテーマについて、詳細な市場分析を行ってください：

テーマ：{theme}
対象年齢：{targetAge}
スタイル：{style}
その他の情報：{additionalInfo}

以下の項目について分析結果を JSON 形式で提供してください：

1. competitorAnalysis：既存の競合商品（塗り絵本）の分析
2. marketSize：推定市場規模
3. trend：現在のトレンド
4. targetAudience：詳細なターゲット層の分析
5. pricingStrategy：推奨価格帯
6. salesChannels：販売チャネルの提案

さらに、以下の条件で市場の隙間を 5 つ提案してください：
- 市場規模が小さい（1～3）
- 普及度が低い（1～3）
- 実現難度が高い（7～10）

各隙間について：
{
  "idea": "隙間のアイデア名",
  "description": "詳細説明",
  "marketSize": 1-10,
  "popularity": 1-10,
  "implementationDifficulty": 1-10
}

JSON のみを返してください。
```

### 企画書生成プロンプト

```
あなたは書籍企画のプロです。

以下の隙間ニッチについて、詳細な企画書を作成してください：

隙間アイデア：{nicheIdea}
説明：{nicheDescription}
元のテーマ：{originalTheme}

以下のセクションで企画書を構成してください：

1. **タイトル**：効果的で魅力的なタイトル
2. **コンセプト**：書籍の基本コンセプト
3. **ターゲット層**：具体的なターゲット層
4. **競合分析**：類似商品との差別化ポイント
5. **マネタイズ方針**：販売戦略と予想売上
6. **スケジュール**：企画から出版までのスケジュール

各セクションは 200～500 字で詳しく記述してください。

JSON 形式で以下のように返してください：
{
  "sections": [
    {
      "sectionId": "title",
      "sectionName": "タイトル",
      "content": "..."
    },
    // ... 他のセクション
  ]
}

JSON のみを返してください。
```

---

## 拡張ポイント

### 1. リサーチ項目の追加
- `docs/RESEARCH_ITEMS.json` に新規項目を定義
- バックエンドの分析プロンプトに追記
- フロントエンドの表示コンポーネントを追加

### 2. 企画書セクションの追加
- `docs/PROPOSAL_SECTIONS.json` に新規セクションを定義
- `components/ProposalEditor` にセクションコンポーネントを登録
- ChatGPT プロンプトを更新

### 3. スコアリングロジックの変更
- `backend/services/ProposalService.ts` の `filterNiches()` メソッドを修正

---

## セキュリティとベストプラクティス

1. **API キーの管理**
   - `.env.local` で管理、Git に含めない
   - 環境変数で本番環境での切り替え対応

2. **レート制限**
   - ChatGPT API はコスト高いため、レート制限を実装

3. **入力値検証**
   - フロントエンド・バックエンド両側で入力値チェック

4. **エラーハンドリング**
   - ChatGPT API エラーはユーザーフレンドリーなメッセージに変換

---

## パフォーマンス最適化

1. **API レスポンスキャッシング**
   - 同じテーマの分析結果をキャッシュ

2. **非同期処理**
   - 長時間かかる分析は Queue（Bull など）で管理

3. **フロントエンド最適化**
   - 大規模なテキスト表示は仮想スクロール対応

