import React, { useState, useEffect } from "react";
import "./PasswordGenerator.scss";
import "../RangeInput/RangeInput.scss";
import { RangeInput } from "../RangeInput/RangeInput";

export const PasswordGenerator: React.FC = () => {
  const minPasswordLength = 4;

  const [progress, setProgress] = useState<number>(6 - minPasswordLength);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>(" ");
  const [isCopied, setIsCopied] = useState(false);

  const passwordStrength = calculatePasswordStrength();

  /// nasłuchuje zmiennych, które wpływają na hasło
  ///
  useEffect(() => {
    generatePassword(progress + minPasswordLength);
  }, [
    progress,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  /// operuje na suwaku range, ustawiając długość hasła
  ///
  const handleProgressChange = (value: number) => {
    setProgress(value);
  };

  /// kopiuję hasło do schowka, zmienia text btn
  ///

  const handleClickCopy = () => {
    const textField = document.createElement("textarea");
    textField.innerText = generatedPassword;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const generatePassword = (passwordLenght: number) => {
    let charset = " ";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~|}{[]:;?><,./-=";

    let generatedPassword = "";
    for (let i = 0; i < passwordLenght; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setGeneratedPassword(generatedPassword);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    switch (name) {
      case "includeUppercase":
        setIncludeUppercase(checked);
        break;
      case "includeLowercase":
        setIncludeLowercase(checked);
        break;
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeSymbols":
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  };

  function calculatePasswordStrength() {
    const strengthFactors = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    ];
    const strength = strengthFactors.filter((factor) => factor).length;
    const lengthStrength = Math.floor((progress + minPasswordLength) / 12);
    return strength + lengthStrength;
  }

  const barColor =
    passwordStrength <= 2
      ? "#FF3A3A"
      : passwordStrength > 3
      ? "#30BF19"
      : passwordStrength > 2
      ? "#FFC225"
      : "";

  return (
    <>
      <div className="pass-generator-component">
        <div className="pass-generator-component__header">
          Password Generator
        </div>
        <div className="pass-generator-component__length-container">
          <div className="pass-generator-component__container-label">
            <div className="pass-generator-component__container-text">
              Character Lenght
            </div>
            <div className="pass-generator-component__length-number">
              {progress + minPasswordLength}
            </div>
          </div>
          <div className="pass-generator-component__length-range">
            <RangeInput
              value={progress}
              min={0}
              max={16 - minPasswordLength}
              onChange={handleProgressChange}
            />
          </div>
        </div>
        <div className="pass-generator-component__radio-container">
          <div className="pass-generator-component__radio-section">
            <div className="pass-generator-component__choose-container">
              <input
                className="pass-generator-component__checkbox"
                type="checkbox"
                name="includeUppercase"
                checked={includeUppercase}
                onChange={handleCheckboxChange}
              />
              <div className="pass-generator-component__choose-label">
                Include Uppercase Letter
              </div>
            </div>
            <div className="pass-generator-component__choose-container">
              <input
                className="pass-generator-component__checkbox"
                type="checkbox"
                name="includeLowercase"
                checked={includeLowercase}
                onChange={handleCheckboxChange}
              />
              <div className="pass-generator-component__choose-label">
                Include Lowercase Letter
              </div>
            </div>
          </div>
          <div className="pass-generator-component__radio-section">
            <div className="pass-generator-component__choose-container">
              <input
                className="pass-generator-component__checkbox"
                type="checkbox"
                name="includeNumbers"
                checked={includeNumbers}
                onChange={handleCheckboxChange}
              />
              <div className="pass-generator-component__choose-label">
                Include Numbers
              </div>
            </div>
            <div className="pass-generator-component__choose-container">
              <input
                className="pass-generator-component__checkbox"
                type="checkbox"
                name="includeSymbols"
                checked={includeSymbols}
                onChange={handleCheckboxChange}
              />
              <div className="pass-generator-component__choose-label">
                Include Symbols
              </div>
            </div>
          </div>
        </div>
        <div className="pass-generator-component__strenght-container">
          <div className="pass-generator-component__container-label">
            <div className="pass-generator-component__container-text">
              Strenght
            </div>
            <div className="pass-generator-component__strenght-value">
              {passwordStrength <= 2 && "Low password strength"}
              {passwordStrength === 3 && "Medium password strength"}
              {passwordStrength >= 4 && "High password strength"}
            </div>
          </div>
          <div className="pass-generator-component__strenght-bars">
            <div
              style={{ "--color-on-bar": barColor } as React.CSSProperties}
              className={`bar ${passwordStrength >= 0 ? "active" : ""}`}
            ></div>
            <div
              style={{ "--color-on-bar": barColor } as React.CSSProperties}
              className={`bar ${passwordStrength > 1 ? "active" : ""}`}
            ></div>
            <div
              style={{ "--color-on-bar": barColor } as React.CSSProperties}
              className={`bar ${passwordStrength > 2 ? "active" : ""}`}
            ></div>
            <div
              style={{ "--color-on-bar": barColor } as React.CSSProperties}
              className={`bar ${passwordStrength > 3 ? "active" : ""}`}
            ></div>
          </div>
        </div>
        <div className="pass-generator-component__output">
          <div className="pass-generator-component__output-value">
            {generatedPassword}
          </div>
          <div
            className="image-container"
            onClick={() => generatePassword(progress + minPasswordLength)}
          >
            <img src="/refresh.svg" alt="refresh icon" />
          </div>
        </div>
        <button
          className="pass-generator-component__button"
          onClick={handleClickCopy}
        >
          {isCopied ? (
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
      </div>
    </>
  );
};
