import React from "react";
import "./actionAlert.css";
import logo1 from "../../Authorization/logo1.png";

export const ActionAlert = ({
  module_name,
  actionTitle,
  waiting,
  // buttons,
  typeAlert,
  onConfirm,
  onClose
}) => {
  return (
    <div className="alertBlock">
      <div className="alert">
        <header>
          {module_name && <h4>{module_name}</h4>}
          <img className="bankIcon" src={logo1} width="21%" alt="SkyBank" />
        </header>
        <div className="bodyAlert">
          {actionTitle && <h4>{actionTitle}</h4>}
          {waiting && <div className="waiting">WAITING</div>}
        </div>
        <footer>
          {typeAlert === "deleteConfirm" ? (
            <>
              <button className="buttonYes" onClick={onConfirm}>
                Подтвердить
              </button>
              <button className="buttonNo" onClick={onClose}>
                Отмена
              </button>
            </>
          ) : (
            <button className="buttonClose" onClick={onClose}>
              Закрыть
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};
