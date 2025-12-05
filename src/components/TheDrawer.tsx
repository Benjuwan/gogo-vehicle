import { memo, useState } from "react";
import { Introduction } from "./Introduction";
import { TheCanvas } from "./TheCanvas";

export const TheDrawer = memo(() => {
    // ブラウザの自動再生ポリシーにより、ユーザーの操作がないと音声が再生されないので音声再生準備の状態チェック用State（※規模が大きくなればグローバルステートに切り替える）
    const [isAudioPlayOn, setAudioPlayOn] = useState<boolean>(false);

    return (
        <main className="overflow-hidden w-full m-auto">
            {isAudioPlayOn ? <TheCanvas /> : <Introduction setAudioPlayOn={setAudioPlayOn} />}
        </main>
    );
});