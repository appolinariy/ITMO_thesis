import React from "react";
import "../Table.css";

export const Alert = ({
  header,
  onClose,
  onChange,
  data,
  title,
  handleAdd,
  styles
}) => {
  let typePay = el => {
    if (el.type === "select") {
      let result = (
        <select onChange={onChange} value={data[el.key]} name={el.key} required>
          {el.options &&
            el.options.map(option => (
              <option key={option.id} value={option.text}>
                {option.text}
              </option>
            ))}
        </select>
      );
      return result;
    } else if (el.type === "text" || el.type === "date") {
      let result = (
        <input
          type={el.type}
          autoComplete="off"
          id={el.key}
          defaultValue={data[el.key]}
          onChange={onChange}
          name={el.key}
          pattern={el.pattern.source}
          placeholder={el.placeholder}
          required
        />
      );
      return result;
    } else if (el.type === "radio") {
      let result = (
        <div className="radioBlock">
          <label>
            <input
              type={el.type}
              className="typePay"
              name="type_pay"
              onChange={onChange}
              value={el.radio[0].text}
              defaultChecked
            />
            {el.radio[0].text}
          </label>
          <label>
            <input
              type={el.type}
              className="typePay"
              name="type_pay"
              onChange={onChange}
              value={el.radio[1].text}
            />
            {el.radio[1].text}
          </label>
        </div>
      );
      return result;
    }
  };
  let insert = header.map((el, index) => {
    if (el.type === "select") {
      data[el.key] = data[el.key] ? data[el.key] : el.options[0].text;
    }
    return (
      <label key={index} className="alertName">
        {el.name}
        {typePay(el)}
      </label>
    );
  });

  return (
    <div className="alertBlock" onClick={onClose}>
      <form
        className="add_row alertForm"
        style={styles}
        onSubmit={handleAdd}
        onClick={e => e.stopPropagation()}
      >
        <button className="cancelAlert" onClick={onClose}>
          ×
        </button>
        <h4>Окно внесения {title} </h4>
        <div className="inputBlock">{insert}</div>
        <div className="alertButton">
          <button className="buttonAdd" type="submit">
            Добавить
          </button>
          <button className="buttonClose" onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
