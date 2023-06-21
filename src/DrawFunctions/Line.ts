export const drawLine = (x: number, y: number, linewidth: number, color: string, scale: number, ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineTo(x - 10/scale, y - 266/scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - 10/scale, y - 266/scale, linewidth/2 , 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 10/scale, y - 266/scale);
}