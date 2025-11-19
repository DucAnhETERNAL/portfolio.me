import React, { useEffect, useRef } from 'react';

/**
 * Matrix Rain Background Effect
 * Inspired by reactbits.dev - Letter Glitch effect
 * Creates falling character columns like Matrix digital rain
 */
const MatrixRain = ({
    className = '',
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?',
    fontSize = 14,
    speed = 50,
    density = 0.95
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;

        // Set canvas size to match parent container
        const resizeCanvas = () => {
            if (container) {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Calculate columns
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        // Color variations for glitch effect
        const colors = [
            'rgba(56, 189, 248, 0.8)',  // Primary blue
            'rgba(147, 51, 234, 0.6)',  // Purple
            'rgba(255, 255, 255, 0.9)', // White
            'rgba(34, 211, 238, 0.7)',  // Cyan
        ];

        const draw = () => {
            // Fade effect for trail
            ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'; // dark-950 with transparency
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw characters
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = characters[Math.floor(Math.random() * characters.length)];

                // Random color for glitch effect
                const color = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillStyle = color;

                // Draw character
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillText(char, x, y);

                // Reset drop to top randomly or move down
                if (y > canvas.height && Math.random() > density) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Animation loop
        const interval = setInterval(draw, speed);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [characters, fontSize, speed, density]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};

export default MatrixRain;

