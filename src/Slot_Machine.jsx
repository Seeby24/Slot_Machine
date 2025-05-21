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
    const [Highscore, setHighscore] = useState(0);
    const [lang, setLang] = useState("de");
    const [spinning, setSpinning] = useState(false);

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

    function handleLangChange(event) {
        setLang(event.target.value);
    }

    function spin() {
        if (money >= einsatz && einsatz > 0) {
            setSpinning(true);
            const spinIterations = 10;
            let iterationCount = 0;

            const interval = setInterval(() => {
                const newSlots = [
                    Math.floor(Math.random() * 7) + 1,
                    Math.floor(Math.random() * 7) + 1,
                    Math.floor(Math.random() * 7) + 1,
                ];
                setSlots(newSlots);
                iterationCount++;

                if (iterationCount >= spinIterations) {
                    clearInterval(interval);
                    setTimeout(() => {
                        checkwin(newSlots);
                        if (money > Highscore) {
                            setHighscore(money);
                        }
                        setSpinning(false);
                    }, 300);
                }
            }, 100);
            setMoney((prev) => prev - einsatz);
        } else {
            if (lang === "de") {
                alert("Du hast kein Geld, du broker Penis");
            } else if (lang === "en") {
                alert("You don't have money, you broke piece of shit");
            } else {
                alert("Sprache nicht unterstützt | Language not supported");
            }
        }
    }

    const handleEinsatzChange = (event) => {
        setEinsatz(Number(event.target.value));
    };

    function checkwin(slots) {
        const [slot1, slot2, slot3] = slots;
        const fruchte = [Kirsche, Lemon, Watermelon].map(sym => symbols.indexOf(sym));
        const plane = [Plane].map(sym => symbols.indexOf(sym));
        const tower = [Skyscraper].map(sym => symbols.indexOf(sym));

        if (slot1 === slot2 && slot2 === slot3) {
            const gewinn = einsatz * 45;
            setMoney((prev) => prev + gewinn);
            if (lang === "de") {
                alert("Jackpot! Du hast " + gewinn + " Franken gewonnen! 🎉");
            } else if (lang === "en") {
                alert("Jackpot! You won " + gewinn + " Dollars! 🎉");
            } else {
                alert("Sprache nicht unterstützt | Language not supported");
            }
        }
        else if (fruchte.includes(slot1) && fruchte.includes(slot2) && fruchte.includes(slot3)) {
            const gewinn = einsatz * 10;
            setMoney((prev) => prev + gewinn);
            if (lang === "de") {
                alert(" Du hast " + gewinn + " Franken gewonnen! 🍒🍋🍉");
            } else if (lang === "en") {
                alert("You won " + gewinn + " Dollars! 🍒🍋🍉");
            } else {
                alert("Sprache nicht unterstützt | Language not supported");
            }
        }
        else if (plane.includes(slot1) && tower.includes(slot2) && tower.includes(slot3)) {
            const gewinn = einsatz * 911;
            setMoney((prev) => prev + gewinn);
            if (lang === "de") {
                alert(" Du hast " + gewinn + " Franken gewonnen! 🛬🏙️");
            } else if (lang === "en") {
                alert("You won " + gewinn + " Dollars! 🛬🏙️");
            } else {
                alert("Sprache nicht unterstützt | Language not supported");
            }
        }
    }

    return (
        <>
            <div>
                <label>
                    <input
                        type="radio"
                        name="lang"
                        checked={lang === "de"}
                        value="de"
                        onChange={handleLangChange}
                    /> Deutsch | German
                </label>
                <label>
                    <input
                        type="radio"
                        name="lang"
                        checked={lang === "en"}
                        value="en"
                        onChange={handleLangChange}
                    /> English | Englisch
                </label>
            </div>
            <div className="slot-machine">
                <div className="slots">
                    {slots.map((slot, index) => (
                        <div key={index} className="slot">
                            {slot !== null && (
                                <img
                                    src={symbols[slot]}
                                    alt={`Slot ${index}`}
                                    className={`slot-image ${spinning ? 'spin' : ''}`}
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
                            type="text"
                            onChange={handleEinsatzChange}
                            value={einsatz}
                            min="1"
                            className="einsatz-input"
                        />
                    </div>
                    <div className="highscore">🏆 Highscore: {Highscore} Fr</div>
                </div>
                <p>GitHub at: <a href="https://github.com/Seeby24/Slot_Machine">https://github.com/Seeby24/Slot_Machine</a></p>
            </div>
        </>
    );
}
