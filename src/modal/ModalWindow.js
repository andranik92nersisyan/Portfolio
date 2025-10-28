import React, { useState, useCallback, useEffect} from 'react';
import './ModalWindow.css';

const ModalWindow = ({ show, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.addEventListener('keydown', handleKeyDown);
        } else {
          const time = setTimeout(() => setIsVisible(false), 800); 
            document.removeEventListener('keydown', handleKeyDown);
            return () => clearTimeout(time);
        }
        
    }, [show, handleKeyDown]);

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={`modal-backdrop ${show ? 'show' : ''}`}
            style={{ display: isVisible}} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-button" aria-label='Close modal'></button>
                {children}
                <div style={{display: 'flex' }}>
                    <a href="https://t.me/" target="_blank" className="social-button" >
                    <a className='social telegram'/>Telegram</a>
                    <a href="https://www.instagram.com/" target="_blank" className="social-button" >
                    <a className="social instagram"/>Instagram</a>    
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;