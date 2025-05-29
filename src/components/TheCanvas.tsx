import type { KonvaEventObject } from "konva/lib/Node";
import { memo, useMemo } from "react";
import { Stage, Layer, Line } from "react-konva";
import { isMixedStroked } from "../constants/choseStrokeType";
import { useCtrlKonvaLines, type linesPointType } from "../hooks/useCtrlKonvaLines";

type canvasPropsType = {
    lines: number[][];
    setLines: React.Dispatch<React.SetStateAction<number[][]>>;
    isDrawing: boolean;
    setDrawing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TheCanvas = memo(({ props }: { props: canvasPropsType }) => {
    const { lines, setLines, isDrawing, setDrawing } = props;

    // stroke の色をランダムに選ぶための配列
    const initStrokeColors = useMemo(() => ["#d96868", "#efa449", "#ffe9a7"], []);

    // 座標位置の操作を担う関数
    const { ctrlKonvaLines } = useCtrlKonvaLines();

    // クリックした位置からペイント開始
    const handleMouseDown: (evt: KonvaEventObject<MouseEvent | TouchEvent>) => void = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const point: linesPointType | undefined = ctrlKonvaLines(evt);
        if (typeof point === 'undefined') {
            return;
        }

        // 既存配列に、新しい配列を追加してスタート（座標）位置をセット（※型が number[][] なので [...prevLines, [point.x, point.y]] という指定） 
        setLines((prevLines) => [...prevLines, [point.x, point.y]]);
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

        if (isMixedStroked) {
            setLines((prevLines) => [...prevLines, [point.x, point.y]]);
        } else {
            // 最後に書いた線(配列の最後尾)のインデックス取得
            const lastIdx = lines.length - 1;
            setLines((prev) => [
                // 完成済の線のみまずはセット
                ...prev.slice(0, lastIdx),
                // 現在ペイント中の線に現在地を追加して更新
                [...prev[lastIdx], point.x, point.y]
            ]);
        }
    };

    // 離したタイミングでペイント終了
    const handleMouseUp: () => void = () => {
        setDrawing(false);
    };

    // お絵かきリセット
    const resetCanvas: () => void = () => {
        setLines([]);
    }

    return (
        <>
            <button type="button" onClick={resetCanvas} disabled={lines.length === 0} className="rounded w-fit py-[.5em] px-[1em] disabled:bg-[#dadada] disabled:text-[#eaeaea] mb-[1em] bg-[#f9b12c] border border-[transparent] not-disabled:active:border-[#f9b12c] not-disabled:active:text-[#f9b12c] not-disabled:active:bg-white not-disabled:hover:border-[#f9b12c] not-disabled:hover:text-[#f9b12c] not-disabled:hover:bg-white transition-all duration-[.25s] not-disabled:cursor-pointer">claer / reset</button>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 160}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                className="bg-[#f3f3f3]"
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            /* points属性は、[x1,y1, x2,y2, x3,y3, ...]という具合で「2値1対」の法則 */
                            points={isMixedStroked ?
                                // 各点を2値1対で指定（始点x, 始点y, 終点x, 終点y）
                                [line[0], line[1], line[0], line[1]] :
                                line
                            }
                            stroke={initStrokeColors[Math.floor(Math.random() * initStrokeColors.length)]} // 描画（再レンダリング）の度にランダム混合色を生成する（※混合色ではなく一色にしたい場合は useState<string> で状態管理してやる）
                            strokeWidth={24}
                            tension={1} // 線の曲がり具合を制御（値の範囲: 0 ～ 1 で、数値が低いほど角ばる）
                            lineCap="round" // 線の端点のスタイルを定義（`round`:◯ 端点, `butt`:| 端点, `square`:□ 端点）
                            lineJoin="round" // 線と線が接続する部分のスタイルを定義（`round`: 丸い接続, `miter`: 尖った接続, `bevel`: 斜めの接続）
                        />
                    ))}
                </Layer>
            </Stage>
        </>
    );
});