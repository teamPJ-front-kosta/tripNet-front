import { useState } from 'react';
import '../css/people.css';

function People({ onPeopleChange }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleChange = (type, operation) => {
    if (type === 'adult') {
      if (operation === 'add' && adults < 8) {
        setAdults(adults + 1);
      } else if (operation === 'subtract' && adults > 1) {
        setAdults(adults - 1);
      }
    } else if (type === 'child') {
      if (operation === 'add' && children < 8) {
        setChildren(children + 1);
      } else if (operation === 'subtract' && children > 0) {
        setChildren(children - 1);
      }
    }

    if (onPeopleChange) {
      onPeopleChange({
        adults: type === 'adult' ? 
          (operation === 'add' ? adults + 1 : adults - 1) : 
          adults,
        children: type === 'child' ? 
          (operation === 'add' ? children + 1 : children - 1) : 
          children
      });
    }
  };

  return (
    <div className="people-container">
      <div className="people-row">
        <div className="people-type">
          <div className="people-label">성인</div>
          <div className="people-description">만 17세 이상</div>
        </div>
        <div className="people-controls">
          <button 
            className={`control-button ${adults <= 1 ? 'disabled' : ''}`}
            onClick={() => handleChange('adult', 'subtract')}
            disabled={adults <= 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M19.5 11.25H4.5v1.5h15v-1.5z" fill="currentColor"/>
            </svg>
          </button>
          <span className="people-count">{adults}</span>
          <button 
            className={`control-button ${adults >= 8 ? 'disabled' : ''}`}
            onClick={() => handleChange('adult', 'add')}
            disabled={adults >= 8}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M19.5 11.25h-6.75V4.5h-1.5v6.75H4.5v1.5h6.75v6.75h1.5v-6.75h6.75v-1.5z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="people-row">
        <div className="people-type">
          <div className="people-label">청소년/아동</div>
          <div className="people-description">만 17세 이하</div>
        </div>
        <div className="people-controls">
          <button 
            className={`control-button ${children <= 0 ? 'disabled' : ''}`}
            onClick={() => handleChange('child', 'subtract')}
            disabled={children <= 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M19.5 11.25H4.5v1.5h15v-1.5z" fill="currentColor"/>
            </svg>
          </button>
          <span className="people-count">{children}</span>
          <button 
            className={`control-button ${children >= 8 ? 'disabled' : ''}`}
            onClick={() => handleChange('child', 'add')}
            disabled={children >= 8}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M19.5 11.25h-6.75V4.5h-1.5v6.75H4.5v1.5h6.75v6.75h1.5v-6.75h6.75v-1.5z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default People;
