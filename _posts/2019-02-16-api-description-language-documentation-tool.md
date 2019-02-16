---
layout: post
title: "API 記述言語やドキュメンテーションツールの比較（Swagger、API Blueprint、RAML）"
slug: api-description-language-documentation-tool
date: 2019-02-16 11:30:00 +0900
tags:
- API Language
- RESTful API
---


## 背景

「最近」というには最近すぎる気がしますが、今日のシステム開発では、変化し続ける要件に対応するため、システム自体にも柔軟性がもとめられています。

その中でも、サーバーとクライアント、またはサーバー同士のやり取りのためのインターフェイスである Web API（以下、小面倒なので平たく API と呼びます）は Web システムにとって、もはや欠かせないものだと思います。  
その API を設計する際には多くの人が RESTful API や GraphQL を採用するでしょう。

しかし、採用したものの設計方針が人によって微妙にバラつきがあったり、ドキュメントの運用保守ができていなかったり、モックや API コンソールを作らなければならなかったり、ドキュメントからではなくコードから書く人がいたりと、開発規模や状況に応じていろいろなレベルの課題が存在します。

そろそろ上記のようなことは API 設計が終わった段階で 8 割くらい終わっている状態にしたいですよね。  
API の保守は、ソースコードそのものだけでなく、ドキュメント、API コンソールやスタブ、単体テストなど影響が広範囲に及びます。  
それらの解決の手助けをしてくれるのが API ドキュメンテーションツール（一部では API フレームワークとも呼ばれている？）です。


## API ドキュメンテーションツールとは

API ドキュメンテーションツールは、設計から開発、ドキュメント生成までをワンストップでサポートします。  
最近のツールでいうと、そのツールが対応している記述方式（API 記述言語というべきか？）で API を定義することで、以下のようなことができます。

<!-- more -->


### API ドキュメンテーションツールで出来ること

|機能名|説明|
|:--|:--|
|ドキュメント|記述方式に則って書いたものがユーザーに見易い形でドキュメント生成されるような機能です。|
|エディター|記述した定義がフォーマット通りか検証してくれたり、書いたものがすぐにドキュメントプレビューされるような機能です。|
|コンソール|API のリクエストパラメーターを書き換えて API を実行するための機能です。リクエストをモックサーバーか実際の API サーバーに向けることで、リクエストに応じた結果が返ってくるでしょう。|
|モック|プログラミング言語に応じたモックアッププログラムを生成する機能です。自前の AP サーバーに仕込んで動かし、仕様に則ったリクエストを送ることで実行結果を返してくれるでしょう。|
|ボトムアップ|ソースコードから API 仕様書をおこす機能です。ソースコードと仕様書を同時に管理したい場合などに使えるのではないか。|

このように色々な機能が付いています。
また、記述方式がプログラミング言語ではないので学習コストが比較的少なく、標準化されていることから書き手による表記の揺らぎも少ないため、メンテナンス性の面でも問題を解消する手助けとなります。


### 代表的な記述方式（API 記述言語）

API ドキュメンテーションツールを利用するにあたり、それぞれに記述方式があります。  
ざっくりと OpenAPI Specification（旧 Swagger Specification。以下、OAS）、API Blueprint、RAML の 3 つでしょうか。  
これらの方式に則ることでドキュメンテーションツールに正しく情報を伝えられます。


#### 各 API 言語の比較表

