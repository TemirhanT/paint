  
import { drawCircle } from "./Circle";
import { drawLine } from "./Line";
import { drawRectangle } from "./Rectangle";
import { drawTriangle } from "./Triangle";
  
  
  
    //ПЕРЕРИСОВКА 
    //эта функция удаляет старый рисунок фигуры и перерисовывает все другие рисунки, что уже были на экране
    // к сожалению, она начинает лагать когда массив коррдинат прошлых рисунков становится слишком большим
    // у меня не получилось оптимизировать это, перерисовывая именно элементы, входящие в территорию рисуемой фигуры, так как lineDraw не имеет beginPath в нужных местах и поэтому линии, которые не должны соединяться, соединяются из за lineTo
    // я посчитал невозможным добавлять в нужные места beginPath, чтобы исключить этот баг, поэтому оставил как есть
    // 
    // для перерисовки нужно запоминать прошлые значение color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
    // 
    //*почему то сейчас отрисовка не лагает и все выглядит очень плавно, хотя я сейчас массив координат больше в разы чем в прошлый раз. С чем это связано не знаю
    //
export const redraw = (ctx: CanvasRenderingContext2D, cash: number[][] & string[][]) => {        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.beginPath()
        for(let i in cash) {
            if(cash[+i] == null) {
                ctx.beginPath()
            } else if(cash[i][0] == 'line') {
                drawLine(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], ctx)
            } else if(cash[i][0] == 'rectangle') {
                drawRectangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - cash[+i][3], cash[+i][7] + cash[+i][3], ctx)
            } else if(cash[i][0] == 'triangle') {
                drawTriangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - cash[+i][3], cash[+i][7] + cash[+i][3], ctx)
            } else if(cash[i][0] == 'circle') {
                drawCircle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - cash[+i][3], cash[+i][7] + cash[+i][3], ctx)
            }
        }
    }