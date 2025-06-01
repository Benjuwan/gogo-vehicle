import { memo } from "react";

import vehicle_helicopter from "../assets/vehicles/vehicle-helicopter.svg";

export const FlyingVehicle = memo(() => {
    return (
        <figure className="flyingVehicle"><img className="align-middle" src={vehicle_helicopter} alt="ヘリコプター" /></figure>
    );
});