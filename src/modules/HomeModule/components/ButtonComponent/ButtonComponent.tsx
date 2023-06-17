import React, { useState } from "react";

interface ButtonProps {
    onClick: () => void,
    isCopied: boolean,
}

export const ButtonComponent: React.FC<ButtonProps> = ({onClick, isCopied}) => {

    
    return (
        <button
        className="pass-generator-component__primary-button"
        onClick={onClick}
      >
        { isCopied ? (
          <div className="text">Copied!</div>
        ) : (
          <>
            <div className="image-container">
              <img src="/copy-img.svg" alt="copy icon" />
            </div>
            <div className="text">Copy Password</div>
          </>
        )}
      </button>
    )
}