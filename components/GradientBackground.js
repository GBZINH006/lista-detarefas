
import React from 'react';

export default function GradientBackground({ children, theme }) {
    const gradient = theme === 'dark'
        ? 'linear-gradient(to right, #232526, #414345)'
        : 'linear-gradient(to right, #8360c3, #2ebf91)';

    return (
        <div style={{ minHeight: '100vh', background: gradient }}>
            {children}
        </div>
    );
}
