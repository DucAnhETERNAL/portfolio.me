import React, { useRef, useEffect, useState } from 'react';

/**
 * Letter Glitch Background Effect
 * Creates animated glitch effect with random characters and colors
 * 
 * @component
 * @example
 * // Basic usage
 * <LetterGlitch />
 * 
 * @example
 * // Custom configuration
 * <LetterGlitch
 *   glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
 *   glitchSpeed={50}
 *   centerVignette={false}
 *   outerVignette={true}
 *   smooth={true}
 * />
 * 
 * @param {string[]} glitchColors - Array of hex color codes for glitch effect
 * @param {number} glitchSpeed - Speed of glitch animation in milliseconds (default: 50)
 * @param {boolean} centerVignette - Enable center vignette effect (default: false)
 * @param {boolean} outerVignette - Enable outer vignette effect (default: true)
 * @param {boolean} smooth - Enable smooth color transitions (default: true)
 * @param {string} characters - String of characters to use for glitch effect
 * @param {string} className - Additional CSS classes
 */
const LetterGlitch = ({
    glitchColors,
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
    className = ''
}) => {
    // Default colors based on theme - darker for better visibility
    const darkThemeColors = ['#0284c7', '#7c3aed', '#c026d3', '#0891b2']; // primary-600, purple-600, pink-600, cyan-600
    const lightThemeColors = ['#075985', '#6d28d9', '#a21caf', '#0e7490']; // even darker shades for light theme

    const [currentColors, setCurrentColors] = useState(darkThemeColors);

    // Auto-detect theme and adjust colors
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setCurrentColors(isDark ? darkThemeColors : lightThemeColors);
        };

        // Check on mount
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Use provided colors or theme-based colors
    const colors = glitchColors || currentColors;

    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const letters = useRef([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef(null);
    const lastGlitchTime = useRef(Date.now());

    const lettersAndSymbols = Array.from(characters);

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => {
        return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    };

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const hexToRgb = hex => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    };

    const interpolateColor = (start, end, factor) => {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor)
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const calculateGrid = (width, height) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };

    const initializeLetters = (columns, rows) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;
        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1
        }));
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        if (context.current) {
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);

        drawLetters();
    };

    const drawLetters = () => {
        if (!context.current || letters.current.length === 0) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            if (!letters.current[index]) continue;

            letters.current[index].char = getRandomChar();
            letters.current[index].targetColor = getRandomColor();

            if (!smooth) {
                letters.current[index].color = letters.current[index].targetColor;
                letters.current[index].colorProgress = 1;
            } else {
                letters.current[index].colorProgress = 0;
            }
        }
    };

    const handleSmoothTransitions = () => {
        let needsRedraw = false;
        letters.current.forEach(letter => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;
                if (letter.colorProgress > 1) letter.colorProgress = 1;

                const startRgb = hexToRgb(letter.color);
                const endRgb = hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            drawLetters();
        }
    };

    const animate = () => {
        const now = Date.now();
        if (now - lastGlitchTime.current >= glitchSpeed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }

        if (smooth) {
            handleSmoothTransitions();
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext('2d');
        resizeCanvas();
        animate();

        let resizeTimeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cancelAnimationFrame(animationRef.current);
                resizeCanvas();
                animate();
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [glitchSpeed, smooth, colors]);

    // Reinitialize letters when colors change (after canvas is set up)
    useEffect(() => {
        if (letters.current.length > 0 && grid.current.columns > 0 && grid.current.rows > 0 && context.current) {
            letters.current.forEach(letter => {
                letter.color = getRandomColor();
                letter.targetColor = getRandomColor();
                letter.colorProgress = 1;
            });
            drawLetters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colors]);

    return (
        <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 0 }}>
            <canvas ref={canvasRef} className="block w-full h-full" />
            {outerVignette && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>
            )}
            {centerVignette && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
            )}
        </div>
    );
};

export default LetterGlitch;

