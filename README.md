# gogo-vehicle
幼児向け乗り物お絵かきアプリ。
1. 画面タップすることで、ランダムに色々な乗り物アイコンが表示される
2. 乗り物アイコンをタップし続ける限り、それらを動かして自由に線を引ける

- `src\constants\choseStrokeType.ts`<br>
`choseStrokeType.ts`内の`isMixedStroked`変数の値によって、ランダム混合色（`true`）で描画するか、ランダム一色（`false`）で描画するかを選べる。

## `react-konva`
> KonvaをReactで使いやすくしたKonva公式のライブラリ。<br>
> HTML5canvasをReactコンポーネントとして扱えるツールで、図形を操作したり、アニメーションをつけたりできる

- 参照記事：[react-konvaでお絵かきアプリをつくる](https://qiita.com/yukinonyukinon/items/4cc4b0a36dfa20723c0d)

- `Konva`, `react-konva`インストールコマンド<br>
```bash
npm install react-konva konva --save
```

## 技術構成
- @eslint/js@9.27.0
- @tailwindcss/vite@4.1.8
- @types/react-dom@19.1.5
- @types/react@19.1.6
- @vitejs/plugin-react@4.5.0
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.20
- eslint@9.27.0
- globals@16.2.0
- konva@9.3.20
- react-dom@19.1.0
- react-konva@19.0.4
- react@19.1.0
- tailwindcss@4.1.8
- typescript-eslint@8.33.0
- typescript@5.8.3
- vite@6.3.5
