# gogo-vehicle

[`GoGo Vehicle`](https://k2webservice.xsrv.jp/r0105/gogo/)は、幼児向け乗り物お絵かきアプリです。
1. 画面タップすることで、ランダムに色々な乗り物アイコンが表示される
2. 乗り物アイコンをタップし続ける限り、それらを動かして自由に線を引ける

![Image](https://github.com/user-attachments/assets/338dc9fd-5db0-4114-80e7-8e5eaebc87c9)

---

シール帳にシールを張るように、タップするだけで色々な乗り物を表示できます。

![Image](https://github.com/user-attachments/assets/6d6592be-d951-4c62-a526-94e505777606)

---

- `src\constants\choseStrokeType.ts`<br>
`choseStrokeType.ts`内の`isMixedStroked`変数の値によって、ランダム混合色（`true`）で描画するか、ランダム一色（`false`）で描画するかを選べる。

## 乗り物アイコン
各乗り物アイコンのアセットは`src\constants\theVehicles.ts`で一元管理しています。

## `react-konva`
> KonvaをReactで使いやすくしたKonva公式のライブラリ。<br>
> HTML5canvasをReactコンポーネントとして扱えるツールで、図形を操作したり、アニメーションをつけたりできる

- 参照記事：[react-konvaでお絵かきアプリをつくる](https://qiita.com/yukinonyukinon/items/4cc4b0a36dfa20723c0d)

- `Konva`, `react-konva`インストールコマンド<br>
```bash
npm install react-konva konva --save
```

## 技術構成
- @eslint/js@9.38.0
- @tailwindcss/vite@4.1.14
- @types/react-dom@19.2.2
- @types/react@19.2.2
- @vitejs/plugin-react@5.0.4
- eslint-plugin-react-hooks@7.0.0
- eslint-plugin-react-refresh@0.4.24
- eslint-plugin-react@7.37.5
- eslint@9.38.0
- globals@16.4.0
- konva@10.0.2
- react-dom@19.2.0
- react-konva@19.0.10
- react@19.2.0
- tailwindcss@4.1.14
- typescript-eslint@8.46.1
- typescript@5.9.3
- use-image@1.1.4
- vite@7.1.10

## 備忘録
### Reactアプリケーションを（一つのコンテンツとして）部分的に埋め込みたい場合

<details>
<summary>※フローや注意事項はこちらに記載</summary>

#### ビルド成果物を適当な場所にアップ（ホスティング）
現状デプロイ先：`https://k2webservice.xsrv.jp/r0105/gogo`

#### Reactアプリケーションを（一つのコンテンツとして）部分的に埋め込みたいページを編集

```html
<!-- CSSを読み込む -->
<!-- 後述する Vite設定前（ハッシュ付き、ビルド毎に変わる）: -->
<!-- <link rel="stylesheet" href="/<部分的に表示させたいページのパス>/assets/index-abc123.css"> -->

<!-- Vite設定後（固定ファイル名）: -->
<link rel="stylesheet" crossorigin href="/r0105/gogo/assets/index.css">

<!-- Reactアプリが表示される場所 -->
<div id="root"></div>

<!-- JSを読み込む -->
<!-- 後述する Vite設定前（ハッシュ付き、ビルド毎に変わる）: -->
<!-- <script type="module" src="/<部分的に表示させたいページのパス>/assets/index-def456.js"></script> -->

<!-- Vite設定後（固定ファイル名）: -->
<script type="module" crossorigin src="/r0105/gogo/assets/bundle.js"></script>
```

※ビルドのたびにファイル名を更新する必要があるので注意。Vite を使っていると以下の記述を行うことでファイル名を固定できる

#### Vite設定： `vite.config.ts`
```ts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // base: '/r0105/gogo', // ビルド成果物のホスティング先パスを指定
  /* 以下を追記することでビルド成果物のファイル名を固定できる */
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/bundle.js',
        chunkFileNames: 'assets/[name].js',  // `[name]`は、viteの本番ビルド用バンドラー`Rollup`が自動的に決定したチャンク名やアセット名を使用するプレースホルダー
        assetFileNames: (assetInfo) => {
          // CSSファイルは固定名
          if (assetInfo.names.includes('.css')) {
            return 'assets/bundle.css';
          }
          // その他のアセット（画像等）は元の名前を保持
          return 'assets/[name].[ext]';
        }
      }
    }
  }
})
```

#### デプロイ後にスタイルが崩れている場合
アプリケーション側のスタイル優先度が低いために起こっているので以下を試して対応する

- CSS（スタイルシート）の読み込み位置を最後方に持ってくる（CSSは後述優先なので最後の方に記述してスタイル優先度を上げる）
  - スタイル指定において詳細度を高める工夫を行う（例：親要素に`id`属性をあてて、それをベースにスタイル指定する）

##### Tailwind CSS を使っている場合
1. プロジェクトルートに`tailwind.config.js`を用意する
- `tailwind.config.js`
```js
export default {
    important: '#root', // すべての Tailwind クラスに #root の詳細度を付与（これでもダメだった場合は以下の !important 付与を実行）
    // important: true,  //  すべての Tailwind クラスに !important を付与
    corePlugins: {
        preflight: true, // Tailwind のリセット CSS を有効化
    },
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
```

2. `src/index.css`にTailwind CSSの設定（`tailwind.config.js`）を読み込ませる
```diff
@import "tailwindcss";

+ @config "../tailwind.config.js";

@layer utilities {
    ...
    ..
    .
}
```

> [!NOTE]
> `@config`に、`Unknown at rule @configcss(unknownAtRules)`と警告が表示される場合があるが、これは**VSCodeのCSS言語サーバーがTailwind CSS 4の`@config`を認識していないだけ**で挙動に問題はない

3. ビルドし、生成されたCSS（`https://<ホスティング先パス>/assets/bundle（または index-xxx）.css`）を確認して`!important`が付与されているかをチェックする
- ※余計なスタイルが当たっている場合は他のCSSが効いているケースなので地道に打ち消す

</details>

---

### `src\hooks\useHandleInteractive.ts`の`handleMove`メソッドにおける描画要素Stateの更新アプローチについて
現状、自分が使い慣れた**[`splice`メソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)を用いた要素差し替え**という実装アプローチを採用している。

<details>
<summary>GitHub Copilot が提案したアプローチ</summary>

セッター関数（`setEachVehicle`）内で処理実行し、最終的に`map`関数を通じて更新配列を取得する実装アプローチ。<br>
セッター関数の`prev`（既存State）を用いることで既存配列を取り扱っているため、現実装での`eachVehicle`（`eachVehicleType[]`）をカスタムフックに渡す必要がなくなる。

```ts
setEachVehicle(prev => {
    // 最後に書いた線(配列の最後尾)のインデックス取得
    const lastLineIndex = prev[activeVehicleIndex].lines.length - 1;

    const updatedVehicle = {
        // 既存の各プロパティ
        ...prev[activeVehicleIndex],

        // 初期描画時のアイコン表示制御
        iconSrc: activeVehicleIndex <= 2 ?
            initVehicleIcon :
            prev[activeVehicleIndex].iconSrc,

        // 更新対象の配列要素（アクティブな配列要素が最終描画された要素）の場合
        // 現在描画中の線（配列の最後の要素）に新しい座標を追加
        lines: prev[activeVehicleIndex].lines.map((line, index) =>
            index === lastLineIndex ?
                [...line, point.x, point.y] // 既存の座標に新しい座標を追加
                : line // 既存の座標を展開
        )
    };

    // 更新対象（アクティブな配列要素）のインデックスの場合は新しい配列要素に差し替え、それ以外は既存の要素を維持
    return [...prev].map((vehicle, index) =>
        index === activeVehicleIndex ? updatedVehicle : vehicle
    );
});
```

</details>