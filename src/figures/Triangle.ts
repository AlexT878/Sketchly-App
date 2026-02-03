import { Figure } from "./Figure.js";
import type { FigureType } from "../core/FigureFactory.js";

export class Triangle extends Figure {
    private size: number;

    constructor(x: number, y: number, color: string, size: number) {
        super(x, y, color);
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;

        const halfWidth = this.size / 2;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - halfWidth);
        ctx.lineTo(this.x - halfWidth, this.y + halfWidth);
        ctx.lineTo(this.x + halfWidth, this.y + halfWidth);
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