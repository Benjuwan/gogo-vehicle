import { memo, useState } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import { Image } from "react-konva"; // Stage内で画像を扱うための専用コンポーネント
import useImage from 'use-image'; // 画像の非同期読み込みとステート管理を自動化
import type { eachVehicleType } from "../types/types";
import { PaintResetBtn } from "./PaintResetBtn";
import { FlyingVehicle } from "./FlyingVehicle";
import { VehicleAudio } from "./VehicleAudio";
import { VehicleImage } from "./VehicleImage";
import { useHandleInteractive } from "../hooks/useHandleInteractive";

import backgroundImage from "../assets/sample-map-min.jpg";

export const TheCanvas = memo(() => {
    const [mapImg] = useImage(backgroundImage);

    const [isDrawing, setDrawing] = useState<boolean>(false);

    // eachVehicle 配列内の各要素へアクセスするためのインデックスState（描画中の要素を特定するために使用）
    const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);

    const initEachVehicles: eachVehicleType[] = [
        {
            iconSrc: "",
            stroke: "#333",
            lines: []
        }
    ];
    const [eachVehicle, setEachVehicle] = useState<eachVehicleType[]>(initEachVehicles);

    const { handleMove, handleMouseDown, handleMouseUp } = useHandleInteractive(activeVehicleIndex, setActiveVehicleIndex, isDrawing, setDrawing, eachVehicle, setEachVehicle);

    return (
        <>
            <PaintResetBtn props={{
                initEachVehicles: initEachVehicles,
                setActiveVehicleIndex: setActiveVehicleIndex,
                eachVehicle: eachVehicle,
                setEachVehicle: setEachVehicle
            }} />
            <div className="relative overflow-hidden">
                <FlyingVehicle />
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight / 1.5}
                    onMouseMove={handleMove}
                    onTouchMove={handleMove}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchEnd={handleMouseUp}
                    className="bg-[#f3f3f3] touch-none"  // touch-none：タッチ操作のネイティブな動作を無効化
                >
                    {/* 背景画像レイヤー */}
                    <Layer>
                        <Image
                            image={mapImg}
                            width={960}
                            height={640}
                        />
                    </Layer>
                    {/* 描画レイヤー */}
                    <Layer>
                        {eachVehicle.map((vehicle, i) => (
                            // Group： 線と画像を1つのユニットとして管理するためのコンポーネント
                            <Group key={i}>
                                {vehicle.lines.map((line, lineIdx) => (
                                    <Line
                                        key={`${i}-${lineIdx}`}
                                        /* points属性は、[x1,y1, x2,y2, x3,y3, ...]という具合で「2値1対」の法則 */
                                        points={line}
                                        stroke={vehicle.stroke}
                                        strokeWidth={24}
                                        tension={1} // 線の曲がり具合を制御（値の範囲: 0 ～ 1 で、数値が低いほど角ばる）
                                        lineCap="round" // 線の端点のスタイルを定義（`round`:◯ 端点, `butt`:| 端点, `square`:□ 端点）
                                        lineJoin="round" // 線と線が接続する部分のスタイルを定義（`round`: 丸い接続, `miter`: 尖った接続, `bevel`: 斜めの接続）
                                    />
                                ))}
                                {vehicle.lines.length > 0 && (
                                    <VehicleImage props={{
                                        vehicle: vehicle,
                                        x: vehicle.lines.at(-1)?.at(-2) ?? 0, // number[][] なので at 2回
                                        y: vehicle.lines.at(-1)?.at(-1) ?? 0  // number[][] なので at 2回
                                    }} />
                                )}
                            </Group>
                        ))}
                    </Layer>
                </Stage>
            </div>
            {/* konva ライブラリの管轄コンポーネント内には konva ライブラリのものしか入れないので audio 部分は以下のように分離 */}
            <VehicleAudio props={{
                isDrawing: isDrawing,
                eachVehicle: eachVehicle,
                activeVehicleIndex: activeVehicleIndex
            }} />
        </>
    );
});