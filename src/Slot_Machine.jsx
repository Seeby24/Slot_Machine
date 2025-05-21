import { useState } from "react";
import Glocke from "./assets/Glocke.png";
import Lemon from "./assets/lemon.png";
import Kirsche from "./assets/Kirsche.png";
import Plane from "./assets/Plane.png";
import Seven from "./assets/Seven.png";
import Skyscraper from "./assets/Skyscraper.png";
import Watermelon from "./assets/watermelon.png";
import "./Slot.css";

export default function SlotMachine() {
    const [slots, setSlots] = useState([Glocke, Lemon, Kirsche]);
    const [money, setMoney] = useState(500);
    const [einsatz, setEinsatz] = useState(0);
    const [Higscore,setHighscore] = useState(0)

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
        if (money >= einsatz && einsatz > 0) {
            const newSlots = [
                Math.floor(Math.random() * 7) + 1,
                Math.floor(Math.random() * 7) + 1,
                Math.floor(Math.random() * 7) + 1,
            ];
            setSlots(newSlots);
            setMoney((prev) => prev - einsatz);

            setTimeout(() => {
                checkwin(newSlots);
                if(money>Higscore){
                    setHighscore(money)
                }
            }, 300);
        } else {
            alert("Du hast kein Geld du broker penis");
        }
    }

    const handleEinsatzChange = (event) => {
        setEinsatz(Number(event.target.value));
    };

    function checkwin(slots) {
        const [slot1, slot2, slot3] = slots;
        const fruchte =[Kirsche,Lemon, Watermelon].map(sym=>symbols.indexOf(sym))
        const plane= [Plane].map(sym=>symbols.indexOf(sym))
        const tower= [Skyscraper].map(sym=>symbols.indexOf(sym))


        if (slot1 === slot2 && slot2 === slot3) {
            const gewinn = einsatz * 45;
            setMoney((prev) => prev + gewinn);
            alert("Jackpot! Du hast " + gewinn + " Franken gewonnen! 🎉");
        }
        else if(fruchte.includes(slot1) && fruchte.includes(slot2) && fruchte.includes(slot3))
        {
            const gewinn = einsatz * 10;
            setMoney((prev) => prev + gewinn);
            alert(" Du hast " + gewinn + " Franken gewonnen! 🍒🍋🍉");
        }
        else if(plane.includes(slot1) && tower.includes(slot2) && tower.includes(slot3)){
            const gewinn = einsatz * 911
            setMoney((prev) => prev + gewinn);
            alert(" Du hast " + gewinn + " Franken gewonnen! ");


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

                <div className="status-container">
                    <div>💰 Geld: {money} Fr</div>
                    <div>
                        Einsatz:
                        <input
                            type="number"
                            onChange={handleEinsatzChange}
                            value={einsatz}
                            min="1"
                            className="einsatz-input"
                        />
                    </div>
                    <div className="highscore">🏆 Highscore: {Higscore} Fr</div>
                </div>
            </div>
        </>
    );
}
