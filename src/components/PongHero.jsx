import React, { useEffect, useRef, useState } from 'react';
import '../css/PongHero.css';

const CHAR_MAPS = {
    'C': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    'Y': [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    'N': [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
    ],
    'E': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    'T': [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    '2': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    '0': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    '6': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
};

const TEXT = "CYNET 2026";

const PongHero = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('active');

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        // Constants
        const PIXEL_SIZE = 12;
        const PIXEL_GAP = 2;
        const CHAR_GAP = 15;
        const BALL_RADIUS = 8;
        const PADDLE_WIDTH = 100;
        const PADDLE_THICKNESS = 10;
        const PADDLE_SPEED = 0.15; // Tracking speed multiplier

        const COLORS = {
            bg: '#06060c',
            ball: '#00f3ff',
            paddle: '#b829ff',
            text: '#ffffff',
            hit: '#333344',
            glow: 'rgba(0, 243, 255, 0.4)',
        };

        let width, height;
        let pixels = [];
        let ball = { x: 0, y: 0, dx: 4, dy: 4 };
        let paddles = {
            top: { x: 0, y: 0 },
            bottom: { x: 0, y: 0 },
            left: { x: 0, y: 0 },
            right: { x: 0, y: 0 },
        };

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            pixels = [];
            const textWidth = TEXT.split('').length * (5 * (PIXEL_SIZE + PIXEL_GAP)) + (TEXT.split('').length - 1) * CHAR_GAP;
            const startX = (width - textWidth) / 2;
            const startY = (height - (7 * (PIXEL_SIZE + PIXEL_GAP))) / 2;

            let currentX = startX;
            TEXT.split('').forEach((char) => {
                if (char === ' ') {
                    currentX += CHAR_GAP * 2;
                    return;
                }
                const map = CHAR_MAPS[char];
                if (!map) return;

                for (let r = 0; r < map.length; r++) {
                    for (let c = 0; c < map[r].length; c++) {
                        if (map[r][c] === 1) {
                            pixels.push({
                                x: currentX + c * (PIXEL_SIZE + PIXEL_GAP),
                                y: startY + r * (PIXEL_SIZE + PIXEL_GAP),
                                hit: false,
                                transition: 0
                            });
                        }
                    }
                }
                currentX += 5 * (PIXEL_SIZE + PIXEL_GAP) + CHAR_GAP;
            });

            ball.x = width / 2;
            ball.y = height / 4;

            paddles.top.x = width / 2 - PADDLE_WIDTH / 2;
            paddles.top.y = 20;

            paddles.bottom.x = width / 2 - PADDLE_WIDTH / 2;
            paddles.bottom.y = height - 20 - PADDLE_THICKNESS;

            paddles.left.x = 20;
            paddles.left.y = height / 2 - PADDLE_WIDTH / 2;

            paddles.right.x = width - 20 - PADDLE_THICKNESS;
            paddles.right.y = height / 2 - PADDLE_WIDTH / 2;
        };

        const update = () => {
            // Ball movement
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Paddle tracking
            paddles.top.x += (ball.x - (paddles.top.x + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.bottom.x += (ball.x - (paddles.bottom.x + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.left.y += (ball.y - (paddles.left.y + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.right.y += (ball.y - (paddles.right.y + PADDLE_WIDTH / 2)) * PADDLE_SPEED;

            // Constrain paddles
            paddles.top.x = Math.max(0, Math.min(width - PADDLE_WIDTH, paddles.top.x));
            paddles.bottom.x = Math.max(0, Math.min(width - PADDLE_WIDTH, paddles.bottom.x));
            paddles.left.y = Math.max(0, Math.min(height - PADDLE_WIDTH, paddles.left.y));
            paddles.right.y = Math.max(0, Math.min(height - PADDLE_WIDTH, paddles.right.y));

            // Collision: Walls & Paddles
            // Top
            if (ball.y - BALL_RADIUS < paddles.top.y + PADDLE_THICKNESS &&
                ball.x > paddles.top.x && ball.x < paddles.top.x + PADDLE_WIDTH) {
                ball.dy = Math.abs(ball.dy);
            }
            // Bottom
            if (ball.y + BALL_RADIUS > paddles.bottom.y &&
                ball.x > paddles.bottom.x && ball.x < paddles.bottom.x + PADDLE_WIDTH) {
                ball.dy = -Math.abs(ball.dy);
            }
            // Left
            if (ball.x - BALL_RADIUS < paddles.left.x + PADDLE_THICKNESS &&
                ball.y > paddles.left.y && ball.y < paddles.left.y + PADDLE_WIDTH) {
                ball.dx = Math.abs(ball.dx);
            }
            // Right
            if (ball.x + BALL_RADIUS > paddles.right.x &&
                ball.y > paddles.right.y && ball.y < paddles.right.y + PADDLE_WIDTH) {
                ball.dx = -Math.abs(ball.dx);
            }

            // Canvas bounce fallback
            if (ball.x < 0 || ball.x > width) ball.dx *= -1;
            if (ball.y < 0 || ball.y > height) ball.dy *= -1;

            // Collision: Pixels
            pixels.forEach(p => {
                if (!p.hit) {
                    if (ball.x > p.x && ball.x < p.x + PIXEL_SIZE &&
                        ball.y > p.y && ball.y < p.y + PIXEL_SIZE) {
                        p.hit = true;
                        p.transition = 1;
                        // Bounce ball slightly
                        ball.dx *= Math.random() > 0.5 ? 1 : -1;
                        ball.dy *= -1;
                    }
                } else if (p.transition > 0) {
                    p.transition -= 0.02;
                }
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw matrix background lines (optional refined look)
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 40) {
                ctx.moveTo(i, 0); ctx.lineTo(i, height);
            }
            for (let i = 0; i < height; i += 40) {
                ctx.moveTo(0, i); ctx.lineTo(width, i);
            }
            ctx.stroke();

            // Draw Pixels
            pixels.forEach(p => {
                ctx.fillStyle = p.hit ? COLORS.hit : COLORS.text;
                if (!p.hit) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'rgba(255,255,255,0.4)';
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);

                if (p.transition > 0) {
                    ctx.fillStyle = `rgba(0, 243, 255, ${p.transition})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'var(--neon-cyan)';
                    ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);
                }
            });
            ctx.shadowBlur = 0;

            // Draw Ball
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = COLORS.ball;
            ctx.shadowBlur = 40;
            ctx.shadowColor = COLORS.ball;
            ctx.fill();

            // Core white light for extra punch
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.closePath();
            ctx.shadowBlur = 0;

            // Draw Paddles
            ctx.fillStyle = COLORS.paddle;
            ctx.shadowBlur = 35;
            ctx.shadowColor = COLORS.paddle;
            // Top
            ctx.fillRect(paddles.top.x, paddles.top.y, PADDLE_WIDTH, PADDLE_THICKNESS);
            // Bottom
            ctx.fillRect(paddles.bottom.x, paddles.bottom.y, PADDLE_WIDTH, PADDLE_THICKNESS);
            // Left
            ctx.fillRect(paddles.left.x, paddles.left.y, PADDLE_THICKNESS, PADDLE_WIDTH);
            // Right
            ctx.fillRect(paddles.right.x, paddles.right.y, PADDLE_THICKNESS, PADDLE_WIDTH);
            ctx.shadowBlur = 0;
        };

        const loop = () => {
            update();
            draw();
            animationId = requestAnimationFrame(loop);
        };

        init();
        loop();

        const handleResize = () => {
            init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="pong-hero-container">
            {/* ── BACKGROUND BIOMETRIC IMAGE ── */}
            <div className="pong-bg-bio">
                <img
                    src="public/Background_Image/pic.jpg"
                    className="pong-bg-img"
                />
            </div>

            <canvas ref={canvasRef} className="pong-hero-canvas" />
            <div className="pong-hero-overlay">
                <div className="pong-hero-content">

                    <div className="pong-actions">

                    </div>
                </div>
            </div>

            {/* Corner Decorators */}
            <div className="pong-corner tl" />
            <div className="pong-corner tr" />
            <div className="pong-corner bl" />
            <div className="pong-corner br" />

            <div className="pong-scanline" />
        </div>
    );
};

export default PongHero;
