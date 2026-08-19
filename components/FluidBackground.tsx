"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Convert normalized mouse coordinates [-1, 1] to UV space [0, 1]
    vec2 mouseUv = uMouse * 0.5 + 0.5;

    // Aspect-ratio corrected UV distance
    vec2 aspectUv = (uv - 0.5) * vec2(uAspect, 1.0);
    vec2 aspectMouse = (mouseUv - 0.5) * vec2(uAspect, 1.0);

    float dist = distance(aspectUv, aspectMouse);

    // Ripple wave falloff & strength
    float radius = 0.5;
    float mouseRipple = 0.0;

    if (dist < radius) {
      float normDist = dist / radius;
      float wave1 = sin(normDist * 22.0 - uTime * 4.0);
      float wave2 = cos(normDist * 11.0 - uTime * 2.5) * 0.5;
      float falloff = smoothstep(1.0, 0.0, normDist);
      mouseRipple = (wave1 + wave2) * falloff * 0.4;
    }

    // Organic liquid/cloth ambient undulating waves
    float ambientWave1 = sin(pos.x * 1.5 + uTime * 0.8) * cos(pos.y * 1.3 + uTime * 0.6) * 0.15;
    float ambientWave2 = cos(pos.x * 2.8 - uTime * 1.1) * sin(pos.y * 2.5 + uTime * 0.9) * 0.08;

    float totalElevation = mouseRipple + ambientWave1 + ambientWave2;
    pos.z += totalElevation;

    vElevation = totalElevation;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = modelPosition.xyz;

    gl_Position = projectedPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    // Base dark abstract obsidian & charcoal color palette
    vec3 deepBlack = vec3(0.03, 0.03, 0.05);
    vec3 darkCharcoal = vec3(0.08, 0.08, 0.12);
    vec3 indigoHighlight = vec3(0.30, 0.25, 0.88);
    vec3 amberHighlight = vec3(0.95, 0.58, 0.20);
    vec3 cyanHighlight = vec3(0.18, 0.75, 0.90);

    // Calculate elevation lighting factor
    float elevationFactor = smoothstep(-0.25, 0.45, vElevation);

    // Fresnel rim light reflection
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

    // Blend base dark cloth colors with metallic highlights on wave crests
    vec3 baseColor = mix(deepBlack, darkCharcoal, vUv.y + 0.2 * sin(uTime * 0.5));
    vec3 crestColor = mix(indigoHighlight, amberHighlight, sin(vElevation * 7.0 + uTime) * 0.5 + 0.5);

    vec3 finalColor = mix(baseColor, crestColor, elevationFactor * 0.55);

    // Add specular rim glow & cyan crest sheen
    finalColor += crestColor * fresnel * 0.45;
    finalColor += cyanHighlight * pow(clamp(vElevation, 0.0, 1.0), 2.5) * 0.35;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const easedMouse = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  useFrame((state, delta) => {
    // Heavy lerp factor (0.04) for organic, fluid/cloth trailing motion
    easedMouse.current.x = THREE.MathUtils.lerp(
      easedMouse.current.x,
      state.pointer.x,
      0.04
    );
    easedMouse.current.y = THREE.MathUtils.lerp(
      easedMouse.current.y,
      state.pointer.y,
      0.04
    );

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uMouse.value.set(
        easedMouse.current.x,
        easedMouse.current.y
      );
      materialRef.current.uniforms.uAspect.value =
        viewport.width / viewport.height;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uAspect: { value: 1 },
        }}
        wireframe={false}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-black" />;
  }

  return (
    <div className="fixed inset-0 z-0 w-full h-screen bg-black overflow-hidden pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: false }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}
