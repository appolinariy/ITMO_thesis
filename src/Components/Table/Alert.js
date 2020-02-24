import React from "react";
import "./Table.css";

export const Alert = ({
  header,
  onClose,
  onChange,
  data,
  title,
  edit,
  handleAdd,
  handleEdit,
  styles
}) => {
  let insert = header.map((el, index) => (
    <label key={index} className="alertName">
      {el.name}
      {el.type === "select" ? (
        <select onChange={onChange} name={el.key}>
          {el.options &&
            el.options.map(option => (
              <option key={option.id} value={option.text}>
                {option.text}
              </option>
            ))}
        </select>
      ) : (
        <input
          type="text"
          autoComplete="off"
          id={el.key}
          value={data[el.key]}
          onChange={onChange}
          name={el.key}
        />
      )}
    </label>
  ));

  return (
    <div className="alertBlock" onClick={onClose}>
      <form
        className="add_row alertForm"
        style={styles}
        onSubmit={edit ? handleEdit : handleAdd}
        onClick={e => e.stopPropagation()}
      >
        <button className="cancelAlert" onClick={onClose}>
          ×
        </button>
        {edit ? (
          <h4>Окно редактирования {title} </h4>
        ) : (
          <h4>Окно добавления {title} </h4>
        )}
        <div className="inputBlock">{insert}</div>
        <div className="alertButton">
          {edit ? (
            <button className="buttonEdit" type="submit">
              Сохранить изменения
            </button>
          ) : (
            <button className="buttonAdd" type="submit">
              Добавить
            </button>
          )}
          <button className="buttonClose" onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
