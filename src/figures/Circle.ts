import { FigureType } from "../core/FigureFactory.js";
import { Figure } from "./Figure.js";

export class Circle extends Figure {
    private radius: number;

    constructor(x: number, y: number, color: string, radius: number) {
        super(x, y, color);
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    isPointInside(mouseX: number, mouseY: number): boolean {
        const left = this.x - this.radius;
        const right = this.x + this.radius;
        const top = this.y - this.radius;
        const bottom = this.y + this.radius;

        const isInsideX = mouseX >= left && mouseX <= right;
        const isInsideY = mouseY >= top  && mouseY <= bottom;

        return isInsideX && isInsideY;
    }

    getType(): FigureType {
        return FigureType.CIRCLE;
    }
}