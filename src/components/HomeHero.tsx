import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ArrowUpRight, Sparkles, FolderOpen, Headphones } from 'lucide-react';

interface HomeHeroProps {
  onExploreServices: () => void;
  onRequestQuote: () => void;
}

export default function HomeHero({ onExploreServices, onRequestQuote }: HomeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    // GSAP text reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(bannerRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 40, letterSpacing: '0.05em' },
        { opacity: 1, y: 0, letterSpacing: 'normal', duration: 1.2, ease: 'power4.out', delay: 0.4 }
      );

      gsap.fromTo(subheadingRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      );

      gsap.fromTo(buttonsRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Three.js floating paper simulation
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // AMBIENT LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffffff, 0.6);
    scene.add(ambientLight);

    // POINT LIGHT (VIBRANT NEON PURPLE)
    const purpleLight = new THREE.PointLight(0xa855f7, 3, 50);
    purpleLight.position.set(0, 0, 4);
    scene.add(purpleLight);

    // DIRECTIONAL LIGHT (WHITE SHINE)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // CREATING FLOATING PAPER SHEETS
    const paperCount = 18;
    const papers: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(1.2, 1.8, 3, 3); // rectangular aspect ratio like wedding invites

    // Materials with differing premium finishes 
    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x221345, // royal dark purple
        roughness: 0.2,
        metalness: 0.6,
        side: THREE.DoubleSide
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffffff, // classic premium ivory white
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide
      }),
      new THREE.MeshStandardMaterial({
        color: 0x111115, // luxury charcoal
        roughness: 0.1,
        metalness: 0.8,
        side: THREE.DoubleSide
      }),
      new THREE.MeshStandardMaterial({
        color: 0xd97706, // gorgeous golden foil
        roughness: 0.1,
        metalness: 0.95,
        side: THREE.DoubleSide
      })
    ];

    for (let i = 0; i < paperCount; i++) {
      const material = materials[i % materials.length].clone();
      const mesh = new THREE.Mesh(geometry, material);

      // Random spacing across the perspective frustum
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      );

      // Random rotational seeds
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Custom motion values
      mesh.userData = {
        speedY: 0.005 + Math.random() * 0.01,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        rotSpeedZ: (Math.random() - 0.5) * 0.008,
        swaySpeed: 0.001 + Math.random() * 0.002,
        swayAmp: 0.2 + Math.random() * 0.5,
        swaySeed: Math.random() * 100
      };

      scene.add(mesh);
      papers.push(mesh);
    }

    // MOUSE INTERACTION TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalizing mouse -0.5 to 0.5
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera hover lerp (Mouse Parallax)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 3;
      camera.position.y = -targetY * 3;
      camera.lookAt(0, 0, 0);

      // Slowly float light with mouse position
      purpleLight.position.x = targetX * 8;
      purpleLight.position.y = -targetY * 6;

      // Animate paper meshes
      papers.forEach((paper) => {
        // Fall down slowly
        paper.position.y -= paper.userData.speedY;

        // Reset paper to top if it drifts out of sight
        if (paper.position.y < -5.5) {
          paper.position.y = 5.5;
          paper.position.x = (Math.random() - 0.5) * 12;
        }

        // Apply automatic rotations
        paper.rotation.x += paper.userData.rotSpeedX;
        paper.rotation.y += paper.userData.rotSpeedY;
        paper.rotation.z += paper.userData.rotSpeedZ;

        // Settle horizontal sway
        paper.userData.swaySeed += paper.userData.swaySpeed;
        paper.position.x += Math.sin(paper.userData.swaySeed) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // LIFECYCLE CLEANUP
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose items safely to prevent browser canvas leaks
      if (renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020205] pt-16 z-10" id="hero-section">
      {/* Three.js canvas absolute viewport */}
      <div 
        ref={containerRef} 
        className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-62"
        id="hero-3d-canvas"
      />

      {/* Extreme ambient violet radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[150px] -z-20 pointer-events-none" />

      {/* Decorative premium thin mesh grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20" />

      <div className="max-w-5xl mx-auto px-6 text-center select-none">
        {/* Luxury Badge Banner info */}
        <div 
          ref={bannerRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wider mb-6 cursor-default"
          id="hero-badge"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>ESTD 2016 . AWARD WINNING CRAFTSMANSHIP</span>
        </div>

        {/* Majestic Typography Headline */}
        <h1 
          ref={headingRef}
          className="font-heading font-extrabold text-[42px] sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] tracking-tight text-white mb-6"
          id="hero-heading"
        >
          Premium Printing <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-glow-purple">
            Solutions For Every
          </span>{" "}
          Occasion
        </h1>

        {/* Elegant descriptive subtext */}
        <p 
          ref={subheadingRef}
          className="max-w-2xl mx-auto text-slate-400 font-sans text-sm sm:text-base md:text-[17.5px] leading-relaxed tracking-wide mb-10 text-slate-300"
          id="hero-subheading"
        >
          Discover exceptional physical detail in our majestic{" "}
          <span className="text-white font-medium underline decoration-purple-500/40 underline-offset-4">Indian Wedding Cards</span>
          , premium corporate stationery, custom rigid packaging, spot-UV marketing cards & luxury banner layouts.
        </p>

        {/* Nav Trigger Actions */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4.5"
          id="hero-actions"
        >
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl font-heading text-sm font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2.5 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 transition-all duration-300 hover:scale-103 group"
          >
            <span>Explore Services</span>
            <FolderOpen className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl font-heading text-sm font-semibold tracking-wide glass-panel hover:bg-white/5 border-purple-500/20 hover:border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center gap-2.5 transition-all duration-300 group"
          >
            <span>Request Digital Quote</span>
            <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Floating Call Center Quick Contact */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 border border-purple-500/10 rounded-full cursor-default select-none animate-bounce">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[11.5px] font-mono uppercase tracking-widest text-[#a855f7] font-semibold flex items-center gap-2.5">
          <Headphones className="w-4 h-4" /> Operations active (9AM-9PM)
        </span>
      </div>
    </header>
  );
}
