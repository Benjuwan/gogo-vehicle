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
    eachVehicle: eachVehicleType[],
    setEachVehicle: React.Dispatch<React.SetStateAction<eachVehicleType[]>>
) => {
    const { ctrlKonvaLines } = useCtrlKonvaLines();

    // stroke の色をランダムに選ぶための配列
    const initStrokeColors = useMemo(() => ["#d96868", "#efa449", "#ffe9a7"], []);

    // クリックした位置からペイント開始
    const handleMouseDown: (evt: KonvaEventObject<MouseEvent | TouchEvent>) => void = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        evt.evt.preventDefault(); // タッチ操作時のスクロールを防止

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
    const handleMove: (evt: KonvaEventObject<MouseEvent | TouchEvent>) => void = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        if (!isDrawing) {
            return;
        }

        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        evt.evt.preventDefault(); // タッチ操作時のスクロールを防止

        // 最後に書いた線（配列最後尾）のインデックス取得
        const lastLineIndex = eachVehicle[activeVehicleIndex].lines.length - 1;

        // 更新用の eachVehicleType 型要素（オブジェクト）
        const updateEachVehicle: eachVehicleType = {
            // アクティブ（現在操作中＝最後に書いた線／配列最後尾）な配列内要素（の既存の各プロパティ）
            ...eachVehicle[activeVehicleIndex],

            // 初期描画時のアイコン表示制御
            iconSrc: activeVehicleIndex === 1 ? initVehicleIcon : eachVehicle[activeVehicleIndex].iconSrc,

            // 更新対象（アクティブ／現在操作中＝最後に書いた線／配列最後尾）の配列要素の場合
            // 既存の座標に新しい座標を追加
            lines: [...eachVehicle][activeVehicleIndex].lines.map((line, index) =>
                index === lastLineIndex ?
                    [...line, point.x, point.y] // 既存の座標に新しい座標を追加
                    : line // 既存の座標を展開
            )
        }

        const updatedEachVehicles: eachVehicleType[] = [...eachVehicle];
        // 更新対象は新しい配列要素に差し替えて、それ以外は既存の要素を維持
        updatedEachVehicles.splice(activeVehicleIndex, 1, updateEachVehicle);
        setEachVehicle(updatedEachVehicles);
    };

    // 離したタイミングでペイント終了
    const handleMouseUp: () => void = () => {
        setDrawing(false);
    };

    return { handleMove, handleMouseDown, handleMouseUp }
}