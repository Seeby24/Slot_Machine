import { useState } from "react";
import Glocke from "./assets/Glocke.png";
import Lemon from "./assets/lemon.png";
import Kirsche from "./assets/Kirsche.png";
import Plane from "./assets/Plane.png";
import Seven from "./assets/Seven.png";
import Skyscraper from "./assets/Skyscraper.png";
import Watermelon from "./assets/watermelon.png";

export default function SlotMachine() {
    const [slots, setSlots] = useState([null, null, null]);

    const symbols = [
        null,
        Glocke,
        Lemon,
        Kirsche,
        Plane,
        Seven,
        Skyscraper,
        Watermelon,
    ];

    function spin() {
        const newSlots = [
            Math.floor(Math.random() * 7) + 1,
            Math.floor(Math.random() * 7) + 1,
            Math.floor(Math.random() * 7) + 1,
        ];
        setSlots(newSlots);
    }

    return (
        <div className="slot-machine">
            <div className="slots">
                {slots.map((slot, index) => (
                    <div key={index} className="slot">
                        {slot !== null && (
                            <img
                                src={symbols[slot]}
                                alt={`Slot ${index}`}
                                className="slot-image"
                            />
                        )}
                    </div>
                ))}
            </div>
            <button className="spin-button" onClick={spin}>
                Drehen
            </button>
        </div>
    );
}
