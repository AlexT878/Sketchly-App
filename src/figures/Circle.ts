import type { FigureType } from "../core/FigureFactory.js";
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
        throw new Error("Not yet implemented.");
    }

    getType(): FigureType {
        throw new Error("Not yet implemented.");
    }
}