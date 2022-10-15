export default function blinkF1RGBButton(f1, button, color, time = 300) {
    let state = 0;
    const inter = setInterval(() => f1.setRGB(button, ...((++state)%2 ? color : [0,0,0])), time);
    return () => clearInterval(inter);
}
