export const drawCircle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, ctx: CanvasRenderingContext2D, isFill: boolean) => {
    ctx.lineWidth = linewidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const difRadX = x > startX ? (x - startX)/2 : (startX - x)/2;
    const difRadY = y > startY ? (y - startY)/2 : (startY - y)/2;
    const radius = difRadX > difRadY ? difRadY : difRadX
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startX + (x - startX)/2 - 8/scale, startY + (y - startY)/2 - 270/scale, radius, 0, Math.PI * 2);
    isFill ? ctx.fill() : ctx.stroke();
    ctx.beginPath();
}
