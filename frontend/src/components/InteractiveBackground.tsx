import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Set background color to dark gray
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
      colorsArray[i] = 0.2; // Initialize all particles to a darker white/gray
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005, // Smaller particle size
      vertexColors: true, // Enable vertex colors
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0001;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(particles);

      const colors = particles.geometry.attributes.color.array as Float32Array;

      // Reset colors to white and then apply hover effect
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      }

      if (intersects.length > 0) {
        const { index } = intersects[0];
        if (index !== undefined) {
          const positions = particles.geometry.attributes.position.array as Float32Array;
          const intersectedPoint = intersects[0].point;

          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const particlePosition = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            const distance = particlePosition.distanceTo(intersectedPoint);

            // Make particles closer to the mouse brighter and redder
            const maxDistance = 1.5; // Adjust this value to control the radius of the effect
            const normalizedDistance = Math.min(1, distance / maxDistance);
            const brightness = 1 - normalizedDistance; // Fades from 1 to 0
            
            // Interpolate between white (1,1,1) and red (1,0,0) based on brightness
            colors[i3] = 1; // Red component is always 1
            colors[i3 + 1] = brightness; // Green component fades
            colors[i3 + 2] = brightness; // Blue component fades
          }
        }
      }
      particles.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    const mount = mountRef.current;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="interactive-background" />;
};

export default InteractiveBackground;
