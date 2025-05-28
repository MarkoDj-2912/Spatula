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
  faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";

// Lista filtera sa nazivima i ikonama
const filters = [
  { label: "Breakfast", icon: faBacon },
  { label: "Italian", icon: faPizzaSlice },
  { label: "American", icon: faBurger },
  { label: "Thai", icon: faBowlFood },
  { label: "Japanese", icon: faFish },
  { label: "Sandwich", icon: faBreadSlice },
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
