export const drawRectangle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, ctx: CanvasRenderingContext2D, isFill: boolean) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY - 270/scale);
    ctx.lineTo(startX, y - 270/scale);
    ctx.lineTo(x, y - 270/scale);
    ctx.lineTo(x, startY - 270/scale);
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();
    ctx.beginPath();
}