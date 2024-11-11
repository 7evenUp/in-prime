import React from "react"
import styles from "./Founders.module.scss"

interface ArrowTeamProps {
  className?: string
}
const ArrowTeam: React.FC<ArrowTeamProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 27 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.1816 43.8567L13.499 57.6466L0.816402 43.8567"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M13.8838 57.5056L13.8838 0" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default ArrowTeam
