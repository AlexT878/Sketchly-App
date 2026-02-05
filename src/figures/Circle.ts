import { FigureType } from "../core/FigureFactory.js";
import { Figure, type Bounds } from "./Figure.js";

export class Circle extends Figure {
    private radius: number;

    constructor(x: number, y: number, color: string, radius: number) {
        super(x, y, color);
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();
    }

    // TODO IMPLEMENT MORE PRECISE METHOD
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

    getBounds(): Bounds {
        const halfSize = this.radius;

        return {
            left: this.x - halfSize,
            right: this.x + halfSize,
            top: this.y - halfSize,
            bottom: this.y + halfSize
        };
    }
}