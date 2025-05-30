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
    const handleMove = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        if (!isDrawing) {
            return;
        }

        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        evt.evt.preventDefault(); // タッチ操作時のスクロールを防止

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
    };

    // 離したタイミングでペイント終了
    const handleMouseUp: () => void = () => {
        setDrawing(false);
    };

    return { handleMove, handleMouseDown, handleMouseUp }
}