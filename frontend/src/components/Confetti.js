/**
 * Confetti Component
 * 
 * Creates a confetti celebration animation with falling colored pieces.
 * Pure CSS animation - no external libraries needed!
 * Shows a congratulations message when a task is completed.
 * 
 * Props:
 * - show: Boolean to control visibility
 * - onClose: Callback when celebration should close
 */

import React, { useEffect } from 'react';
import './Confetti.css';

const Confetti = ({ show, onClose }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="confetti-container">
      {/* Confetti pieces - created dynamically via CSS */}
      <div className="confetti">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className={`confetti-piece confetti-piece-${i % 10}`}
            style={{
              left: `${(i * 1.5) % 100}%`,
              animationDelay: `${(i * 0.03) % 1}s`,
              animationDuration: `${2.5 + (i % 3) * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Congratulations message */}
      <div className="celebration-message">
        <div className="celebration-icon">🎉</div>
        <h2 className="celebration-title">Congratulations!</h2>
        <p className="celebration-text">You've done it!</p>
      </div>
    </div>
  );
};

export default Confetti;

