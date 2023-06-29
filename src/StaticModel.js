import { useGLTF } from "@react-three/drei";

const StaticModel = () => {
  const { nodes } = useGLTF("/untitled.gltf");
  return <primitive object={nodes.Scene} />;
};

export default StaticModel;
