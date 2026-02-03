import { Figure } from "./Figure.js";
import { FigureType } from "../core/FigureFactory.js";

export class Square extends Figure {
    private size: number;

    constructor(x: number, y: number, color: string, size: number) {
        super(x, y, color);
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
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
}