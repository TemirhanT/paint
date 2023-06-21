export const drawTriangle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, ctx: CanvasRenderingContext2D, isFill: boolean) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX + (x - startX)/2, y - 270/scale);
    ctx.lineTo(startX, startY - 270/scale);
    ctx.lineTo(x, startY - 270/scale);
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();
    ctx.beginPath();
}
