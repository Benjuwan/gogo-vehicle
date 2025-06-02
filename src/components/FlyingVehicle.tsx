import { memo } from "react";

import ufo from "../assets/vehicles/ufo.svg";

export const FlyingVehicle = memo(() => {
    return (
        <figure className="flyingVehicle"><img className="align-middle" src={ufo} alt="ufo" /></figure>
    );
});