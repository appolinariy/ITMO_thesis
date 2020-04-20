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
  let insert = header.map((el, index) => {
    let defaultValue = data[el.key];
    if (el.type === "select") {
      data[el.key] = data[el.key] ? data[el.key] : el.options[0].text;
    } else if (el.type === "date" && data[el.key]) {
      const date = data[el.key].split(".");
      defaultValue = `${date[2]}-${date[1]}-${date[0]}`;
    }
    return (
      <label key={index} className="alertName">
        {el.name}
        {el.type === "select" ? (
          <select
            onChange={onChange}
            onClick={e => {
              console.log(e.target);
            }}
            value={data[el.key]}
            name={el.key}
            required
          >
            {el.options &&
              el.options.map(option => (
                <option key={option.id} value={option.text}>
                  {option.text}
                </option>
              ))}
          </select>
        ) : (
          <input
            type={el.type}
            autoComplete="off"
            id={el.key}
            defaultValue={defaultValue ? defaultValue : data[el.key]}
            onChange={onChange}
            name={el.key}
            pattern={el.pattern.source}
            placeholder={el.placeholder}
            required
          />
        )}
      </label>
    );
  });

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
