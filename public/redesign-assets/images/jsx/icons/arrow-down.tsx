import { SVGAttributes } from "react"

export default function ArrowDown(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
    >
      <path
        d="M0.999999 0.999999L21 21M21 21L21 3.48175M21 21L4.50365 21"
        stroke="white"
      />
    </svg>
  )
}
