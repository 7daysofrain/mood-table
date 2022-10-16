export default function blinkF1Button(f1, button, time = 300) {
    let state = 0;
    const inter = setInterval(() => f1.setLED(button, (++state)%2), time);
    return () => clearInterval(inter);
}
