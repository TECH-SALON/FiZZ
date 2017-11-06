# FiZZ_site

## ディレクトリ構成に関して

- dist: デプロイ用のファイル群

- src: 開発のファイル群
  - actions: Flux設計でのaction群
    - AppActions: 外部APIとの通信や、アプリ全体に関わる状態管理のためのアクション群
    - UserActions: ユーザーに関わるアクション群
    - BotActions: Bot情報に関するアクション群
    - BattleActions: Bot間対戦に関わるアクション群

  - stores: Flux設計でのstore群
    - AppStore: サイト内のStateを一元管理

  - containers: State情報の親元
    - AppContainer: サイト内のStateをコンポーネントにそれぞれ渡す役割と、ログインの有無に応じての表示切り替え

  - components: サイト内のコンポーネント群
    - layouts: レイアウトに関するコンポーネント群
    - garage: マイページ（garage）に関するコンポーネント群
    - battle: バトルページに関するコンポーネント群
    - docs: ドキュメントページに関するコンポーネント群
    - utils: 横断的な機能を提供するコンポーネント群

  - pages: サイトの入り口に当たるページ

  - styles: src内と同じ構造でcssファイルを配置

  - assets: 静的ファイルの置き場

## アーキテクチャに関して

当サイトはサーバレスアーキテクチャによって構成されている。  
また、AWSにおいて下記のクラウドサービスを活用している
- s3: 静的ファイルを置くため
- Lambda: DBとの通信やメールの送信などはここで行う
- DynamoDB: データベース
- APIGateWay: s3,Lambda,DynamoDB間の通信はAPI経由で行う
- EC2: ゲームサーバを置く場所。必要な時にLambda経由で起動する
- Cogito: ユーザー管理

## DB構成に関して（随時更新）

- fizzBots: 登録されたBotをまとめて格納。対戦履歴も全て格納する

## チーム開発の流れに関して

開発時間は9:00-17:00まで。(12:00-13:00はお昼休憩)  
16:30までにgithubに自分の作業済みのコードをpushする。  
16:45頃から今日の振り返りをする。  

Step0: チームで今日の作業内容や目標を共有する  
Step1: githubから最新のコード群をpullしてくる  
Step2: ストーリーボードを確認して作業に取り掛かる  
Step3: githubに更新をpushする前に、もう一度リポジトリから更新差分を取得する  
Step4: 更新差分を取得してもテストが通ることを確認  
Step5: 最後にgithubに最新版をpushする  

## 命名規則など（随時更新）

1. exportされないクラス名・変数名・関数名は全てキャメルケース（例: myBot)
2. exportされるクラス名・変数名・冠す名は全てアッパーキャメルケース（例: AppActions, BotPracticeForm)
3. cssのクラス、ID名は全てチェインケース(例: my-bot)
4. Reactファイルはアッパーキャメルケース（例: BotRegisterForm.js)
5. DBのテーブル名・カラム名はキャメルケース
6. JSONのキー・値ともにキャメルケース

## コーディングの心得（随時更新）

1. 変数名・関数名にはコードの意図が伝わるように明確な単語（できるだけシンプル）を選ぶ。
2. コードの意図を初見の人でもわかるようにコメントをつける。
3. 技術的負債がたまらないようにリファクタリングは常に意識する。
4. チーム内MTGで決めた自分のタスク範囲外に当たると思われるファイルを操作する時はチームに一言伝える。

## 【新人向け】身につけておきたいスキル・知識群（随身更新）

1. Reactを用いてのフロントエンド開発の基礎（ <https://reactjs.org/tutorial/tutorial.html> )
2. Flux設計の理解（ <https://facebook.github.io/flux/docs/overview.html> )
3. Go言語での開発の文法的基礎（ <https://tour.golang.org/welcome/1> )
4. http通信に関する基礎
5. Docker操作に関する基礎
6. AWSの各種クラウドサービスの基礎
  - S3
  - DynamoDB
  - Cognito
  - Lambda
  - APIGateWay
  - EC2
7. アジャイル開発の手法に関する理解
8. Javascript/HTML/CSSの基礎理解

## ゲーム通信APIに関して
コンテナPORTとはユーザーの提出したDockerImageを展開するコンテナのこと

|ゲーム名|サーバーPORT番号|コンテナPORT#1|コンテナPORT#2|
|:---|:---|:---|:---|
|OXゲーム|8181|8182|8183|
|OXゲームPractice|8184|8182|
|Reversi|8281|8282|8283|
|ReversiPractice|8284|8282|
|Shogi|8381|8382|8382|
|ShogiPractice|8384|8382|
|Majan|8481|8482|8483|
|MajanPractice|8484|8482|
