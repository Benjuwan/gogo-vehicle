# gogo-vehicle

[`GoGo Vehicle`](https://k2webservice.xsrv.jp/r0105/gogo/)は、幼児向け乗り物お絵かきアプリです。
1. 画面タップすることで、ランダムに色々な乗り物アイコンが表示される
2. 乗り物アイコンをタップし続ける限り、それらを動かして自由に線を引ける

![Image](https://github.com/user-attachments/assets/338dc9fd-5db0-4114-80e7-8e5eaebc87c9)

---

シール帳にシールを張るように、タップするだけで色々な乗り物を表示できます。

![Image](https://github.com/user-attachments/assets/6d6592be-d951-4c62-a526-94e505777606)

---

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
- @eslint/js@9.39.2
- @tailwindcss/vite@4.1.18
- @types/react-dom@19.2.3
- @types/react@19.2.7
- @vitejs/plugin-react@5.1.2
- eslint-plugin-react-hooks@7.0.1
- eslint-plugin-react-refresh@0.4.26
- eslint-plugin-react@7.37.5
- eslint@9.39.2
- globals@16.5.0
- konva@10.0.12
- react-dom@19.2.3
- react-konva@19.2.1
- react@19.2.3
- tailwindcss@4.1.18
- typescript-eslint@8.50.0
- typescript@5.9.3
- use-image@1.1.4
- vite@7.3.0

## 備忘録
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