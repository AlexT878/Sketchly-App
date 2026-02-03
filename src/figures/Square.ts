import { Figure } from "./Figure.js";

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
}