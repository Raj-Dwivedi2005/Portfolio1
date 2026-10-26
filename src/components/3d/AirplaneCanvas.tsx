"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createAirlinerModel } from "./AirplaneModel";

interface Waypoint {
  p: number;
  pos: [number, number, number];
  rot: [number, number, number]; // [pitch (X), yaw (Y), roll (Z)]
}

const WAYPOINTS: Waypoint[] = [
  { p: 0.0, pos: [-3.0, 0.8, -1.6], rot: [-0.08, 1.25, -0.32] }, // Hero: entering from left, banking toward user
  { p: 0.16, pos: [2.1, 0.35, -1.3], rot: [0.03, 0.88, 0.28] }, // About: crossing sky to right
  { p: 0.32, pos: [-1.9, 0.65, -1.5], rot: [0.14, 1.35, -0.3] }, // Education: climbing through clouds
  { p: 0.48, pos: [2.3, -0.25, -1.7], rot: [-0.04, 0.78, 0.22] }, // Skills: high-speed cruise
  { p: 0.62, pos: [-2.2, 0.05, -1.4], rot: [0.09, 1.32, -0.38] }, // Experience: banking turn
  { p: 0.76, pos: [1.3, 0.45, -1.5], rot: [0.02, 0.92, 0.18] }, // Projects: stable approach lane
  { p: 0.88, pos: [-1.5, 0.75, -1.8], rot: [0.15, 1.22, -0.24] }, // Certifications & SSB: climbing
  { p: 1.0, pos: [4.6, 2.9, -3.2], rot: [0.38, 0.82, 0.42] }, // Contact: full throttle ascension into sunset/night
];

// Linear interpolation between waypoints with smooth cubic hermite easing
function interpolateFlightState(progress: number): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
} {
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding waypoints
  let i = 0;
  while (i < WAYPOINTS.length - 1 && WAYPOINTS[i + 1].p < p) {
    i++;
  }

  const w0 = WAYPOINTS[i];
  const w1 = WAYPOINTS[Math.min(i + 1, WAYPOINTS.length - 1)];

  const span = w1.p - w0.p;
  const localT = span === 0 ? 0 : (p - w0.p) / span;

  // Smooth step easing
  const smoothT = localT * localT * (3 - 2 * localT);

  const x = THREE.MathUtils.lerp(w0.pos[0], w1.pos[0], smoothT);
  const y = THREE.MathUtils.lerp(w0.pos[1], w1.pos[1], smoothT);
  const z = THREE.MathUtils.lerp(w0.pos[2], w1.pos[2], smoothT);

  const pitch = THREE.MathUtils.lerp(w0.rot[0], w1.rot[0], smoothT);
  const yaw = THREE.MathUtils.lerp(w0.rot[1], w1.rot[1], smoothT);
  const roll = THREE.MathUtils.lerp(w0.rot[2], w1.rot[2], smoothT);

  return {
    position: new THREE.Vector3(x, y, z),
    rotation: new THREE.Euler(pitch, yaw, roll, "YXZ"),
  };
}

