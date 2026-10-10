import { SVGAttributes } from "react"

function ToggleRight(props: SVGAttributes<SVGSVGElement>) {
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
          d="M33.7173 1L39.3741 6.65685L33.7173 12.3137"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M38.4 6.7168H0" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default ToggleRight
