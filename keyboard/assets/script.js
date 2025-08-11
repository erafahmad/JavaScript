document.addEventListener('DOMContentLoaded', () => {
    const insert = document.querySelector('.insert');
    
    if (!insert) {
        console.error('Insert element not found!');
        return;
    }

    // Initial display with animation
    insert.innerHTML = `
        <div class="key initial-state">
            <div class="key-icon">⌨️</div>
            <div class="initial-message">Press any key to begin the magic!</div>
            <div class="hint">Try function keys, spacebar, or special keys</div>
        </div>
    `;

    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        
        // Format the key display creatively
        let displayKey = e.key;
        if (displayKey === ' ') {
            displayKey = '␣ Space';
        } else if (displayKey === 'Control') {
            displayKey = '⌃ Ctrl';
        } else if (displayKey === 'Shift') {
            displayKey = '⇧ Shift';
        } else if (displayKey === 'Alt') {
            displayKey = '⌥ Alt';
        } else if (displayKey === 'Enter') {
            displayKey = '↵ Enter';
        } else if (displayKey === 'Tab') {
            displayKey = '⇥ Tab';
        } else if (displayKey === 'Escape') {
            displayKey = '⎋ Esc';
        } else if (displayKey === 'Backspace') {
            displayKey = '⌫ Backspace';
        } else if (displayKey === 'Delete') {
            displayKey = '⌦ Delete';
        } else if (displayKey.length > 1) {
            displayKey = displayKey.charAt(0).toUpperCase() + displayKey.slice(1).toLowerCase();
        }

        // Generate a random pastel color for each keypress
        const randomHue = Math.floor(Math.random() * 360);
        const color = `hsl(${randomHue}, 80%, 90%)`;
        const darkerColor = `hsl(${randomHue}, 80%, 80%)`;

        insert.innerHTML = `
            <div class="key-display" style="--key-color: ${color}; --key-darker-color: ${darkerColor}">
                <div class="key-art">${displayKey}</div>
                <div class="key-details">
                    <div class="detail-box">
                        <span class="detail-label">Key</span>
                        <span class="detail-value">${displayKey}</span>
                    </div>
                    <div class="detail-box">
                        <span class="detail-label">Code</span>
                        <span class="detail-value">${e.code}</span>
                    </div>
                    <div class="detail-box">
                        <span class="detail-label">KeyCode</span>
                        <span class="detail-value">${e.keyCode || e.which}</span>
                    </div>
                </div>
                <div class="key-footer">Keep typing! Try different keys...</div>
            </div>
        `;

        // Add ripple effect
        const keyArt = insert.querySelector('.key-art');
        if (keyArt) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            keyArt.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }
    });
});