|項目| OpenAPI Specification（OAS） |API Blueprint|RAML|
|:--|:-:|:-:|:-:|
|Web サイト|[swagger.io](https://swagger.io)|[apiblueprint.org](https://apiblueprint.org)|[raml.org](https://raml.org)|
|記述方式|YAML or JSON|Markdown|YAML|
|リリース|2011 年 7 月|2013 年 4 月|2013 年 9 月|
|スポンサー|OpenAPI Initiative（OAI）|Apiary|MuleSoft|
|ソフトウェアライセンス|Apache 2.0|MIT|Apache 2.0|


#### OpenAPI Specification（OAS）

前項の問題を解消する手助けとなるのが、OSS の API ドキュメンテーションツールである OAS です。  
OAS は RESTful API の標準化団体である OpenAPI Initiative（OAI）が採用しているツールです。

[ここ](https://swagger.io/blog/api-strategy/difference-between-swagger-and-openapi/) にも記載がある通り、去年だか一昨年だかに Swagger の仕様（Swagger Specification）はその名称を OpenAPI Specification（OAS）と変えました。

ただし、Swagger という名称は OAS を実装したツールとして生きているようです。  
記述形式は YAML か JSON Schema です。  
仕様に存在しないことは表現できません。


##### Swagger サンプル

Apiary（後述）で生成した Swagger サンプルです。  
既に Swagger のバージョンは 3.0.2 ですが、Apiary では v2.0 だけしか対応していないようです。

定義枠があるのでコンポーネント化でき、使い回しが効き、設計が統一できるのは良いところですね。

```yaml:OAS&nbsp;v2.0
swagger: '2.0'
info:
  version: '1.0'
  title: "Test API"
  description: Polls is a simple API allowing consumers to view polls and vote in them.
  license:
    name: MIT
    url: https://github.com/apiaryio/polls-api/blob/master/LICENSE
host: polls.apiblueprint.org
basePath: /
schemes:
- http
consumes:
- application/json
produces:
- application/json
paths:
  /questions:
    x-summary: Questions Collection
    get:
      summary: List All Questions
      responses:
        200:
          description: Successful Response
          schema:
            type: array
            items:
              $ref: '#/definitions/Question'
          examples:
            application/json:
              - question: Favourite programming language?
                published_at: '2015-08-05T08:40:51.620Z'
                choices:
                  - choice: Swift
                    votes: 2048
                  - choice: Python
                    votes: 1024
                  - choice: Objective-C
                    votes: 512
                  - choice: Ruby
                    votes: 256
    post:
      description: >-
        You may create your own question using this action. It takes a JSON
        object containing a question and a collection of answers in the
        form of choices.
      summary: Create a New Question
      parameters:
        - name: body
          in: body
          required: true
          schema:
            $ref: '#/definitions/QuestionRequest'
      responses:
        201:
          description: ''
          schema:
            $ref: '#/definitions/Question'
          examples:
            application/json:
                question: Favourite programming language?
                published_at: '2015-08-05T08:40:51.620Z'
                choices:
                  - choice: Swift
                    votes: 0
                  - choice: Python
                    votes: 0
                  - choice: Objective-C
                    votes: 0
                  - choice: Ruby
                    votes: 0
definitions:
  Question:
    title: Question
    type: object
    properties:
      question:
        type: string
      published_at:
        type: string
      choices:
        type: array
        items:
          $ref: '#/definitions/Choice'
    required:
      - question
      - published_at
      - choices
  Choice:
    title: Choice
    type: object
    properties:
      votes:
        type: integer
        format: int32
      choice:
        type: string
    required:
      - votes
      - choice
  QuestionRequest:
    title: Question Request
    type: object
    properties:
      question:
        type: string
      choices:
        type: array
        items:
          type: string
    required:
      - question
      - choices
    example:
      question: Favourite programming language?
      choices:
        - Swift
        - Python
        - Objective-C
        - Ruby
```


#### API Blueprint

API Blueprint もまた API 記述言語です。  
コンセプトは「シンプルで簡潔かつ表現力が豊か」というイメージです。  
というのも記述形式は Markdown を拡張したものですし、Markdown であるがゆえに表現の幅が広いのが特長です。


##### API Blueprint サンプル

当然ですが、慣れ親しんだ Markdown って感じですね。  
謳っている通り Markdown で書けるのでコードブロックなど駆使して好き勝手に定義できるのがメリットであり、デメリットでもあるのでしょうね。

```markdown:API&nbsp;Blueprint&nbsp;1A
FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# Test API

Polls is a simple API allowing consumers to view polls and vote in them.

## Questions Collection [/questions]

### List All Questions [GET]

+ Response 200 (application/json)

        [
            {
                "question": "Favourite programming language?",
                "published_at": "2015-08-05T08:40:51.620Z",
                "choices": [
                    {
                        "choice": "Swift",
                        "votes": 2048
                    }, {
                        "choice": "Python",
                        "votes": 1024
                    }, {
                        "choice": "Objective-C",
                        "votes": 512
                    }, {
                        "choice": "Ruby",
                        "votes": 256
                    }
                ]
            }
        ]

### Create a New Question [POST]

You may create your own question using this action. It takes a JSON
object containing a question and a collection of answers in the
form of choices.

+ Request (application/json)

        {
            "question": "Favourite programming language?",
            "choices": [
                "Swift",
                "Python",
                "Objective-C",
                "Ruby"
            ]
        }

+ Response 201 (application/json)

    + Headers

            Location: /questions/2

    + Body

            {
                "question": "Favourite programming language?",
                "published_at": "2015-08-05T08:40:51.620Z",
                "choices": [
                    {
                        "choice": "Swift",
                        "votes": 0
                    }, {
                        "choice": "Python",
                        "votes": 0
                    }, {
                        "choice": "Objective-C",
                        "votes": 0
                    }, {
                        "choice": "Ruby",
                        "votes": 0
                    }
                ]
            }
```


#### RAML

上２つと同様に RAML もまた API 記述言語です。  
RAML は RESTful API Modeling Language の頭文字をとった略語です。  
謳い文句的には「設計からシェアまで API のライフサイクルの管理を手軽に」ということらしいです。


##### RAML サンプル

[APIMATIC](https://www.apimatic.io) を使って Swagger から RAML に変換してみました。  
何やら Swagger に近いですね。

```yaml:RAML&nbsp;v1.0
#%RAML 1.0
title: Test API
version: 1.0
baseUri: http://polls.apiblueprint.org/
baseUriParameters: {}
protocols:
- HTTP
documentation:
- title: Test API
  content: Polls is a simple API allowing consumers to view polls and vote in them.
types:
  Question:
    example:
      value:
        question: Favourite programming language?
        published_at: 2015-08-05T08:40:51.0000000Z
        choices:
        - choice: Swift
          votes: 2048
        - choice: Python
          votes: 1024
        - choice: Objective-C
          votes: 512
        - choice: Ruby
          votes: 256
    displayName: Question
    type: object
    properties:
      question:
        required: true
        displayName: question
        type: string
      published_at:
        required: true
        displayName: published_at
        type: string
      choices:
        required: true
        displayName: choices
        type: array
        items:
          type: Choice
  Choice:
    displayName: Choice
    type: object
    properties:
      votes:
        required: true
        displayName: votes
        type: integer
        format: int32
      choice:
        required: true
        displayName: choice
        type: string
  QuestionRequest:
    example:
      value:
        question: Favourite programming language?
        choices:
        - Swift
        - Python
        - Objective-C
        - Ruby
    displayName: QuestionRequest
    type: object
    properties:
      question:
        required: true
        displayName: question
        type: string
      choices:
        required: true
        displayName: choices
        type: array
        items:
          type: string
/questions:
  get:
    displayName: ListAllQuestions
    description: List All Questions
    responses:
      200:
        description: Successful Response
        body:
          application/json:
            example:
              value:
              - question: Favourite programming language?
                published_at: 2015-08-05T08:40:51.0000000Z
                choices:
                - choice: Swift
                  votes: 2048
                - choice: Python
                  votes: 1024
                - choice: Objective-C
                  votes: 512
                - choice: Ruby
                  votes: 256
            displayName: response
            description: Successful Response
            type: array
            items:
              type: Question
  post:
    displayName: CreateaNewQuestion
    description: You may create your own question using this action. It takes a JSON object containing a question and a collection of answers in the form of choices.
    body:
      application/json:
        displayName: body
        type: QuestionRequest
    responses:
      201:
        description: Success
        body:
          application/json:
            example:
              value:
                question: Favourite programming language?
                published_at: 2015-08-05T08:40:51.0000000Z
                choices:
                - choice: Swift
                  votes: 0
                - choice: Python
                  votes: 0
                - choice: Objective-C
                  votes: 0
                - choice: Ruby
                  votes: 0
            displayName: response
            type: Question
```


#### Google Trends でのトレンド具合

Google トレンドで各記述方式を調べてみました。  
API という文字列が入っていない Swagger、RAML はフェアに API を付けて、OpenAPI は OAI も含まれたりと意味が広くなりそうので敢えて API を付けてトレンドにかけてみました。

<img width="100%" alt="Swagger, API Blueprint, RAML OpenAPI のトレンド具合" src="https://qiita-image-store.s3.amazonaws.com/0/6930/bfa7cf80-07eb-9427-b1ba-0f6fb9728aa1.png">

（ [Google Trends で見る](https://trends.google.co.jp/trends/explore?date=2016-01-01%202019-02-16&q=API%20Swagger,API%20Blueprint,API%20RAML,API%20OpenAPI) ）

Swagger が強いですね。


### 代表的な API ドキュメンテーションツール

いま現在、代表的な API ドキュメンテーションツールは Swagger、Apiary の 2 つでしょうか。  
これらの API ドキュメンテーションツールを簡単に比較してみました。


#### 各 API ドキュメンテーションツールの比較表

|項目|Swagger|Apiary|
|:--|:-:|:-:|
|Web サイト| [swagger.io](https://swagger.io) | [apiary.io](https://apiary.io) |
|API 言語|OAS|API Blueprint, OAS|
|エディター|o|o|
|コンソール|o|o|
|モック生成|o|o|
|クライアントサイドのコード生成|o|x|
|ドキュメント生成|o|o|
|ボトムアップ対応|o|x|

※ RAML は公式ページにプラグインがたくさん投稿されており、それらを組み合わせて利用するため、恐らく比較表に挙がっているようなことはできるでしょう  
※ Apiary の OAS はバージョン 2.0 のみ対応しているようです（2019/02/16 時点）


## 最後に

ここまで API 言語、API ドキュメンテーションツールのことについて簡単に紹介してきました。  
ただ、実際に開発するときにこの方式を採用するには開発のワークフローごと変えないといけないことに気づくかと思います。

そもそもの課題は冒頭で触れた下記のようなことであったため、設計、周知、開発、テスト、リリース、運用保守されて始めて導入したメリットが出てきます。

> しかし、採用したものの設計方針が人によって微妙にバラつきがあったり、ドキュメントの運用保守ができていなかったり、モックや API コンソールを作らなければならなかったり、ドキュメントからではなくコードから書く人がいたりと、開発規模や状況に応じていろいろなレベルの課題が存在します。

※ 2017 年の末頃から書き始めていた本記事ですが、途中から全く手付かずでようやく着地させました...。


## 関連記事

- [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification)
- [僕が考えた最強のAPIドキュメント生成](http://gin0606.hatenablog.com/entry/2016/02/16/144910)
- [Swagger+JSON SchemaでAPIの型をテストして開発サイクルをスピードアップさせた話](https://inside.pixiv.blog/edvakf/2473)
- [RESTful API の文書化と定義に Swagger を使用する](https://www.ibm.com/developerworks/jp/web/library/wa-use-swagger-to-document-and-define-restful-apis/index.html)
