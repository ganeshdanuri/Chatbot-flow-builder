import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = ({ error }) => {
  const { handleSave } = useContext(AppContext);

  return (
    <div className="header-container">
      <div>
        <span>Chat Flow | </span>
        <span className="dev"> ©️ Developed by Ganesh Danuri </span>
      </div>
      <div>
        {error && <button className="error-button"> Can not save Flow </button>}
        <button className="save-button" onClick={() => handleSave()}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Header;
