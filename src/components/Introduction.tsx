import { memo, useRef } from "react";

import audio_moving_vehicle from "../assets/bgm/moving-vehicle.mp3"; // https://pixabay.com/ja/sound-effects/
import audio_flying_vehicle from "../assets/bgm/flying-vehicle.mp3"; // https://maou.audio/se_sound_vehicle01/
import intro_gif from "../assets/intro.gif";

export const Introduction = memo(({ setAudioPlayOn }: { setAudioPlayOn: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const audioRef_mov = useRef<null | HTMLAudioElement>(null);
    const audioRef_fly = useRef<null | HTMLAudioElement>(null);

    // 初回のユーザー操作で音声を再生するための関数
    // ブラウザの自動再生ポリシーにより、ユーザーの操作がないと音声が再生されないため
    const firstInteractionForAudio: () => void = () => {
        setAudioPlayOn(true);

        // サンプル再生なので各BGMは即時終了
        audioRef_mov.current?.play();
        audioRef_mov.current?.pause();
        audioRef_fly.current?.play();
        audioRef_fly.current?.pause();
    }

    return (
        <section className="p-[1em]">
            <div className="shadow-[0_0_8px_inset_rgba(0,0,0,.25)] rounded p-[1em]">
                <h2 className="text-center mb-[1.5em] pb-[1em] text-lg border-dotted border-b-1 border-[#dadada]">このサイトについて</h2>
                <p className="leading-[1.8] not-last:mb-[1em]">幼児向け「乗り物お絵かきアプリ」です。</p>
                <p className="leading-[1.8] not-last:mb-[1em]">画面タップでランダムに色々な乗り物アイコンが表示されます。</p>
                <p className="leading-[1.8] not-last:mb-[1em]">タップし続ける限り、それらを動かして自由に線を引けるので、乗り物を自在に動かしながらお絵描きドライブを楽しみましょうー</p>
                <figure className="w-fit m-auto p-[.5em] rounded bg-[#f9b12c]"><img src={intro_gif} alt="実際に操作している参照用gif" /></figure>
            </div>
            <button
                type="button"
                onClick={firstInteractionForAudio}
                className="block leading-[1.8] cursor-pointer rounded w-[calc(100vw/2)] max-w-[30rem] mx-auto my-[2em] p-[1em] bg-[#f9b12c] border border-[transparent] text-black active:bg-white hover:bg-white active:border-[#f9b12c] hover:border-[#f9b12c] active:text-[#f9b12c] hover:text-[#f9b12c] transition-all duration-[.25s]"
            >お絵かきスタート ♪
                <span className="text-xs block mt-[.5em]">※このサイトでは音声が再生されます</span>
            </button>
            <audio src={audio_moving_vehicle} ref={audioRef_mov} hidden>&nbsp;</audio>
            <audio src={audio_flying_vehicle} ref={audioRef_fly} hidden>&nbsp;</audio>
        </section>
    );
});
