"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

const SoftShapes = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#94a3b8",
        roughness: 0.55,
        metalness: 0.25,
        transparent: true,
        opacity: 0.75,
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.1;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.06;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh material={mat} position={[-1.1, 0.25, -0.2]}>
        <dodecahedronGeometry args={[0.65, 0]} />
      </mesh>
      <mesh material={mat} position={[0.9, -0.15, 0.25]}>
        <octahedronGeometry args={[0.55, 0]} />
      </mesh>
      <mesh material={mat} position={[0.1, 0.35, -0.6]} rotation={[0.2, 0.5, 0]}>
        <torusKnotGeometry args={[0.32, 0.1, 120, 16]} />
      </mesh>
    </group>
  );
};

export const Projects3DBackdrop = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28] [mask-image:radial-gradient(circle_at_50%_40%,black_18%,transparent_66%)]"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.3, 4.6], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={0.85} />
        <SoftShapes reducedMotion={reducedMotion} />
        <Environment resolution={128}>
          <Lightformer intensity={1.1} position={[4, 2, 3]} scale={[7, 5, 1]} />
          <Lightformer intensity={0.7} position={[-4, 1, 2]} scale={[6, 3, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
};

