import type { KonvaEventObject } from "konva/lib/Node";

export type linesPointType = {
    x: number;
    y: number;
};

// 座標位置の操作を担う関数
export const useCtrlKonvaLines = () => {
    const ctrlKonvaLines: (evt: KonvaEventObject<MouseEvent | TouchEvent>) => linesPointType | undefined = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        // `getStage()`： `Konva`の Stageインスタンスを取得するための専用メソッド
        // ライブラリを使用する際は、そのライブラリが提供する手法を優先的に使用することで、より安定した実装が可能となる
        const stage = evt.target.getStage();
        if (!stage) {
            return;
        }

        // ステージ（`<canvas>`）のDOMコンテナの位置を取得
        const stageBox = stage.container().getBoundingClientRect();

        // イベントの種類に応じて座標を取得し、ステージの位置を考慮して補正
        // 現在のカーソル位置から`<canvas>`の基準値を差し引くことで対象エリア（`<canvas>`）内における適切な座標（カーソル位置）を取得
        const point: linesPointType = evt.evt instanceof MouseEvent ?
            // マウス座標 
            {
                x: evt.evt.clientX - stageBox.left,
                y: evt.evt.clientY - stageBox.top
            } :
            // タッチ座標
            {
                x: evt.evt.touches[0].clientX - stageBox.left,
                y: evt.evt.touches[0].clientY - stageBox.top
            };

        return point
    }

    return { ctrlKonvaLines }
}
