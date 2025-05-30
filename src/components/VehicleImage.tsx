import { memo } from "react";
import { Image } from "react-konva"; // Stage内で画像を扱うための専用コンポーネント
import useImage from 'use-image'; // 画像の非同期読み込みとステート管理を自動化
import type { eachVehicleType } from "../types/types";

type vehicleImgPropsType = {
    vehicle: eachVehicleType;
    x: number;
    y: number;
};

export const VehicleImage = memo(({ props }: { props: vehicleImgPropsType }) => {
    const { vehicle, x, y } = props;

    // useImageフックにより、画像の非同期読み込みとステート管理を自動化
    const [image] = useImage(vehicle.iconSrc);

    return (
        <>
            <Image image={image}
                /**
                 * 乗り物アイコンの位置は微調整
                 * x: vehicle.lines.at(-1)?.at(-2) ?? 0
                 * y: vehicle.lines.at(-1)?.at(-1) ?? 0
                */
                x={x - 40} y={y - 40}
                // 画像サイズは 16/9 のアスペクト比を維持
                width={16 * 3} height={9 * 3}
            />
        </>
    );
});