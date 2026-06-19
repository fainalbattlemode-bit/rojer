# API 仕様書 - Rojer Phase 1

## ベース URL

```
http://localhost:5000/api  （開発環境）
https://api.rojer.app/api  （本番環境）
```

---

## 認証

### 認証方式：JWT

全エンドポイント（`/api/auth` を除く）には、リクエストヘッダに認証トークンを含める必要があります。

```
Authorization: Bearer <JWT_TOKEN>
```

---

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|-------------|------|
| POST | `/auth/register` | ユーザー登録 |
| POST | `/auth/login` | ログイン |
| POST | `/research` | 市場分析実行 |
| GET | `/research/:researchId` | リサーチ詳細取得 |
| GET | `/research/list` | リサーチ一覧取得 |
| POST | `/proposal` | 企画書生成 |
| GET | `/proposal/:proposalId` | 企画書詳細取得 |
| PUT | `/proposal/:proposalId` | 企画書更新 |
| DELETE | `/proposal/:proposalId` | 企画書削除 |

---

## 詳細仕様

### 1. POST /auth/register

**説明**：新規ユーザー登録

**リクエストボディ**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "ユーザー名"
}
```

**レスポンス（200 OK）**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "ユーザー名",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**エラーレスポンス（400 Bad Request）**
```json
{
  "error": "Email already exists",
  "code": "EMAIL_ALREADY_EXISTS"
}
```

---

### 2. POST /auth/login

**説明**：ユーザーログイン

**リクエストボディ**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**レスポンス（200 OK）**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

**エラーレスポンス（401 Unauthorized）**
```json
{
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}
```

---

### 3. POST /research

**説明**：市場分析を実行し、隙間提案を生成

**認証**：必須（JWT）

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

**クエリパラメータ**
```
?includeAnalysis=true  （分析結果も含めるか、デフォルト: true）
```

**レスポンス（200 OK）**
```json
{
  "researchId": "507f1f77bcf86cd799439011",
  "theme": "子ども向けファンタジー塗り絵",
  "targetAge": "6-12歳",
  "style": "ファンタジー",
  "status": "completed",
  "analysis": {
    "analysisId": "507f1f77bcf86cd799439012",
    "competitorAnalysis": "現在、キャラクター塗り絵が人気ですが...",
    "marketSize": "推定市場規模は年間50億円以上と考えられます",
    "trend": "AI を使ったパーソナライズされた塗り絵本が増加傾向です",
    "targetAudience": "主なターゲットは6～12歳の子ども、および親世代",
    "marketNiches": [
      {
        "id": "niche_1",
        "idea": "大人向けマインドフルネス塗り絵",
        "description": "ストレス軽減に特化した複雑な幾何学模様。瞑想やヨガとセットで販売。",
        "marketSize": 3,
        "popularity": 2,
        "implementationDifficulty": 8,
        "score": 0.87  （スコア：実現難度が高い×普及度が低い×市場規模が小さい）
      },
      {
        "id": "niche_2",
        "idea": "シニア向け認知機能訓練塗り絵",
        "description": "認知症予防に設計された大きなマスと簡単な図柄。医療施設向け。",
        "marketSize": 2,
        "popularity": 2,
        "implementationDifficulty": 7,
        "score": 0.82
      },
      {
        "id": "niche_3",
        "idea": "LGBTQコミュニティ向けアイデンティティ塗り絵",
        "description": "多様性とジェンダーレスを表現したモダンデザイン塗り絵本。",
        "marketSize": 2,
        "popularity": 1,
        "implementationDifficulty": 9,
        "score": 0.91
      },
      {
        "id": "niche_4",
        "idea": "ニューロダイバーシティ対応塗り絵",
        "description": "自閉症スペクトラム向けの感覚統合デザイン。刺激を工夫。",
        "marketSize": 3,
        "popularity": 2,
        "implementationDifficulty": 8,
        "score": 0.85
      },
      {
        "id": "niche_5",
        "idea": "廃棄ファッション素材活用サステナブル塗り絵",
        "description": "古い布地を再利用した立体塗り絵。環境学習要素を含む。",
        "marketSize": 2,
        "popularity": 1,
        "implementationDifficulty": 9,
        "score": 0.92
      }
    ],
    "pricingStrategy": "大人向けは2,500～3,500円、シニア向けは医療施設向けとして3,000～4,000円",
    "salesChannels": "Amazon KDP、BOOTH、医療施設向け直販"
  },
  "createdAt": "2024-06-19T10:00:00Z",
  "updatedAt": "2024-06-19T10:05:00Z"
}
```

**エラーレスポンス（500 Internal Server Error）**
```json
{
  "error": "ChatGPT API error: Rate limit exceeded",
  "code": "CHATGPT_RATE_LIMIT"
}
```

---

### 4. GET /research/:researchId

**説明**：リサーチ詳細を取得

**認証**：必須（JWT）

**パスパラメータ**
```
researchId: リサーチの ObjectId
```

**レスポンス（200 OK）**
```json
{
  "researchId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "theme": "子ども向けファンタジー塗り絵",
  "targetAge": "6-12歳",
  "style": "ファンタジー",
  "additionalInfo": {...},
  "status": "completed",
  "analysis": {...},
  "createdAt": "2024-06-19T10:00:00Z",
  "updatedAt": "2024-06-19T10:05:00Z"
}
```

**エラーレスポンス（404 Not Found）**
```json
{
  "error": "Research not found",
  "code": "RESEARCH_NOT_FOUND"
}
```

---

### 5. GET /research/list

**説明**：ユーザーのリサーチ一覧を取得

**認証**：必須（JWT）

**クエリパラメータ**
```
?page=1&limit=10&status=completed
```

**レスポンス（200 OK）**
```json
{
  "total": 25,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "researchId": "507f1f77bcf86cd799439011",
      "theme": "子ども向けファンタジー塗り絵",
      "status": "completed",
      "createdAt": "2024-06-19T10:00:00Z"
    },
    // ... 最大10件
  ]
}
```

---

### 6. POST /proposal

**説明**：選択した隙間から企画書を生成

**認証**：必須（JWT）

**リクエストボディ**
```json
{
  "researchId": "507f1f77bcf86cd799439011",
  "selectedNicheId": "niche_3"
}
```

**レスポンス（200 OK）**
```json
{
  "proposalId": "507f1f77bcf86cd799439020",
  "researchId": "507f1f77bcf86cd799439011",
  "selectedNiche": {
    "id": "niche_3",
    "idea": "LGBTQコミュニティ向けアイデンティティ塗り絵",
    "description": "多様性とジェンダーレスを表現したモダンデザイン塗り絵本。"
  },
  "title": "多様性の色彩：LGBTQコミュニティ向けアイデンティティ塗り絵",
  "sections": [
    {
      "sectionId": "title",
      "sectionName": "タイトル",
      "content": "多様性の色彩：LGBTQコミュニティ向けアイデンティティ塗り絵",
      "order": 1
    },
    {
      "sectionId": "concept",
      "sectionName": "コンセプト",
      "content": "このプロジェクトは、LGBTQ+コミュニティの多様性とアイデンティティを祝うための革新的な塗り絵本です。...",
      "order": 2
    },
    {
      "sectionId": "targetAudience",
      "sectionName": "ターゲット層",
      "content": "主なターゲットは18～50歳の LGBTQ+ コミュニティメンバー、およびアライの方々です。...",
      "order": 3
    },
    {
      "sectionId": "competitorAnalysis",
      "sectionName": "競合分析",
      "content": "現在、LGBTQ+向けの塗り絵本市場は未開拓のニッチです。...",
      "order": 4
    },
    {
      "sectionId": "monetization",
      "sectionName": "マネタイズ方針",
      "content": "推奨価格帯は 2,800～3,500 円で、主に Amazon KDP および LGBTQ+ コミュニティイベント販売を予定しています。...",
      "order": 5
    },
    {
      "sectionId": "schedule",
      "sectionName": "スケジュール",
      "content": "企画完了：2024年7月 / 画像制作：2024年8～9月 / 編集・装丁：2024年9月 / KDP出版：2024年10月",
      "order": 6
    }
  ],
  "status": "draft",
  "createdAt": "2024-06-19T10:10:00Z",
  "updatedAt": "2024-06-19T10:10:00Z"
}
```

**エラーレスポンス（404 Not Found）**
```json
{
  "error": "Research or niche not found",
  "code": "NICHE_NOT_FOUND"
}
```

---

### 7. GET /proposal/:proposalId

**説明**：企画書詳細を取得

**認証**：必須（JWT）

**パスパラメータ**
```
proposalId: 企画書の ObjectId
```

**レスポンス（200 OK）**
```json
{
  "proposalId": "507f1f77bcf86cd799439020",
  "researchId": "507f1f77bcf86cd799439011",
  "selectedNiche": {...},
  "title": "...",
  "sections": [...],
  "status": "draft",
  "createdAt": "2024-06-19T10:10:00Z",
  "updatedAt": "2024-06-19T10:10:00Z"
}
```

---

### 8. PUT /proposal/:proposalId

**説明**：企画書をカスタマイズ・更新

**認証**：必須（JWT）

**パスパラメータ**
```
proposalId: 企画書の ObjectId
```

**リクエストボディ**
```json
{
  "title": "修正されたタイトル",
  "sections": [
    {
      "sectionId": "title",
      "content": "修正されたタイトル内容"
    },
    {
      "sectionId": "concept",
      "content": "修正されたコンセプト"
    }
  ],
  "status": "draft"  （draft|review|approved）
}
```

**レスポンス（200 OK）**
```json
{
  "proposalId": "507f1f77bcf86cd799439020",
  "title": "修正されたタイトル",
  "sections": [...],
  "status": "draft",
  "updatedAt": "2024-06-19T10:15:00Z"
}
```

**エラーレスポンス（403 Forbidden）**
```json
{
  "error": "You do not have permission to edit this proposal",
  "code": "PERMISSION_DENIED"
}
```

---

### 9. DELETE /proposal/:proposalId

**説明**：企画書を削除

**認証**：必須（JWT）

**パスパラメータ**
```
proposalId: 企画書の ObjectId
```

**レスポンス（200 OK）**
```json
{
  "message": "Proposal deleted successfully",
  "proposalId": "507f1f77bcf86cd799439020"
}
```

**エラーレスポンス（404 Not Found）**
```json
{
  "error": "Proposal not found",
  "code": "PROPOSAL_NOT_FOUND"
}
```

---

## エラーコード一覧

| コード | HTTP ステータス | 説明 |
|------|---------------|------|
| `INVALID_CREDENTIALS` | 401 | メールアドレスまたはパスワードが無効 |
| `EMAIL_ALREADY_EXISTS` | 400 | メールアドレスが既に登録されている |
| `UNAUTHORIZED` | 401 | JWT トークンが無効または期限切れ |
| `RESEARCH_NOT_FOUND` | 404 | リサーチが見つかりません |
| `NICHE_NOT_FOUND` | 404 | 隙間ニッチが見つかりません |
| `PROPOSAL_NOT_FOUND` | 404 | 企画書が見つかりません |
| `PERMISSION_DENIED` | 403 | この操作を実行する権限がありません |
| `VALIDATION_ERROR` | 400 | リクエストの入力値が無効 |
| `CHATGPT_RATE_LIMIT` | 500 | ChatGPT API のレート制限に達しました |
| `CHATGPT_ERROR` | 500 | ChatGPT API エラー |
| `DATABASE_ERROR` | 500 | データベースエラー |

---

## レート制限

```
GET リクエスト：1分間に 100 回
POST リクエスト：1分間に 30 回
PUT リクエスト：1分間に 30 回
DELETE リクエスト：1分間に 10 回
```

レート制限に達すると、以下のレスポンスが返されます：

```
HTTP 429 Too Many Requests

{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

---

## ページネーション

リスト取得エンドポイントは以下のクエリパラメータをサポート：

```
?page=1       （ページ番号、デフォルト: 1）
&limit=10     （1ページあたりのアイテム数、デフォルト: 10、最大: 100）
&sort=-createdAt  （ソート順序、デフォルト: -createdAt）
&status=completed （フィルター条件）
```

---

## キャッシング戦略

- **GET /research/:researchId**：5 分間キャッシュ
- **GET /proposal/:proposalId**：5 分間キャッシュ
- **GET /research/list**：キャッシュなし（常に最新）

---

## 今後の拡張

- **GET /analysis/:analysisId**：分析結果の詳細取得
- **POST /analysis/regenerate**：分析結果の再生成
- **GET /proposal/:proposalId/preview**：企画書のプレビュー（PDF）
- **POST /proposal/:proposalId/export**：企画書をファイルにエクスポート

