import { memo, useEffect, useRef, useState } from "react";

import vehicle_001 from "../assets/vehicles/vehicle-001.svg";
import vehicle_002 from "../assets/vehicles/vehicle-002.svg";
import vehicle_003 from "../assets/vehicles/vehicle-003.svg";
import vehicle_004 from "../assets/vehicles/vehicle-004.svg";
import vehicle_005 from "../assets/vehicles/vehicle-005.svg";
import vehicle_006 from "../assets/vehicles/vehicle-006.svg";
import vehicle_007 from "../assets/vehicles/vehicle-007.svg";
import vehicle_008 from "../assets/vehicles/vehicle-008.svg";
import vehicle_009 from "../assets/vehicles/vehicle-009.svg";
import vehicle_helicopter from "../assets/vehicles/vehicle-helicopter.svg";

import audio_moving_vehicle from "../assets/bgm/moving-vehicle.mp3";
import audio_flying_vehicle from "../assets/bgm/flying-vehicle.mp3";

type vehiclesType = {
    lines: number[][];
    isDrawing: boolean;
};

export const Vehicles = memo(({ props }: { props: vehiclesType }) => {
    const { lines, isDrawing } = props;

    const vehicles = [
        vehicle_001, vehicle_002, vehicle_003, vehicle_004,
        vehicle_005, vehicle_006, vehicle_007, vehicle_008,
        vehicle_009, vehicle_helicopter
    ];

    const audioRef = useRef<null | HTMLAudioElement>(null);

    const [theVehicle, setVehicle] = useState<string>(vehicle_001);

    if (isDrawing) {
        audioRef.current?.play();
    } else {
        audioRef.current?.pause();
    }

    useEffect(() => {
        if (isDrawing) {
            setVehicle(vehicles[Math.floor(Math.random() * vehicles.length)]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing]);

    // console.log(lines.at(-1));
    // console.log(lines.at(-1)?.at(-2), lines.at(-1)?.at(-1));

    return (
        <>
            <figure
                style={{
                    // 乗り物アイコンの位置は微調整
                    "transform": `translate(${Number(lines.at(-1)?.at(-2)) - 40}px, ${Number(lines.at(-1)?.at(-1)) + 40}px)`
                }}
                className={isDrawing ? 'activeVehicle' : undefined}
            ><img className="max-w-[3.5rem] align-middle" src={theVehicle} alt="乗り物アイコン" /></figure>
            <audio
                src={theVehicle.includes('helicopter') ?
                    audio_flying_vehicle : audio_moving_vehicle}
                ref={audioRef}
                hidden
            >&nbsp;</audio>
        </>
    );
});