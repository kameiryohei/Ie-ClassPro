# 【成果物】<br>大学生の履修登録を簡易化するアプリ「ClassPlanner」

<br>
<a href="https://class-planner-mu.vercel.app/">
<img alt="スクリーンショット" src="https://github.com/kameiryohei/Ie-ClassPro/assets/130110817/c9fcf06a-9215-400e-9d40-72bb1f811040">
</a>
<br>

## サービス名

「**ClassPlanner**」

## サービスコンセプト

履修プランを共有して、履修に関する悩みを解消し、充実した学生生活を送ろう！

## 開発のきっかけ

私は現在大学 3 年生です。所属する学部の卒業要件が非常に複雑で、卒業までに何を履修すべきか把握するのが難しい状況にあります。具体的には、学部内に 2 つのコースがあり、卒業までに 4 つのプログラムを達成する必要があります。それぞれのコースでは必修授業が異なり、プログラムごとに必修科目や選択必修科目（決められた授業から一定数の単位を取得）が異なるためです。<br>
さらに、X の投稿を見ていると、「先輩の過去の履修プランを知りたい」「履修登録期間が短く困っている」などの悩みを目にしました。
このような問題を解決するためには、履修プランを共有できる場所が必要だと考えました。春休みの成果として何かを残したいと考え、履修計画を共有するための Web アプリ「ClassPlanner」の開発を始めました。

## 「ClassPlanner」の概要

履修プランを投稿し、どのように感じたのか、どんな目的でそのプランにしたのかを記録することができます。これにより、後輩が履修プランを組む際の参考にすることができます。<br>
大学生の履修に関する情報はすべてここで得られる！そんなプラットフォームを目指しています！

### サービス URL: https://class-planner-mu.vercel.app/

### 技術記事(Zenn)：https://zenn.dev/ryohei08/articles/629de87a464298

## 制作期間

約 1 か月と 2 週間（継続開発中で、最初に完成した時点での期間）

## 仕様スタック

- 使用言語
  - TypeScript
- フレームワーク
  - Next.js
- UI ライブラリ
  - Shadcn/ui, TailwindCSS
- バックエンド/DB
  - Next.js (API Routes), Supabase(PostgreSQL)
- CI / CD
  - Github Actions
  - Vercel
- ソースコード管理
  - Git/GitHub
- その他
  - React-Hook-Form, Zod（フォーム,バリデーション）
  - Prisma(ORM)
  - react-hot-toast（トースト）
  - React Icons（アイコン）

## 主な機能

### ユーザー関連

- 新規ユーザー登録機能
- ログイン機能（メール＆パスワード）
- マイページの取得とユーザー情報更新機能（ユーザー名、大学、学部、学科、学年）

### 履修プラン投稿関連

- 履修プラン情報の一覧取得、詳細取得、投稿、更新、削除機能（投稿、更新、削除はログインユーザーのみ可能）

### 口コミ投稿関連

- 口コミの投稿、一覧取得、詳細取得、削除機能（投稿機能はログインユーザーのみ可能、削除機能は作成したユーザーのみ可能）

## 追記(2024 年 10 月 8 日)

本プロダクトは最初に完成した後も継続的に開発を続けており、追加で実装した機能を以下に示します。

- CI (GitHub Actions)

  - Lint とテストを自動実行できる環境を構築しました。
  - 実装の理由として、今後の継続開発において保守性を高めるためです。

- Jest を用いたテストコード

  - 上記の GitHub Actions で自動テストを実行するために作成しました。
  - 現在の時点ですべてのコンポーネントに対してテストが行えておらず、継続的に実施しています。

- ESLint でのルール設定

  - Next.js の初期セットアップ時点で ESLint を導入していましたが、ルールを定めていなかったため、設定を行いました。
  - 特に`jsx-a11y`というライブラリをインストールし、コード中のアクセシビリティに問題のある箇所を修正しました。

- React コンポーネントごとの責務の統一化とリファクタリング

  - `page.tsx`で`"use client"`を使用している箇所があり、Next.js のアンチパターンに該当する書き方をしてしまったため、随時修正中です。
  - データをフェッチする処理と見た目を構成する部分が一つのコンポーネントに混在しており、可読性が悪く、テストをしづらいという懸念点があったため、改善を続けています。

- セキュリティ面の改善

  - プロダクトを初めて完成させた当時、特定のユーザーのみがアクセスできるページに、URL を変更することでアクセスできる脆弱性が見つかりました。
  - `<NotAllowPage />`コンポーネントを作成し、特定の処理を追加することで一部改善しました。
  - また、CORS について、現状の API は Postman などからのリクエストを受け付けてしまう設定になっており、これにより意図しないアクセスが可能となっています。現在、CORS の適切な設定方法を模索中です。

- バックエンド処理を Go によるリファクタリング
  - 現在の API は Next.js の API Routes を使用しており、認証と DB に Supabase を利用しています。
    - 選択した理由として、当時利用可能な技術スタックでプロダクトを作りたかったためです。
  - 新しく Go を学び始めたことをきっかけに、「ClassPlanner」のバックエンドをリプレイスすることを最終目標として学習しています。
  - 現在リポジトリを分けて実装中ですが、フロントエンドの改修も進めており、時間をかけて進めています。
  - リポジトリ URL：https://github.com/kameiryohei/class-planner-BE
