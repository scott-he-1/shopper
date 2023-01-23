import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const MainMenuSearch = (props) => (
  <div className="mainMenuSearch">
    <input type="text" onChange={props.handleSearchInput} name="searchInput" placeholder="Search..." id="searchInput"/>
    <FontAwesomeIcon icon={faMagnifyingGlass}/>
  </div>
)

export default MainMenuSearch; 