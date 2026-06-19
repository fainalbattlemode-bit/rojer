import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

interface MarketAnalysisInput {
  theme: string;
  targetAge: string;
  style: string;
  additionalInfo?: Record<string, any>;
}

interface ProposalGenerationInput {
  originalTheme: string;
  nicheIdea: string;
  nicheDescription: string;
}

export class ChatGPTService {
  static async analyzeMarket(input: MarketAnalysisInput) {
    const prompt = `あなたは本の市場分析のエキスパートです。

以下のテーマについて、詳細な市場分析を行ってください：

テーマ：${input.theme}
対象年齢：${input.targetAge}
スタイル：${input.style}
その他の情報：${JSON.stringify(input.additionalInfo || {})}

以下の項目について分析結果をJSON形式で提供してください：

1. competitorAnalysis：既存の競合商品（塗り絵本）の分析
2. marketSize：推定市場規模
3. trend：現在のトレンド
4. targetAudience：詳細なターゲット層の分析
5. pricingStrategy：推奨価格帯
6. salesChannels：販売チャネルの提案

さらに、以下の条件で市場の隙間を5つ提案してください：
- 市場規模が小さい（1～3）
- 普及度が低い（1～3）
- 実現難度が高い（7～10）

各隙間について：
{
  "id": "niche_X",
  "idea": "隙間のアイデア名",
  "description": "詳細説明",
  "marketSize": 1-10,
  "popularity": 1-10,
  "implementationDifficulty": 1-10
}

以下のJSON形式のみで返してください：
{
  "competitorAnalysis": "...",
  "marketSize": "...",
  "trend": "...",
  "targetAudience": "...",
  "marketNiches": [...],
  "pricingStrategy": "...",
  "salesChannels": "..."
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from ChatGPT');
      }

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from ChatGPT response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return analysis;
    } catch (error: any) {
      console.error('ChatGPT API error:', error);
      throw new Error(
        `ChatGPT API error: ${error.message || 'Unknown error'}`
      );
    }
  }

  static async generateProposal(input: ProposalGenerationInput) {
    const prompt = `あなたは書籍企画のプロです。

以下の隙間ニッチについて、詳細な企画書を作成してください：

隙間アイデア：${input.nicheIdea}
説明：${input.nicheDescription}
元のテーマ：${input.originalTheme}

以下のセクションで企画書を構成してください：

1. **タイトル**：効果的で魅力的なタイトル
2. **コンセプト**：書籍の基本コンセプト
3. **ターゲット層**：具体的なターゲット層
4. **競合分析**：類似商品との差別化ポイント
5. **マネタイズ方針**：販売戦略と予想売上
6. **スケジュール**：企画から出版までのスケジュール

各セクションは200～500字で詳しく記述してください。

以下のJSON形式のみで返してください：
{
  "sections": [
    {
      "sectionId": "title",
      "sectionName": "タイトル",
      "content": "...",
      "order": 1
    },
    ...
  ]
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from ChatGPT');
      }

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from ChatGPT response');
      }

      const proposal = JSON.parse(jsonMatch[0]);
      return proposal;
    } catch (error: any) {
      console.error('ChatGPT API error:', error);
      throw new Error(
        `ChatGPT API error: ${error.message || 'Unknown error'}`
      );
    }
  }
}
