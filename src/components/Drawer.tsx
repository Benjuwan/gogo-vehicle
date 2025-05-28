import type { KonvaEventObject } from "konva/lib/Node";
import { useMemo, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { VehiclesIcon } from "./VehiclesIcon";

export const Drawer = () => {
    const [isDrawing, setDrawing] = useState<boolean>(false);

    const [lines, setLines] = useState<number[][]>([]); // points属性の型が number[] のため各 point を格納する配列（型）は number[][] となる
    const strokeColors = useMemo(() => ["red", "green", "blue", "yellow", "purple"], []);

    // クリックした位置からペイントスタート
    const handleMouseDown = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const point = evt.target.getStage()?.pointerPos; // evt.target.getStage()?.getPointerPosition();

        if (!point) {
            return;
        }

        setDrawing(true);
    };

    const handleMove = (evt: KonvaEventObject<MouseEvent | TouchEvent>) => {
        if (isDrawing === false) {
            return; // ドラッグ中以外はペイントしない
        }

        if (evt.evt instanceof MouseEvent) {
            const mouseEvtElm: MouseEvent = evt.evt;
            setLines((prevLines) => [...prevLines, [mouseEvtElm.clientX, mouseEvtElm.clientY]]);
        } else {
            const touchEvtElm: TouchEvent = evt.evt;
            setLines((prevLines) => [...prevLines, [touchEvtElm.touches[0].clientX, touchEvtElm.touches[0].clientY]]);
        }
    }

    // 離したタイミングでペイント終わる
    const handleMouseUp = () => {
        setDrawing(false);
    };

    return (
        <>
            {lines.length > 0 ?
                <VehiclesIcon props={{
                    lines: lines,
                    isDrawing: isDrawing
                }} /> :
                <p>hoge</p>
            }
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            /* points属性は、[x1,y1, x2,y2, x3,y3, ...]という具合で「2値1対」の法則 */
                            points={[line[0], line[1], line[0] + 16, line[1] + 16]} // 各点を2値1対で指定（各点を16px右下に移動させて線を描画）
                            // points={lines.flat()} // 全ての座標履歴を一次元配列に変換することで描画
                            stroke={strokeColors[Math.floor(Math.random() * strokeColors.length)]}
                            strokeWidth={5}
                        />
                    ))}
                </Layer>
            </Stage>

        </>
    );
}