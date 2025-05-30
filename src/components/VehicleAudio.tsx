import { memo, useRef, useEffect } from "react";
import type { eachVehicleType } from "../types/types";

import audio_moving_vehicle from "../assets/bgm/moving-vehicle.mp3";
import audio_flying_vehicle from "../assets/bgm/flying-vehicle.mp3";

type vehicleAudioPropsType = {
    isDrawing: boolean;
    eachVehicle: eachVehicleType[];
    activeVehicleIndex: number;
};

export const VehicleAudio = memo(({ props }: { props: vehicleAudioPropsType }) => {
    const { isDrawing, eachVehicle, activeVehicleIndex } = props;

    // 音声再生用の参照
    const audioRef = useRef<null | HTMLAudioElement>(null);

    // 音声の制御
    useEffect(() => {
        if (isDrawing) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();

            if (audioRef.current) {
                audioRef.current.currentTime = 0; // 再生位置を初期化
            }
        }
    }, [isDrawing]);

    return (
        <audio
            src={eachVehicle[activeVehicleIndex]?.iconSrc.includes('helicopter') ?
                audio_flying_vehicle : audio_moving_vehicle}
            ref={audioRef}
            hidden
        >&nbsp;</audio>
    );
});