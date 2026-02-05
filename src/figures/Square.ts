import { Figure, type Bounds } from "./Figure.js";
import { FigureType } from "../core/FigureFactory.js";

export class Square extends Figure {
    private size: number;

    constructor(x: number, y: number, color: string, size: number) {
        super(x, y, color);
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const posX = this.x - this.size / 2;
        const posY = this.y - this.size / 2;

        ctx.fillStyle = this.color;
        ctx.fillRect(posX, posY, this.size, this.size);

        ctx.strokeStyle = "#000000"; 
        ctx.lineWidth = 1;          
        
        ctx.strokeRect(posX, posY, this.size, this.size);
    }

    isPointInside(mouseX: number, mouseY: number): boolean {
        const left = this.x - this.size / 2;
        const right = this.x + this.size / 2;
        const top = this.y - this.size / 2;
        const bottom = this.y + this.size / 2;

        const isInsideX = mouseX >= left && mouseX <= right;
        const isInsideY = mouseY >= top  && mouseY <= bottom;

        return isInsideX && isInsideY;
    }

    getType(): FigureType {
        return FigureType.SQUARE;
    }

    getBounds(): Bounds {
        const halfSize = this.size / 2;

        return {
            left: this.x - halfSize,
            right: this.x + halfSize,
            top: this.y - halfSize,
            bottom: this.y + halfSize
        };
    }
}