import { useRef } from "react";

import vehicle_001 from "../assets/vehicles/vehicle-001.svg";
import vehicle_002 from "../assets/vehicles/vehicle-002.svg";
import vehicle_003 from "../assets/vehicles/vehicle-003.svg";
import vehicle_004 from "../assets/vehicles/vehicle-004.svg";
import vehicle_005 from "../assets/vehicles/vehicle-005.svg";
import vehicle_006 from "../assets/vehicles/vehicle-006.svg";
import vehicle_007 from "../assets/vehicles/vehicle-007.svg";
import vehicle_008 from "../assets/vehicles/vehicle-008.svg";
import vehicle_009 from "../assets/vehicles/vehicle-009.svg";
import vehicle_010 from "../assets/vehicles/vehicle-010.svg";

import audio_moving_vehicle from "../assets/bgm/moving-vehicle.mp3";
import audio_flying_vehicle from "../assets/bgm/flying-vehicle.mp3";

type vehiclesType = {
    lines: number[][];
    isDrawing: boolean;
};

export const VehiclesIcon = ({ props }: { props: vehiclesType }) => {
    const { lines, isDrawing } = props;

    const audioRef = useRef<null | HTMLAudioElement>(null);

    const audiosets = [audio_moving_vehicle, audio_flying_vehicle];
    const vehicles = [
        vehicle_001, vehicle_002, vehicle_003, vehicle_004,
        vehicle_005, vehicle_006, vehicle_007, vehicle_008,
        vehicle_009, vehicle_010
    ];
    console.log(audiosets[Math.floor(Math.random() * audiosets.length)]);
    console.log(vehicles[Math.floor(Math.random() * vehicles.length)]);

    if (isDrawing) {
        audioRef.current?.play();
    } else {
        audioRef.current?.pause();
    }

    return (
        <>
            <figure
                style={{ "transform": `translate(${lines.at(-1)?.[0]}px, ${lines.at(-1)?.[1]}px)` }}
                className={isDrawing ? "vehicle" : undefined}
            ><img className="max-w-[3rem] align-middle" src={vehicle_001} alt="乗り物アイコン" /></figure>
            <audio src={audio_moving_vehicle} ref={audioRef}>&nbsp;</audio>
        </>
    );
}