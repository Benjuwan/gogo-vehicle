import type { eachVehicleType } from "../types/types";

type paintResetBtnPropsType = {
    initEachVehicles: eachVehicleType[];
    setActiveVehicleIndex: React.Dispatch<React.SetStateAction<number>>;
    eachVehicle: eachVehicleType[];
    setEachVehicle: React.Dispatch<React.SetStateAction<eachVehicleType[]>>;
};

export const PaintResetBtn = ({ props }: { props: paintResetBtnPropsType }) => {
    const { initEachVehicles, setActiveVehicleIndex, eachVehicle, setEachVehicle } = props;

    // お絵かきリセット
    const resetCanvas = () => {
        setEachVehicle([initEachVehicles[0]]);
        setActiveVehicleIndex(0);
    }

    return (
        <button type="button" onClick={resetCanvas} disabled={eachVehicle.length === 0} className="rounded w-fit py-[.5em] px-[1em] disabled:bg-[#dadada] disabled:text-[#eaeaea] mb-[1em] ml-[1em] md:ml-0 bg-[#f9b12c] border border-[transparent] not-disabled:active:border-[#f9b12c] not-disabled:active:text-[#f9b12c] not-disabled:active:bg-white not-disabled:hover:border-[#f9b12c] not-disabled:hover:text-[#f9b12c] not-disabled:hover:bg-white transition-all duration-[.25s] not-disabled:cursor-pointer">Claer / Reset</button>
    );
}