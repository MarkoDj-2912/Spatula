import React from "react";
import "../styles/FilterButtons.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBacon,
  faPizzaSlice,
  faBurger,
  faBowlFood,
  faFish,
  faMortarPestle,
  faPepperHot,
} from "@fortawesome/free-solid-svg-icons";

// filters- names and icons
const filters = [
  { label: "Italian", icon: faPizzaSlice },
  { label: "American", icon: faBurger },
  { label: "Thai", icon: faBowlFood },
  { label: "Japanese", icon: faFish },
  { label: "Mexican", icon: faPepperHot },
  { label: "Indian", icon: faMortarPestle },
];

const FilterButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="filter-buttons">
      {filters.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => navigate(`/category/${label.toLowerCase()}`)}
        >
          <FontAwesomeIcon icon={icon} className="filter-icon" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
