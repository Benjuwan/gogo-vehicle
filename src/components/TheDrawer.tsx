import { memo, useState } from "react";
import { Vehicles } from "./Vehicles";
import { Introduction } from "./Introduction";
import { TheCanvas } from "./TheCanvas";

export const TheDrawer = memo(() => {
    const [isDrawing, setDrawing] = useState<boolean>(false);

    // points属性の型が number[] のため各 point を格納する配列（型）は number[][] となる（※規模が大きくなればグローバルステートに切り替える）
    const [lines, setLines] = useState<number[][]>([]);

    // ブラウザの自動再生ポリシーにより、ユーザーの操作がないと音声が再生されないので音声再生準備の状態チェック用State（※規模が大きくなればグローバルステートに切り替える）
    const [isAudioPlayOn, setAudioPlayOn] = useState<boolean>(false);

    return (
        <main className="overflow-hidden max-w-[60rem] m-auto">
            {isAudioPlayOn ?
                <>
                    {lines.length > 0 &&
                        <Vehicles props={{
                            lines: lines,
                            isDrawing: isDrawing
                        }} />
                    }
                    <TheCanvas props={{
                        lines: lines,
                        setLines: setLines,
                        isDrawing: isDrawing,
                        setDrawing: setDrawing
                    }} />
                </>
                : <Introduction setAudioPlayOn={setAudioPlayOn} />
            }
        </main>
    );
});