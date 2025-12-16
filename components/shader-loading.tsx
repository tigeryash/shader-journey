import { Html } from "@react-three/drei"
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

const ShaderLoading = () => {
  return (
    <Html
        as='div' // Wrapping element (default: 'div')
        prepend // Project content behind the canvas (default: false)
        center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        transform // If true, applies matrix3d transformations (default=false)
        sprite // Renders as sprite, but only in transform mode (default=false)
        onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
        className="flex justify-center items-center"
    >
        <Quantum
            size="45"
            speed="1.75"
            color="white" 
        />
    </Html>
  )
}

export default ShaderLoading


