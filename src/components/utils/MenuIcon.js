import styled from "styled-components";

export default function MenuIcon({ isWhite = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="77"
      height="77"
      viewBox="0 0 77 77"
    >
      <g id="MENU" transform="translate(-1671 -50)">
        <circle
          id="Ellisse_2"
          dataname="Ellisse 2"
          cx="38.5"
          cy="38.5"
          r="38.5"
          transform="translate(1671 50)"
          fill={isWhite ? "white" : "#242121"}
        />
        <g
          id="Raggruppa_20"
          dataname="Raggruppa 20"
          transform="translate(1.5 3.5)"
        >
          <line
            id="Linea_1"
            dataname="Linea 1"
            x2="17"
            transform="translate(1699.5 82.5)"
            fill="none"
            stroke={isWhite ? "black" : "white"}
            strokeLinecap="round"
            strokeWidth="2"
          />
          <line
            id="Linea_2"
            dataname="Linea 2"
            x2="17"
            transform="translate(1699.5 88.5)"
            fill="none"
            stroke={isWhite ? "black" : "white"}
            strokeLinecap="round"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
}
