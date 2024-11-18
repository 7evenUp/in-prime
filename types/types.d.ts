declare module "*.mp3" {
  const value: any
  export default value
}

declare module "*.svg" {
  import { FC, SVGProps } from "react"
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export { ReactComponent }
}

// declare module "*.module.scss" {
//   const classes: { [key: string]: string }
//   export default classes
// }
