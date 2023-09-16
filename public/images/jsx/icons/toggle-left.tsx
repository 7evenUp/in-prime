import { SVGAttributes } from "react"

function ToggleLeft(props: SVGAttributes<SVGSVGElement>) {
  return (
    <div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 41 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        opacity={props.opacity}
        preserveAspectRatio="none"
      >
        <path
          d="M7.28271 1L1.62586 6.65685L7.28271 12.3137"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M2.6 6.7168H41" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default ToggleLeft
