export default function allLedsRgb(f1, color = [0, 0, 0], cols = [1,2,3,4]) {
    cols.forEach(col => {
        for (let i = col; i <= 16; i+=4) {
            f1.setRGB('p' + i,...color);
        }
    })
}
