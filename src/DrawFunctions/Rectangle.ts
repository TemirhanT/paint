export const drawRectangle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, ctx: CanvasRenderingContext2D, isFill: boolean) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX - 8/scale, startY - 270/scale);
    ctx.lineTo(startX - 8/scale, y - 270/scale);
    ctx.lineTo(x - 8/scale, y - 270/scale);
    ctx.lineTo(x - 8/scale, startY - 270/scale);
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();
    ctx.beginPath();
}