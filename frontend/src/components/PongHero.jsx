import React, { useEffect, useRef } from 'react';
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

const TEXT = 'CYNET 2026';

// Pre-compute text char list once
const TEXT_CHARS = TEXT.split('');
const NON_SPACE_CHARS = TEXT_CHARS.filter(c => c !== ' ').length;
const SPACE_CHARS    = TEXT_CHARS.filter(c => c === ' ').length;

/** Compute total pixel-text width for given sizes */
const calcTextWidth = (pixelSize, pixelGap, charGap) => {
    // Each non-space char: 5 cols Ã— (pixelSize+pixelGap) + charGap between chars
    // Each space char: charGap Ã— 2
    // Subtract final charGap (no gap after last char)
    return (
        NON_SPACE_CHARS * (5 * (pixelSize + pixelGap)) +
        (NON_SPACE_CHARS - 1) * charGap +
        SPACE_CHARS * (charGap * 2)
    );
};

const PongHero = () => {
    const canvasRef = useRef(null);
    const animationIdRef   = useRef(null);
    const resizeTimeoutRef = useRef(null);
    const stateRef = useRef({}); // mutable game state kept off-render

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

        const COLORS = {
            bg:     'rgba(6,6,12,0.72)',
            ball:   '#00f3ff',
            paddle: '#b829ff',
            text:   '#ffffff',
            hit:    '#333344',
            cyan:   '#00f3ff',
        };

        /* â”€â”€ init: recalculates every resize â”€â”€ */
        const init = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2Ã— for perf

            // Physical canvas size (sharp on HiDPI)
            canvas.width  = Math.round(vw * dpr);
            canvas.height = Math.round(vh * dpr);
            canvas.style.width  = vw + 'px';
            canvas.style.height = vh + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const width  = vw;
            const height = vh;

            // â”€â”€ Breakpoint-based base sizes â”€â”€
            let basePixelSize, pixelGap, charGap, ballR, paddleW, paddleT, ballSpeed;
            if (vw < 380) {
                basePixelSize = 5;  pixelGap = 1;  charGap = 5;
                ballR = 4;  paddleW = 50;  paddleT = 6;  ballSpeed = 2.5;
            } else if (vw < 480) {
                basePixelSize = 6;  pixelGap = 1;  charGap = 6;
                ballR = 5;  paddleW = 55;  paddleT = 7;  ballSpeed = 2.8;
            } else if (vw < 640) {
                basePixelSize = 7;  pixelGap = 1;  charGap = 8;
                ballR = 5;  paddleW = 60;  paddleT = 7;  ballSpeed = 3;
            } else if (vw < 768) {
                basePixelSize = 8;  pixelGap = 1;  charGap = 10;
                ballR = 6;  paddleW = 70;  paddleT = 8;  ballSpeed = 3;
            } else if (vw < 1024) {
                basePixelSize = 9;  pixelGap = 1;  charGap = 12;
                ballR = 7;  paddleW = 85;  paddleT = 9;  ballSpeed = 3.5;
            } else if (vw < 1440) {
                basePixelSize = 11; pixelGap = 2;  charGap = 14;
                ballR = 8;  paddleW = 100; paddleT = 10; ballSpeed = 4;
            } else {
                basePixelSize = 13; pixelGap = 2;  charGap = 16;
                ballR = 9;  paddleW = 110; paddleT = 10; ballSpeed = 4.5;
            }

            // â”€â”€ Clamp pixel size so text never overflows canvas (max 88% width) â”€â”€
            const maxW = vw * 0.88;
            let PIXEL_SIZE = basePixelSize;
            while (PIXEL_SIZE > 4 && calcTextWidth(PIXEL_SIZE, pixelGap, charGap) > maxW) {
                PIXEL_SIZE--;
            }
            const PIXEL_GAP = pixelGap;
            const CHAR_GAP  = charGap;

            // â”€â”€ Build pixel array â”€â”€
            const textWidth = calcTextWidth(PIXEL_SIZE, PIXEL_GAP, CHAR_GAP);
            const startX = (width  - textWidth) / 2;
            const startY = (height - 7 * (PIXEL_SIZE + PIXEL_GAP)) / 2;

            const pixels = [];
            let currentX = startX;
            TEXT_CHARS.forEach((char) => {
                if (char === ' ') { currentX += CHAR_GAP * 2; return; }
                const map = CHAR_MAPS[char];
                if (!map) return;
                for (let r = 0; r < map.length; r++) {
                    for (let c = 0; c < map[r].length; c++) {
                        if (map[r][c] === 1) {
                            pixels.push({
                                x: currentX + c * (PIXEL_SIZE + PIXEL_GAP),
                                y: startY   + r * (PIXEL_SIZE + PIXEL_GAP),
                                hit: false,
                                transition: 0,
                            });
                        }
                    }
                }
                currentX += 5 * (PIXEL_SIZE + PIXEL_GAP) + CHAR_GAP;
            });

            // â”€â”€ Ball â”€â”€
            const angle = Math.PI / 4;
            const ball = {
                x: width / 2,
                y: height / 3,
                dx: Math.cos(angle) * ballSpeed,
                dy: Math.sin(angle) * ballSpeed,
                r: ballR,
            };

            // â”€â”€ Paddles â”€â”€
            const paddles = {
                top:    { x: width / 2 - paddleW / 2, y: PADDLE_MARGIN },
                bottom: { x: width / 2 - paddleW / 2, y: height - PADDLE_MARGIN - paddleT },
                left:   { x: PADDLE_MARGIN,            y: height / 2 - paddleW / 2 },
                right:  { x: width - PADDLE_MARGIN - paddleT, y: height / 2 - paddleW / 2 },
            };

            // Store into mutable ref
            Object.assign(stateRef.current, {
                width, height, pixels, ball, paddles,
                PIXEL_SIZE, PIXEL_GAP, CHAR_GAP,
                BALL_RADIUS: ballR,
                PADDLE_WIDTH: paddleW,
                PADDLE_THICKNESS: paddleT,
                PADDLE_SPEED: 0.14,
                isMobile: vw < 768,
            });
        };

        const PADDLE_MARGIN = 20;

        /* â”€â”€ update â”€â”€ */
        const update = () => {
            const s = stateRef.current;
            const { width, height, ball, paddles, pixels,
                    BALL_RADIUS, PADDLE_WIDTH, PADDLE_THICKNESS, PADDLE_SPEED } = s;

            ball.x += ball.dx;
            ball.y += ball.dy;

            // Paddle tracking
            paddles.top.x    += (ball.x - (paddles.top.x    + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.bottom.x += (ball.x - (paddles.bottom.x + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.left.y   += (ball.y - (paddles.left.y   + PADDLE_WIDTH / 2)) * PADDLE_SPEED;
            paddles.right.y  += (ball.y - (paddles.right.y  + PADDLE_WIDTH / 2)) * PADDLE_SPEED;

            // Constrain paddles
            paddles.top.x    = Math.max(0, Math.min(width  - PADDLE_WIDTH, paddles.top.x));
            paddles.bottom.x = Math.max(0, Math.min(width  - PADDLE_WIDTH, paddles.bottom.x));
            paddles.left.y   = Math.max(0, Math.min(height - PADDLE_WIDTH, paddles.left.y));
            paddles.right.y  = Math.max(0, Math.min(height - PADDLE_WIDTH, paddles.right.y));

            // Paddle collisions
            if (ball.y - BALL_RADIUS < paddles.top.y + PADDLE_THICKNESS &&
                ball.x > paddles.top.x && ball.x < paddles.top.x + PADDLE_WIDTH)
                ball.dy = Math.abs(ball.dy);

            if (ball.y + BALL_RADIUS > paddles.bottom.y &&
                ball.x > paddles.bottom.x && ball.x < paddles.bottom.x + PADDLE_WIDTH)
                ball.dy = -Math.abs(ball.dy);

            if (ball.x - BALL_RADIUS < paddles.left.x + PADDLE_THICKNESS &&
                ball.y > paddles.left.y && ball.y < paddles.left.y + PADDLE_WIDTH)
                ball.dx = Math.abs(ball.dx);

            if (ball.x + BALL_RADIUS > paddles.right.x &&
                ball.y > paddles.right.y && ball.y < paddles.right.y + PADDLE_WIDTH)
                ball.dx = -Math.abs(ball.dx);

            // Wall fallback
            if (ball.x < 0 || ball.x > width)  ball.dx *= -1;
            if (ball.y < 0 || ball.y > height) ball.dy *= -1;

            // Pixel collisions
            const { PIXEL_SIZE } = s;
            for (let i = 0; i < pixels.length; i++) {
                const p = pixels[i];
                if (!p.hit) {
                    if (ball.x > p.x && ball.x < p.x + PIXEL_SIZE &&
                        ball.y > p.y && ball.y < p.y + PIXEL_SIZE) {
                        p.hit = true;
                        p.transition = 1;
                        ball.dx *= Math.random() > 0.5 ? 1 : -1;
                        ball.dy *= -1;
                    }
                } else if (p.transition > 0) {
                    p.transition = Math.max(0, p.transition - 0.02);
                }
            }
        };

        /* â”€â”€ draw â”€â”€ */
        const draw = () => {
            const s = stateRef.current;
            const { width, height, pixels, ball, paddles,
                    PIXEL_SIZE, BALL_RADIUS, PADDLE_WIDTH, PADDLE_THICKNESS, isMobile } = s;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = COLORS.bg;
            ctx.fillRect(0, 0, width, height);

            // Matrix grid (desktop only)
            if (!isMobile) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,243,255,0.04)';
                ctx.lineWidth = 1;
                for (let x = 0; x < width; x += 40)  { ctx.moveTo(x, 0);   ctx.lineTo(x, height); }
                for (let y = 0; y < height; y += 40) { ctx.moveTo(0, y);   ctx.lineTo(width, y); }
                ctx.stroke();
            }

            // Pixels
            const shadowBlurPx = isMobile ? 8 : 14;
            for (let i = 0; i < pixels.length; i++) {
                const p = pixels[i];
                if (!p.hit) {
                    ctx.shadowBlur  = shadowBlurPx;
                    ctx.shadowColor = 'rgba(255,255,255,0.35)';
                    ctx.fillStyle   = COLORS.text;
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle  = COLORS.hit;
                }
                ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);

                if (p.transition > 0) {
                    ctx.fillStyle   = `rgba(0,243,255,${p.transition.toFixed(2)})`;
                    ctx.shadowBlur  = 8;
                    ctx.shadowColor = COLORS.cyan;
                    ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);
                }
            }
            ctx.shadowBlur = 0;

            // Ball glow
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle   = COLORS.ball;
            ctx.shadowBlur  = isMobile ? 18 : 36;
            ctx.shadowColor = COLORS.cyan;
            ctx.fill();
            // Ball core
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS * 0.38, 0, Math.PI * 2);
            ctx.fillStyle  = '#fff';
            ctx.shadowBlur = 0;
            ctx.fill();
            ctx.closePath();

            // Paddles
            ctx.fillStyle   = COLORS.paddle;
            ctx.shadowBlur  = isMobile ? 18 : 32;
            ctx.shadowColor = COLORS.paddle;
            ctx.fillRect(paddles.top.x,    paddles.top.y,    PADDLE_WIDTH,     PADDLE_THICKNESS);
            ctx.fillRect(paddles.bottom.x, paddles.bottom.y, PADDLE_WIDTH,     PADDLE_THICKNESS);
            ctx.fillRect(paddles.left.x,   paddles.left.y,   PADDLE_THICKNESS, PADDLE_WIDTH);
            ctx.fillRect(paddles.right.x,  paddles.right.y,  PADDLE_THICKNESS, PADDLE_WIDTH);
            ctx.shadowBlur = 0;
        };

        /* â”€â”€ loop â”€â”€ */
        const loop = () => {
            update();
            draw();
            animationIdRef.current = requestAnimationFrame(loop);
        };

        /* â”€â”€ visibility API: pause when tab hidden â”€â”€ */
        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationIdRef.current);
            } else {
                animationIdRef.current = requestAnimationFrame(loop);
            }
        };

        /* â”€â”€ resize with debounce â”€â”€ */
        const handleResize = () => {
            clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = setTimeout(init, 180);
        };

        init();
        loop();
        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
            clearTimeout(resizeTimeoutRef.current);
        };
    }, []);

    return (
        <div className="pong-hero-container">
            {/* Background image */}
            <div className="pong-bg-bio">
                <img
                    src="/Background_Image/pic.jpg"
                    alt="Background"
                    className="pong-bg-img"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <canvas ref={canvasRef} className="pong-hero-canvas" />

            {/* Corner decorators */}
            <div className="pong-corner tl" />
            <div className="pong-corner tr" />
            <div className="pong-corner bl" />
            <div className="pong-corner br" />

            <div className="pong-scanline" />
        </div>
    );
};

export default PongHero;
