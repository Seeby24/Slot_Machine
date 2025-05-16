import {useState} from "react";
import Glocke from "./assets/Glocke.png";
import Lemon from "./assets/lemon.png";
import Kirsche from "./assets/Kirsche.png";
import Plane from "./assets/Plane.png";
import Seven from "./assets/Seven.png";
import Skyscraper from "./assets/Skyscraper.png";
import Watermelon from "./assets/watermelon.png";
import "./Slot.css"

export default function SlotMachine() {
    const [slots, setSlots] = useState([Glocke, Lemon, Kirsche]);
    const [Money, setMoney] = useState(500);
    const [Einsatz, setEinsatz] = useState(0)

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
        if (Money >= Einsatz && Einsatz > 0) {
            const newSlots = [
                Math.floor(Math.random() * 7) + 1,
                Math.floor(Math.random() * 7) + 1,
                Math.floor(Math.random() * 7) + 1,
            ];
            setSlots(newSlots);
            setMoney((prev) => prev - Einsatz);


            setTimeout(() => {
                checkwin(newSlots);
            }, 300);
        } else {
            alert("Du hast kein Geld oder der Einsatz ist 0.");
        }
    }


    const handleEinsatzChange = (event) => {
        setEinsatz(Number(event.target.value));
    };

    function checkwin(slots) {
        const [slot1, slot2, slot3] = slots;

        if (slot1 === slot2 && slot2 === slot3) {
            const gewinn = Einsatz * 4;
            setMoney((prev) => prev + gewinn);
            alert("Jackpot! Du hast " + gewinn + " Franken gewonnen! 🎉");
        }
    }

    return (
        <>
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
            <h2>Money</h2>
            <div className="Money">{Money}</div>
            <div className="Einsatz">
                <input type="number" onChange={handleEinsatzChange} min="1"/>
            </div>

        </>

    )
        ;
}
