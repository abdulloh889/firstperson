// App.js
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FPSControls } from "react-three-fpscontrols";

function GreenCircleLand() {
  return (
    <mesh
      position={[0, -0.75, 0]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      receiveShadow
    >
      <circleBufferGeometry attach="geometry" args={[5, 32]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
}

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderBufferGeometry attach="geometry" args={[0.1, 0.15, 1.5, 16]} />
        <meshStandardMaterial attach="material" color="brown" />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneBufferGeometry attach="geometry" args={[0.7, 1.5, 16]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
    </group>
  );
}

function Mountain() {
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <coneBufferGeometry attach="geometry" args={[2.5, 4, 32]} />
      <meshStandardMaterial attach="material" color="gray" />
    </mesh>
  );
}

function CloudSphere({ position, scale }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereBufferGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

function Cloud({ position, rotationSpeed, verticalSpeed }) {
  const groupRef = useRef();
  const elapsedTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      elapsedTimeRef.current += delta;
      groupRef.current.rotation.y += rotationSpeed * delta;
      groupRef.current.position.y =
        position[1] + Math.sin(elapsedTimeRef.current * verticalSpeed) * 0.2;
    }
  });

  const cloudSpheres = [
    { position: [0, 0, 0], scale: 0.6 },
    { position: [0.5, 0.3, 0.5], scale: 0.3 },
    { position: [-0.5, 0.3, 0.5], scale: 0.4 },
    { position: [0, 0.3, -0.5], scale: 0.3 }
  ];

  return (
    <group position={position} ref={groupRef}>
      {cloudSpheres.map((sphere, index) => (
        <CloudSphere
          key={index}
          position={sphere.position}
          scale={sphere.scale}
        />
      ))}
    </group>
  );
}

function Road() {
  return (
    <mesh
      position={[0, -0.74, 0]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      receiveShadow
    >
      <ringBufferGeometry attach="geometry" args={[4.5, 5, 32]} />
      <meshStandardMaterial attach="material" color="gray" />
    </mesh>
  );
}

function RotatingBall() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const radius = 4.2;
    const speed = 1;
    const angle = clock.getElapsedTime() * speed;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="pink" />
    </mesh>
  );
}

function App() {
  const numTrees = 10;
  const numClouds = 6;
  const radius = 3.5;

  const cloudPositions = [...Array(numClouds)].map((_, i) => {
    const angle = (i / numClouds) * Math.PI * 2;
    return [Math.cos(angle) * radius, 4, Math.sin(angle) * radius];
  });

  const cloudRotationSpeeds = Array.from(
    { length: numClouds },
    () => 0.1 + Math.random() * 0.2
  );
  const cloudVerticalSpeeds = Array.from(
    { length: numClouds },
    () => 0.5 + Math.random() * 1
  );

  const treePositions = [...Array(numTrees)].map((_, i) => {
    const angle = (i / numTrees) * Math.PI * 2;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });
  return (
    <Canvas
      shadows
      style={{ background: "skyblue" }}
      camera={{ position: [0, 5, 10], fov: 60 }}
    >
      <Suspense>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} castShadow />
        <Stars />
        <GreenCircleLand />
        {cloudPositions.map((position, index) => (
          <Cloud
            key={index}
            position={position}
            rotationSpeed={cloudRotationSpeeds[index]}
            verticalSpeed={cloudVerticalSpeeds[index]}
          />
        ))}

        <Mountain />

        <Road />
        {/* <RotatingBall /> */}
        {treePositions.map((position, index) => (
          <Tree key={index} position={position} />
        ))}

        {/* <OrbitControls /> */}
        <FPSControls
          camProps={{
            makeDefault: true,
            fov: 80,
            position: [0, 2.537, 8.7]
          }}
          orbitProps={{
            target: [0, 2.537, 0]
          }}
          enableJoystick={true}
          enableKeyboard={true}
        />
      </Suspense>
    </Canvas>
  );
}

export default App;
