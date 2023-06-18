export const drawLine = (x: number, y: number, linewidth: number, color: string, scale: number, ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y - 270/scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y - 270/scale, linewidth/2 , 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y - 270/scale);
}