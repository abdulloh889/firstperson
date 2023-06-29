import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

import Model from "./Model";
// import StaticModel from "./StaticModel";

/**
 * https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models#loading-gltf-models-as-jsx-components
 */

export default function Viewer() {
  const ref = useRef();
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 25, zoom: 0.6, position: [0, 0.5, 0.6] }}
    >
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={0.5}
          environment="city"
        >
          {/* Load gltf direcly, no need full jsx component. Recommended */}
          {/* <StaticModel /> */}

          {/* Load gltf with jsx component. Use when need interactivity */}
          <Model />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate />
    </Canvas>
  );
}
