'use client';

import { useEffect, useRef } from 'react';

export default function DynamicBackground() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const gridSize = 60;
        const MAX_CELLS = 30;

        function spawnCell() {
            const existingCells = container.querySelectorAll('.grid-flicker-cell');
            if (existingCells.length >= MAX_CELLS) return;

            const width = window.innerWidth;
            const height = window.innerHeight;
            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(height / gridSize);
            const randomCol = Math.floor(Math.random() * cols);
            const randomRow = Math.floor(Math.random() * rows);

            const cell = document.createElement('div');
            cell.classList.add('grid-flicker-cell');
            cell.style.left = (randomCol * gridSize) + 'px';
            cell.style.top = (randomRow * gridSize) + 'px';

            container.appendChild(cell);
            setTimeout(() => cell.remove(), 4000);
        }

        const interval = setInterval(spawnCell, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="dynamic-bg" ref={containerRef}>
            <div className="bg-grid-lines"></div>
            <div className="bg-vignette"></div>
        </div>
    );
}
