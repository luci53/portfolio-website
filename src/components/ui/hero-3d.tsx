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

const Sculpt = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cbd5e1",
        roughness: 0.35,
        metalness: 0.65,
      }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    if (!reducedMotion) {
      const t = clock.getElapsedTime();
      group.current.rotation.y = t * 0.25 + pointer.x * 0.35;
      group.current.rotation.x = pointer.y * 0.2;
      group.current.position.y = Math.sin(t * 0.8) * 0.08;
    } else {
      group.current.rotation.y = 0.35;
      group.current.rotation.x = 0.05;
      group.current.position.y = 0;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh material={material} castShadow receiveShadow>
        <icosahedronGeometry args={[1.05, 0]} />
      </mesh>
      <mesh position={[0.15, -0.05, 0.25]} material={material}>
        <torusGeometry args={[0.62, 0.14, 24, 72]} />
      </mesh>
    </group>
  );
};

export const Hero3D = ({ className }: { className?: string }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={
        className ??
        "pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(circle_at_50%_40%,black_22%,transparent_62%)]"
      }
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.2, 3.2], fov: 40 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.0} />
        <directionalLight position={[-4, 2, -2]} intensity={0.5} />
        <Sculpt reducedMotion={reducedMotion} />
        <Environment resolution={256}>
          <Lightformer intensity={1.3} position={[4, 2, 3]} scale={[6, 6, 1]} />
          <Lightformer intensity={0.8} position={[-4, 1, 2]} scale={[5, 3, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
};