export const AirplaneCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [flightAltitude, setFlightAltitude] = useState("FL320");

  useEffect(() => {
    // Check reduced motion or very low-power device
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Detect WebGL capability
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl || prefersReducedMotion) {
        setUseFallback(true);
        return;
      }
    } catch {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.2);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // Stars / Atmospheric Particles
    const starCount = 350;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 30;
      starPositions[i + 2] = -5 - Math.random() * 25;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // Procedural Atmospheric Clouds
    const cloudGroup = new THREE.Group();
    const cloudGeom = new THREE.SphereGeometry(1.2, 12, 12);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.16,
      roughness: 0.95,
      metalness: 0.05,
    });

    const clouds: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const cloud = new THREE.Mesh(cloudGeom, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 - 1,
        -2.5 - Math.random() * 4
      );
      const s = 1.2 + Math.random() * 1.8;
      cloud.scale.set(s * 1.6, s * 0.7, s);
      cloudGroup.add(cloud);
      clouds.push(cloud);
    }
    scene.add(cloudGroup);

    // Create 3D Airliner Model
    const { airplaneGroup, leftEngineNozzle, rightEngineNozzle, navLights, turbines } =
      createAirlinerModel();
    scene.add(airplaneGroup);

    // Contrail System (Dynamic Trail Puffs)
    const CONTRAIL_PUFFS = 64;
    const contrailPuffs: {
      mesh: THREE.Mesh;
      active: boolean;
      life: number;
      maxLife: number;
      initScale: number;
    }[] = [];

    const contrailMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const contrailPuffGeom = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < CONTRAIL_PUFFS * 2; i++) {
      const mesh = new THREE.Mesh(contrailPuffGeom, contrailMat.clone());
      mesh.visible = false;
      scene.add(mesh);
      contrailPuffs.push({
        mesh,
        active: false,
        life: 0,
        maxLife: 45,
        initScale: 0.5,
      });
    }

    let contrailEmitTimer = 0;
    const emitContrail = (leftPos: THREE.Vector3, rightPos: THREE.Vector3) => {
      // Find two inactive puffs
      const leftPuff = contrailPuffs.find((p) => !p.active);
      if (leftPuff) {
        leftPuff.active = true;
        leftPuff.life = 0;
        leftPuff.mesh.position.copy(leftPos);
        leftPuff.mesh.scale.setScalar(0.6);
        leftPuff.mesh.visible = true;
      }
      const rightPuff = contrailPuffs.slice(CONTRAIL_PUFFS).find((p) => !p.active);
      if (rightPuff) {
        rightPuff.active = true;
        rightPuff.life = 0;
        rightPuff.mesh.position.copy(rightPos);
        rightPuff.mesh.scale.setScalar(0.6);
        rightPuff.mesh.visible = true;
      }
    };

    // Scroll & Mouse Tracking
    let targetProgress = 0;
    let smoothProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset;
      targetProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;

      // Update flight altitude label based on scroll
      const altNum = Math.floor(280 + targetProgress * 120);
      setFlightAltitude(`FL${altNum}`);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll(); // Initial position

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let isHidden = false;

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isHidden) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth progress interpolation
      smoothProgress += (targetProgress - smoothProgress) * 0.085;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Interpolate flight trajectory
      const { position, rotation } = interpolateFlightState(smoothProgress);

      // Add gentle aerodynamic wobble & mouse parallax
      const turbulenceX = Math.sin(elapsed * 1.8) * 0.04 + mouseX * 0.25;
      const turbulenceY = Math.cos(elapsed * 1.4) * 0.03 + mouseY * 0.15;
      const rollTilt = Math.sin(elapsed * 2.1) * 0.02 - mouseX * 0.12;

      airplaneGroup.position.set(
        position.x + turbulenceX,
        position.y + turbulenceY,
        position.z
      );

      airplaneGroup.rotation.set(
        rotation.x + turbulenceY * 0.2,
        rotation.y,
        rotation.z + rollTilt
      );

      // Spin turbofan fan blades
      turbines.forEach((t) => {
        t.rotation.z += delta * 35;
      });

      // Pulse navigation strobe lights
      navLights.forEach((nl, idx) => {
        const strobe =
          Math.sin(elapsed * (idx === 2 ? 8 : 4) + idx * 2) > 0.4 ? 1.8 : 0.2;
        nl.light.intensity = nl.baseIntensity * strobe;
      });

      // Contrail emission
      contrailEmitTimer += delta;
      if (contrailEmitTimer > 0.035) {
        contrailEmitTimer = 0;
        // Transform engine nozzle positions to world coordinates
        const leftWorld = leftEngineNozzle.clone().applyMatrix4(airplaneGroup.matrixWorld);
        const rightWorld = rightEngineNozzle.clone().applyMatrix4(airplaneGroup.matrixWorld);
        emitContrail(leftWorld, rightWorld);
      }

      // Update contrail puffs
      contrailPuffs.forEach((puff) => {
        if (!puff.active) return;
        puff.life += delta * 30;
        const p = puff.life / puff.maxLife;
        if (p >= 1) {
          puff.active = false;
          puff.mesh.visible = false;
        } else {
          // Puff expands and gently dissipates
          const scale = puff.initScale + p * 2.4;
          puff.mesh.scale.setScalar(scale);
          (puff.mesh.material as THREE.MeshBasicMaterial).opacity =
            0.24 * (1 - p * p);
        }
      });

      // Drift Clouds & Star parallax
      clouds.forEach((cloud, i) => {
        cloud.position.x -= delta * (0.15 + i * 0.03);
        if (cloud.position.x < -10) cloud.position.x = 10;
      });
      starField.rotation.y = elapsed * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* 3D WebGL Canvas */}
      {!useFallback ? (
        <canvas
          ref={canvasRef}
          className="h-full w-full transition-opacity duration-1000"
        />
      ) : (
        /* Lightweight 2D SVG/CSS Fallback for Reduced-Motion or Low-Power */
        <div className="relative h-full w-full opacity-60">
          <svg
            className="h-full w-full text-sky-500/20"
            viewBox="0 0 1000 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 50 150 Q 300 100 500 350 T 950 650"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            {/* Stylized Twin-Engine Jet Silhouette */}
            <g transform="translate(620, 420) rotate(22) scale(0.45)">
              <ellipse cx="100" cy="50" rx="90" ry="16" fill="#38bdf8" />
              <polygon points="100,50 190,50 120,8 60,8" fill="#0284c7" />
              <polygon points="100,50 190,50 120,92 60,92" fill="#0284c7" />
              <polygon points="20,50 45,50 25,15 10,15" fill="#38bdf8" />
              <polygon points="20,50 45,50 25,85 10,85" fill="#38bdf8" />
              <circle cx="180" cy="50" r="4" fill="#00f0ff" />
            </g>
          </svg>
        </div>
      )}

      {/* Atmospheric Scrim to guarantee WCAG AA text contrast over background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/60 to-[#030712]/90 light:from-[#f0f7ff]/75 light:via-[#f0f7ff]/60 light:to-[#f0f7ff]/90" />

      {/* Subtle Aviation Radar Grid */}
      <div className="pointer-events-none absolute inset-0 radar-grid opacity-35" />

      {/* Live Avionics Telemetry HUD Stamp (Bottom Left) */}
      <div className="pointer-events-none fixed bottom-4 left-6 z-10 hidden font-mono text-[11px] tracking-wider text-sky-400/60 lg:block">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-beacon" />
          <span>RADAR: RD-WIDEBODY-01</span>
          <span className="text-sky-500/30">|</span>
          <span>ALT: {flightAltitude}</span>
          <span className="text-sky-500/30">|</span>
          <span>HDG: 074° CRZ</span>
        </div>
      </div>
    </div>
  );
};
