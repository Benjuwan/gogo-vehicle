import type { KonvaEventObject } from "konva/lib/Node";
import { useMemo } from "react";
import type { eachVehicleType, linesPointType } from "../types/types";
import { vehicles } from "../constants/theVehicles";
import { useCtrlKonvaLines } from "./useCtrlKonvaLines";

import initVehicleIcon from "../assets/vehicles/vehicle-001.svg";

export const useHandleInteractive = (
    activeVehicleIndex: number,
    setActiveVehicleIndex: React.Dispatch<React.SetStateAction<number>>,
    isDrawing: boolean,
    setDrawing: React.Dispatch<React.SetStateAction<boolean>>,
    setEachVehicle: React.Dispatch<React.SetStateAction<eachVehicleType[]>>
) => {
    const { ctrlKonvaLines } = useCtrlKonvaLines();

    // stroke の色をランダムに選ぶための配列
    const initStrokeColors = useMemo(() => ["#d96868", "#efa449", "#ffe9a7"], []);

    // クリックした位置からペイント開始
    const handleMouseDown = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        const newVehicle: eachVehicleType = {
            iconSrc: activeVehicleIndex > 0 ? vehicles[Math.floor(Math.random() * vehicles.length)] : '',
            stroke: initStrokeColors[Math.floor(Math.random() * initStrokeColors.length)],
            lines: [[point.x, point.y]] // 型が number[][] なので [[point.x, point.y]] という指定（記述）
        };
        setEachVehicle(prev => [...prev, newVehicle]);

        // eachVehicle 配列内の各要素へアクセスするためのインデックスを加算することで「配列内要素数を把握」する
        //（アクティブな描画要素のインデックスを更新し、次の描画操作のための参照値として使用）
        setActiveVehicleIndex(prev => prev + 1);

        setDrawing(true);
    };

    // ドラッグ操作
    const handleMove = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        if (!isDrawing) {
            return;
        }

        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        setEachVehicle(prev => {
            // 既存の eachVehicle の内容（シャローコピー）
            const newVehicles = [...prev];
            // 現在描画中の更新対象を指定（eachVehicle 配列内のインデックス該当要素）
            const activeVehicle = newVehicles[activeVehicleIndex];

            if (activeVehicleIndex <= 2) {
                // 初期描画時のアイコン表示制御
                activeVehicle.iconSrc = initVehicleIcon;
            }

            // 最後に書いた線(配列の最後尾)のインデックス取得
            const lastLineIndex = activeVehicle.lines.length - 1;
            if (lastLineIndex >= 0) {
                // 現在描画中の線（配列の最後の要素）に、新しい座標を追加
                //（※コード内容的には、更新対象要素の number[][] の一次配列内（要素）を更新）
                activeVehicle.lines[lastLineIndex] = [
                    ...activeVehicle.lines[lastLineIndex], // 既存の座標を展開
                    point.x, point.y                       // 新しい座標を追加
                ];
            }

            // 上記修正・加工を行った更新対象要素（eachVehicle 配列内のインデックス該当要素）を含む既存内容を返却
            return newVehicles;
        });
    };

    // 離したタイミングでペイント終了
    const handleMouseUp: () => void = () => {
        setDrawing(false);
    };

    return { handleMove, handleMouseDown, handleMouseUp }
}