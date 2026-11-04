import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CampusCanvas3D = ({
  height = 240,
  interactive = true,
  showLabel = true
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all campus elements for unified rotation
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // 1. Central Core: HKBK Spire (Octahedron & Wireframe Cage)
    const coreGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0B1E36,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x071426,
      emissiveIntensity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    campusGroup.add(coreMesh);

    // Gold Trim Wireframe Cage
    const wireframeGeometry = new THREE.OctahedronGeometry(1.28, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    campusGroup.add(wireframeMesh);

    // 2. Orbital Academic Ring (Gold Torus)
    const ringGeometry = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xDFBF77,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xC5A059,
      emissiveIntensity: 0.2
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.8;
    campusGroup.add(ringMesh);

    // Second inclined counter-orbit ring
    const ring2Geometry = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ringMaterial);
    ring2Mesh.rotation.x = -Math.PI / 3.2;
    ring2Mesh.rotation.y = Math.PI / 6;
    campusGroup.add(ring2Mesh);

    // 3. Academic Satellite Nodes (Library, Labs, Placement, Exam Hall)
    const satelliteNodes = [];
    const nodeColors = [0x3B82F6, 0x10B981, 0xD4AF37, 0x6366F1];

    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.IcosahedronGeometry(0.25, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        metalness: 0.6,
        roughness: 0.3
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i * Math.PI) / 2;
      nodeMesh.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 0.4, Math.sin(angle) * 2.2);
      campusGroup.add(nodeMesh);
      satelliteNodes.push({ mesh: nodeMesh, angle, speed: 0.008 + i * 0.003 });
    }

    // 4. Particle Atmosphere Dust
    const particlesCount = 70;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xDFBF77,
      size: 0.06,
      transparent: true,
      opacity: 0.6
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.PointLight(0xF3E5AB, 3.5, 50);
    goldKeyLight.position.set(4, 5, 4);
    scene.add(goldKeyLight);

    const blueFillLight = new THREE.PointLight(0x3B82F6, 2.5, 50);
    blueFillLight.position.set(-4, -2, -3);
    scene.add(blueFillLight);

    // Interactive Drag to Rotate handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      campusGroup.rotation.y += deltaX * 0.008;
      campusGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || !interactive || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      campusGroup.rotation.y += deltaX * 0.008;
      campusGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion && !isDragging) {
        campusGroup.rotation.y += 0.006;
        coreMesh.rotation.y -= 0.004;
        wireframeMesh.rotation.y += 0.005;
        particleField.rotation.y += 0.001;

        // Move satellites along orbital path
        satelliteNodes.forEach((node) => {
          node.angle += node.speed;
          node.mesh.position.x = Math.cos(node.angle) * 2.2;
          node.mesh.position.z = Math.sin(node.angle) * 2.2;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ring2Geometry.dispose();
      ringMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [height, interactive]);

  return (
    <div
      style={{
        width: '100%',
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: interactive ? 'grab' : 'default'
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {showLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(8, 22, 40, 0.75)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            fontSize: '0.68rem',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-mono)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span>3D WebGL Digital Campus</span>
          <span style={{ opacity: 0.6 }}>• Drag to rotate</span>
        </div>
      )}
    </div>
  );
};

