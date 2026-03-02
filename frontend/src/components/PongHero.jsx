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
    const animationIdRef = useRef(null);
    const resizeTimeoutRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { 
            alpha: true,
            desynchronized: true 
        });

        // Constants - responsive based on device
        const isMobile = window.innerWidth < 768;
        const PIXEL_SIZE = isMobile ? 8 : 12;
        const PIXEL_GAP = isMobile ? 1 : 2;
        const CHAR_GAP = isMobile ? 10 : 15;
        const BALL_RADIUS = isMobile ? 6 : 8;
        const PADDLE_WIDTH = isMobile ? 70 : 100;
        const PADDLE_THICKNESS = isMobile ? 8 : 10;
        const PADDLE_SPEED = 0.15;

        const COLORS = {
            bg: 'rgba(6, 6, 12, 0.72)',
            ball: '#00f3ff',
            paddle: '#b829ff',
            text: '#ffffff',
            hit: '#333344',
            glow: 'rgba(0, 243, 255, 0.4)',
        };

        let width, height;
        let pixels = [];
        let ball = { x: 0, y: 0, dx: isMobile ? 3 : 4, dy: isMobile ? 3 : 4 };
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
            // Clear then fill with semi-transparent dark so bg image shows through
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = COLORS.bg;
            ctx.fillRect(0, 0, width, height);

            // Draw matrix background lines (only on larger screens for performance)
            if (!isMobile) {
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
            }

            // Draw Pixels (batch operations)
            pixels.forEach(p => {
                ctx.fillStyle = p.hit ? COLORS.hit : COLORS.text;
                if (!p.hit) {
                    ctx.shadowBlur = isMobile ? 10 : 15;
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
            ctx.shadowBlur = isMobile ? 20 : 40;
            ctx.shadowColor = COLORS.ball;
            ctx.fill();

            // Core white light
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.closePath();
            ctx.shadowBlur = 0;

            // Draw Paddles
            ctx.fillStyle = COLORS.paddle;
            ctx.shadowBlur = isMobile ? 20 : 35;
            ctx.shadowColor = COLORS.paddle;
            ctx.fillRect(paddles.top.x, paddles.top.y, PADDLE_WIDTH, PADDLE_THICKNESS);
            ctx.fillRect(paddles.bottom.x, paddles.bottom.y, PADDLE_WIDTH, PADDLE_THICKNESS);
            ctx.fillRect(paddles.left.x, paddles.left.y, PADDLE_THICKNESS, PADDLE_WIDTH);
            ctx.fillRect(paddles.right.x, paddles.right.y, PADDLE_THICKNESS, PADDLE_WIDTH);
            ctx.shadowBlur = 0;
        };

        const loop = () => {
            update();
            draw();
            animationIdRef.current = requestAnimationFrame(loop);
        };

        init();
        loop();

        const handleResize = () => {
            clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = setTimeout(() => {
                init();
            }, 150);
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeoutRef.current);
        };
    }, []);

    return (
        <div className="pong-hero-container">
            {/* ── BACKGROUND BIOMETRIC IMAGE ── */}
            <div className="pong-bg-bio">
                <img
                    src="/Background_Image/pic.jpg"
                    alt="Background"
                    className="pong-bg-img"
                    loading="lazy"
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
