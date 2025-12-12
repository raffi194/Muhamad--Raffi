import React from 'react';
import styled from 'styled-components';

// 1. Definisikan tipe data untuk props
interface ButtonProps {
  onClick?: () => void;
}

// 2. Terima props 'onClick' di sini
const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledWrapper>
      {/* 3. Pasang event handler onClick ke elemen button HTML asli */}
      <button className="button" onClick={onClick}>
        Start
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    /* -- Warna Dasar (White) -- */
    --main-color: rgb(255, 255, 255);
    --main-bg-color: rgba(255, 255, 255, 0.36);
    --pattern-color: rgba(255, 255, 255, 0.073);

    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    
    /* Background logic */
    background: radial-gradient(
        circle,
        var(--main-bg-color) 0%,
        rgba(0, 0, 0, 0) 95%
      ),
      linear-gradient(var(--pattern-color) 1px, transparent 1px),
      linear-gradient(to right, var(--pattern-color) 1px, transparent 1px);
    background-size:
      cover,
      15px 15px,
      15px 15px;
    background-position:
      center center,
      center center,
      center center;
    border-image: radial-gradient(
        circle,
        var(--main-color) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
    border-width: 1px 0 1px 0;
    color: var(--main-color);
    padding: 1rem 3rem;
    font-weight: 700;
    font-size: 1.5rem;
    transition: background-size 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  /* -- Mengubah warna menjadi GREY saat HOVER -- */
  .button:hover {
    background-size:
      cover,
      10px 10px,
      10px 10px;
      
    --main-color: rgb(128, 128, 128);
    --main-bg-color: rgba(128, 128, 128, 0.36);
    --pattern-color: rgba(128, 128, 128, 0.073);
  }

  /* -- Tetap GREY saat diklik (Active) -- */
  .button:active {
    --main-color: rgb(128, 128, 128);
    --main-bg-color: rgba(128, 128, 128, 0.36);
    --pattern-color: rgba(128, 128, 128, 0.073);
  }
`;

export default Button;