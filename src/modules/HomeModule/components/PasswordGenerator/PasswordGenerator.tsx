import React, { useState, useEffect } from "react";
import "./PasswordGenerator.scss";
import "../RangeInput/RangeInput.scss";
import "../CheckboxLabel/CheckboxLabel.scss";
import { RangeInput } from "../RangeInput/RangeInput";
import { CheckboxLabel } from "../CheckboxLabel/CheckboxLabel";

export const PasswordGenerator: React.FC = () => {
  const minPasswordLength = 4;

  const [state, setState] = useState({
    progress: 6 - minPasswordLength,
    includeUppercase: true,
    includeLowercase: false,
    includeNumbers: true,
    includeSymbols: true,
    generatedPassword: "",
    isCopied: false,
  });

  const passwordStrength = calculatePasswordStrength();

  /// nasłuchuje zmiennych, które wpływają na hasło
  ///
  useEffect(() => {
    generatePassword(state.progress + minPasswordLength);
  }, [
    state.progress,
    state.includeUppercase,
    state.includeLowercase,
    state.includeNumbers,
    state.includeSymbols,
  ]);

  /// operuje na suwaku range, ustawiając długość hasła
  ///
  const handleProgressChange = (value: number) => {
    setState((prevState) => ({
      ...prevState,
      progress: value,
    }));
  };

  /// kopiuję hasło do schowka, zmienia text btn
  ///

  const handleClickCopy = () => {
    const textField = document.createElement("textarea");
    textField.value = state.generatedPassword;
    navigator.clipboard.writeText(textField.value);
    setState((prevState) => ({
      ...prevState,
      isCopied: true,
    }));
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isCopied: false,
      }));
    }, 2000);
  };

  const generatePassword = (passwordLenght: number) => {
    let charset = "_";
    if (state.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (state.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (state.includeNumbers) charset += "0123456789";
    if (state.includeSymbols) charset += "!@#$%^&*()_+~|}{[]:;?><,./-=";

    let generatedPassword = "";
    for (let i = 0; i < passwordLenght; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setState((prevState) => ({
      ...prevState,
      generatedPassword: generatedPassword,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  function calculatePasswordStrength() {
    const {
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    } = state;
    const strengthFactors = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    ];
    const strength = strengthFactors.filter((factor) => factor).length;
    const lengthStrength = Math.floor(
      (state.progress + minPasswordLength) / 12
    );
    return strength + lengthStrength;
  }

  return (
    <div className="pass-generator-component">
      <div className="pass-generator-component__header">Password Generator</div>
      <div className="pass-generator-component__length-container">
        <div className="pass-generator-component__container-label">
          <div className="pass-generator-component__container-text">
            Character Lenght
          </div>
          <div className="pass-generator-component__length-number">
            {state.progress + minPasswordLength}
          </div>
        </div>
        <div className="pass-generator-component__length-range">
          <RangeInput
            value={state.progress}
            min={0}
            max={16 - minPasswordLength}
            onChange={handleProgressChange}
          />
        </div>
      </div>
      <div className="pass-generator-component__radio-container">
        <div className="pass-generator-component__radio-section">
          <CheckboxLabel
            id="uppercase"
            name="includeUppercase"
            checked={state.includeUppercase}
            onChange={handleCheckboxChange}
            label="Include Uppercase Letter"
          />
          <CheckboxLabel
            id="lowercase"
            name="includeLowercase"
            checked={state.includeLowercase}
            onChange={handleCheckboxChange}
            label="Include Lowercase Letter"
          />
        </div>
        <div className="pass-generator-component__radio-section">
          <CheckboxLabel
            id="numbers"
            name="includeNumbers"
            checked={state.includeNumbers}
            onChange={handleCheckboxChange}
            label="Include Numbers"
          />
          <CheckboxLabel
            id="symbols"
            name="includeSymbols"
            checked={state.includeSymbols}
            onChange={handleCheckboxChange}
            label="Include Symbols"
          />
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
            className={`bar ${
              passwordStrength > 3
                ? "green-bar"
                : passwordStrength > 2
                ? "yellow-bar"
                : passwordStrength <= 2
                ? "red-bar"
                : ""
            }`}
          ></div>
          <div
            className={`bar ${
              passwordStrength > 3
                ? "green-bar"
                : passwordStrength > 2
                ? "yellow-bar"
                : passwordStrength === 2
                ? "red-bar"
                : ""
            }`}
          ></div>
          <div
            className={`bar ${
              passwordStrength > 3
                ? "green-bar"
                : passwordStrength > 2
                ? "yellow-bar"
                : ""
            }`}
          ></div>
          <div
            className={`bar ${passwordStrength > 3 ? "green-bar" : ""}`}
          ></div>
        </div>
      </div>
      <div className="pass-generator-component__output">
        <div className="pass-generator-component__output-value">
          {state.generatedPassword}
        </div>
        <div
          className="image-container"
          onClick={() => generatePassword(state.progress + minPasswordLength)}
        >
          <img src="/refresh.svg" alt="refresh icon" />
        </div>
      </div>
      <button
        className="pass-generator-component__button"
        onClick={handleClickCopy}
      >
        {state.isCopied ? (
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
  );
};
