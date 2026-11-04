import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, RotateCw, ShieldCheck, Layers, Info } from 'lucide-react';

export const HeroOrbitalCrystal3D = ({
  height = 420,
  interactive = true,
  showControls = true
}) => {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [activeGemstone, setActiveGemstone] = useState(null); // 'emerald' | 'amber' | 'sapphire' | null

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
      if (!hasWebGL) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRotating(false);
    }

    // 1. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 8.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Master Group containing the entire orbital sculpture
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Sub-group for rotating central core and cage
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Sub-group for orbital rings
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    // Sub-group for the three gemstones on the left
    const gemsGroup = new THREE.Group();
    masterGroup.add(gemsGroup);

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    scene.add(ambientLight);

    // Key Light: Warm golden directional light from top right front
    const keyLight = new THREE.DirectionalLight(0xFFF2D6, 2.8);
    keyLight.position.set(4.5, 5.5, 4.5);
    scene.add(keyLight);

    // Fill Light: Cool soft directional light from top left front
    const fillLight = new THREE.DirectionalLight(0xDCEBFF, 1.4);
    fillLight.position.set(-5, 3.5, 3.5);
    scene.add(fillLight);

    // Rim / Back Light: Golden highlight from behind
    const rimLight = new THREE.PointLight(0xFCD34D, 3.5, 14);
    rimLight.position.set(0, 3.5, -4);
    scene.add(rimLight);

    // Core Internal Glow: Soft golden light inside the cage
    const coreGlow = new THREE.PointLight(0xF59E0B, 1.5, 5);
    coreGlow.position.set(0, 0, 0);
    scene.add(coreGlow);

    // 3. Central Faceted Glossy Onyx Black Polyhedron
    // Icosahedron with flat shading produces diamond-cut reflective facets
    const crystalGeo = new THREE.IcosahedronGeometry(1.22, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x080A0E,
      emissive: 0x040608,
      emissiveIntensity: 0.2,
      roughness: 0.05,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
      flatShading: true
    });
    const centralCrystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(centralCrystal);

    // 4. Golden Geometric Wireframe Cage surrounding central crystal
    const cageGeo = new THREE.IcosahedronGeometry(1.52, 0);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xE6B83B,
      wireframe: true,
      wireframeLinewidth: 2,
      metalness: 0.95,
      roughness: 0.16
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // Golden Spherical Connection Nodes at each cage vertex
    const nodeGeo = new THREE.SphereGeometry(0.065, 14, 14);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xF5C542,
      emissive: 0x78500C,
      emissiveIntensity: 0.3,
      metalness: 0.96,
      roughness: 0.12
    });

    const nodePositions = cageGeo.attributes.position;
    const addedNodeKeys = new Set();
    for (let i = 0; i < nodePositions.count; i++) {
      const vx = nodePositions.getX(i);
      const vy = nodePositions.getY(i);
      const vz = nodePositions.getZ(i);
      const key = `${vx.toFixed(2)},${vy.toFixed(2)},${vz.toFixed(2)}`;
      if (!addedNodeKeys.has(key)) {
        addedNodeKeys.add(key);
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(vx, vy, vz);
        coreGroup.add(nodeMesh);
      }
    }

    // 5. Polished Gold Intersecting Orbital Rings
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xEEBA36,
      emissive: 0x4D3605,
      emissiveIntensity: 0.12,
      metalness: 0.96,
      roughness: 0.14
    });

    // Ring 1: Primary Equator Ring (tilted)
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.038, 24, 100);
    const ring1 = new THREE.Mesh(ring1Geo, goldRingMat);
    ring1.rotation.set(Math.PI / 3.2, 0.25, 0);
    ringsGroup.add(ring1);

    // Ring 2: Polar Oblique Ring (opposing inclination)
    const ring2Geo = new THREE.TorusGeometry(3.05, 0.032, 24, 100);
    const ring2 = new THREE.Mesh(ring2Geo, goldRingMat);
    ring2.rotation.set(-Math.PI / 3.6, 0.15, 0.6);
    ringsGroup.add(ring2);

    // Ring 3: Third Intersecting Ring (steep angle)
    const ring3Geo = new THREE.TorusGeometry(3.35, 0.028, 24, 100);
    const ring3 = new THREE.Mesh(ring3Geo, goldRingMat);
    ring3.rotation.set(0.4, Math.PI / 2.3, -0.3);
    ringsGroup.add(ring3);

    // Ring 4: Fine Outer Accent Ring
    const ring4Geo = new THREE.TorusGeometry(3.65, 0.018, 16, 90);
    const ring4 = new THREE.Mesh(ring4Geo, goldRingMat);
    ring4.rotation.set(-0.5, -0.3, Math.PI / 5);
    ringsGroup.add(ring4);

    // 6. Three Faceted Gemstones positioned along the left side
    // Gemstone 1: Emerald Green Crystal
    const emeraldGeo = new THREE.OctahedronGeometry(0.38, 0);
    const emeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      emissive: 0x064E3B,
      emissiveIntensity: 0.45,
      roughness: 0.08,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true
    });
    const emeraldMesh = new THREE.Mesh(emeraldGeo, emeraldMat);
    emeraldMesh.position.set(-2.4, 1.45, 0.6);
    emeraldMesh.rotation.set(0.3, 0.6, 0.2);
    gemsGroup.add(emeraldMesh);

    // Tiny gold orbital ring around Emerald
    const emeraldRingGeo = new THREE.TorusGeometry(0.48, 0.016, 12, 48);
    const emeraldRing = new THREE.Mesh(emeraldRingGeo, goldRingMat);
    emeraldRing.position.copy(emeraldMesh.position);
    emeraldRing.rotation.set(Math.PI / 2.5, 0.3, 0);
    gemsGroup.add(emeraldRing);

    // Gemstone 2: Amber / Golden Topaz Crystal
    const amberGeo = new THREE.DodecahedronGeometry(0.42, 0);
    const amberMat = new THREE.MeshPhysicalMaterial({
      color: 0xF59E0B,
      emissive: 0x78350F,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true
    });
    const amberMesh = new THREE.Mesh(amberGeo, amberMat);
    amberMesh.position.set(-3.05, -0.15, -0.35);
    amberMesh.rotation.set(-0.4, 0.5, 0.3);
    gemsGroup.add(amberMesh);

    // Tiny gold ring around Amber
    const amberRingGeo = new THREE.TorusGeometry(0.52, 0.016, 12, 48);
    const amberRing = new THREE.Mesh(amberRingGeo, goldRingMat);
    amberRing.position.copy(amberMesh.position);
    amberRing.rotation.set(-Math.PI / 3, 0.2, 0.5);
    gemsGroup.add(amberRing);

    // Gemstone 3: Deep Sapphire Blue Crystal
    const sapphireGeo = new THREE.IcosahedronGeometry(0.35, 0);
    const sapphireMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563EB,
      emissive: 0x1E1B4B,
      emissiveIntensity: 0.55,
      roughness: 0.08,
      metalness: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true
    });
    const sapphireMesh = new THREE.Mesh(sapphireGeo, sapphireMat);
    sapphireMesh.position.set(-2.3, -1.5, 0.75);
    sapphireMesh.rotation.set(0.6, -0.3, 0.4);
    gemsGroup.add(sapphireMesh);

    // Tiny gold ring around Sapphire
    const sapphireRingGeo = new THREE.TorusGeometry(0.46, 0.016, 12, 48);
    const sapphireRing = new THREE.Mesh(sapphireRingGeo, goldRingMat);
    sapphireRing.position.copy(sapphireMesh.position);
    sapphireRing.rotation.set(Math.PI / 3.5, -0.4, 0.2);
    gemsGroup.add(sapphireRing);

    // 7. Floor Contact Shadow Plane (luxury soft studio shadow)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(11, 22, 40, 0.28)');
    grad.addColorStop(0.4, 'rgba(11, 22, 40, 0.12)');
    grad.addColorStop(1, 'rgba(11, 22, 40, 0)');
    shadowCtx.fillStyle = grad;
    shadowCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.55;
    scene.add(shadowPlane);

    // 8. Subtle Floating Golden Dust Particles
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8.0;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.002;
      particleVelocities[i * 3 + 1] = 0.0015 + Math.random() * 0.002; // slow upward drift
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF5C542,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interactive Drag & Mouse Parallax Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    const onPointerDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!interactive) return;
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        // Limit pitch angle
        targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = 'grab';
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 10. Animation Loop & Visibility Observer
    let animationFrameId;
    let isVisible = true;
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous subtle rotation if enabled
      if (!prefersReducedMotion && isRotating && !isDragging) {
        targetRotationY += 0.0025;
      }

      // Smooth damping (lerp) toward target rotation
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;

      masterGroup.rotation.y = currentRotationY;
      masterGroup.rotation.x = currentRotationX;

      // Independent micro-rotations for visual realism:
      // Central glossy crystal slow counter-rotation
      centralCrystal.rotation.y += 0.002;
      centralCrystal.rotation.x += 0.001;

      // Gold cage gentle counter-tilt
      cageMesh.rotation.y -= 0.0015;
      cageMesh.rotation.z += 0.0008;

      // Orbital rings precess slightly
      ring1.rotation.z += 0.0015;
      ring2.rotation.z -= 0.0012;
      ring3.rotation.z += 0.0018;

      // Gemstones subtle floating bobbing & facet shimmer
      emeraldMesh.position.y = 1.45 + Math.sin(elapsed * 1.5) * 0.04;
      emeraldMesh.rotation.y += 0.004;
      emeraldRing.position.y = emeraldMesh.position.y;

      amberMesh.position.y = -0.15 + Math.sin(elapsed * 1.3 + 1.2) * 0.05;
      amberMesh.rotation.y += 0.003;
      amberRing.position.y = amberMesh.position.y;

      sapphireMesh.position.y = -1.5 + Math.sin(elapsed * 1.7 + 2.5) * 0.04;
      sapphireMesh.rotation.y += 0.005;
      sapphireRing.position.y = sapphireMesh.position.y;

      // Particles slow drift & wrap-around
      const pArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += particleVelocities[i * 3 + 1];
        pArr[i * 3] += Math.sin(elapsed + i) * 0.001;

        // Reset if drifted too high
        if (pArr[i * 3 + 1] > 3.0) {
          pArr[i * 3 + 1] = -2.8;
          pArr[i * 3] = (Math.random() - 0.5) * 8.0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 300;
      camera.aspect = newWidth / height;

      // Adjust camera distance for mobile screens so whole orbital structure is in view
      if (newWidth < 480) {
        camera.position.z = 10.5;
      } else if (newWidth < 768) {
        camera.position.z = 9.2;
      } else {
        camera.position.z = 8.2;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 12. Cleanup & Memory Disposal
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries
      crystalGeo.dispose();
      cageGeo.dispose();
      nodeGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ring4Geo.dispose();
      emeraldGeo.dispose();
      emeraldRingGeo.dispose();
      amberGeo.dispose();
      amberRingGeo.dispose();
      sapphireGeo.dispose();
      sapphireRingGeo.dispose();
      shadowGeo.dispose();
      particleGeo.dispose();

      // Dispose Materials
      crystalMat.dispose();
      cageMat.dispose();
      nodeMat.dispose();
      goldRingMat.dispose();
      emeraldMat.dispose();
      amberMat.dispose();
      sapphireMat.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, [height, interactive, isRotating]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        borderRadius: 'var(--radius-xl)',
        background: 'radial-gradient(ellipse at 50% 45%, var(--bg-surface) 0%, var(--bg-card) 65%, var(--bg-muted) 100%)',
        border: '1px solid var(--border-light)',
        boxShadow: '0 20px 45px -15px rgba(11, 22, 40, 0.18), 0 0 0 1px rgba(197, 160, 89, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="hero-orbital-crystal-container"
    >
      {/* 3D Canvas Container */}
      {webglSupported ? (
        <div
          ref={containerRef}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        />
      ) : (
        /* Graceful Static Fallback if WebGL is unavailable */
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <img
            src="/hkbk-crest.svg"
            alt="HKBK Crest"
            style={{ width: '80px', height: '80px', filter: 'drop-shadow(0 4px 12px rgba(197, 160, 89, 0.4))' }}
          />
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem' }}>
            HKBK Digital Academic Core
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '320px' }}>
            Interactive 3D model paused. WebGL hardware acceleration disabled or unavailable on this browser.
          </div>
        </div>
      )}

      {/* Top Left Title & Pillar Overlay (Non-blocking) */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.5rem',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold)',
              background: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Sparkles size={11} />
            Institutional 3D Core
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            VTU Belagavi Center Code 1HK
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 800,
            margin: 0,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em'
          }}
        >
          HKBK Academic Nexus & Orbital Gemstones
        </h2>
      </div>

      {/* Left Gemstones Legend Badges (Floating on left edge) */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          zIndex: 10
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(5, 11, 20, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#A7F3D0',
            fontSize: '0.7rem',
            fontWeight: 700
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
          <span>Emerald • Continuous Research</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(5, 11, 20, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#FDE68A',
            fontSize: '0.7rem',
            fontWeight: 700
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
          <span>Amber • Innovation & CIE Marks</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(5, 11, 20, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#BFDBFE',
            fontSize: '0.7rem',
            fontWeight: 700
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }} />
          <span>Sapphire • Industry & Placement</span>
        </div>
      </div>

      {/* Top Right Interactive Controls */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 10
          }}
        >
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause Orbital Auto-Spin' : 'Resume Orbital Auto-Spin'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              background: isRotating ? 'rgba(197, 160, 89, 0.18)' : 'var(--bg-subtle)',
              border: isRotating ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
              color: isRotating ? 'var(--accent-gold)' : 'var(--text-secondary)',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s ease'
            }}
          >
            <RotateCw size={12} className={isRotating ? 'spin-icon' : ''} />
            <span>{isRotating ? 'Auto-Orbit' : 'Paused'}</span>
          </button>

          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Eye size={12} />
            <span>Drag 360°</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default HeroOrbitalCrystal3D;
