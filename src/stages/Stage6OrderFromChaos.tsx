import NeuralNetworkGraph from "../components/NeuralNetworkGraph";

export default function Stage6OrderFromChaos({ t }: { t: number }) {
  return (
    <>
      <NeuralNetworkGraph t={t} />
      
      {/* Additional lighting for the neural network */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="cyan" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="purple" />
    </>
  );
}
