import create from "zustand";
import capeSound from "./audio/flapping_cape.mp3";
import flySound from "./audio/kjell_fly.mp3";
import arrivalSound from "./audio/kjell_pass_by.mp3";
import zikSound from "./audio/zik.mp3";

// Create a store ...
const zik = new Audio(zikSound);
const cape = new Audio(capeSound);
const fly = new Audio(flySound)
const arrival = new Audio(arrivalSound)
export const [useStore] = create(set => ({
    count: 0,
    welcome: true,
    api: {
        zik() {
            zik.currentTime = 0;
            zik.volume = 0.5;
            zik.play();
        },
        cape() {
            cape.currentTime = 0;
            cape.volume = 0.5;
            cape.play();
        },
        fly() {
            fly.currentTime = 0;
            fly.volume = 0.5;
            fly.play();
        },
        arrival() {
            arrival.currentTime = 0;
            arrival.volume = 0.5;
            arrival.play();
        },
    },
}))