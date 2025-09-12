
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


// Particle system for sophisticated background effects
function ParticleSystem({ className }) {
  const canvasRef = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;


    const ctx = canvas.getContext("2d");
    const particles = [];
    let animationFrameId;


    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };


    const createParticles = () => {
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    };


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });


      // Draw subtle connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 80) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };


    resizeCanvas();
    createParticles();
    animate();


    window.addEventListener("resize", resizeCanvas);


    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className || ""}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}


// Enhanced glassmorphism card component
function GlassCard({ children, className = "", delay = 0, variant = "default", ...props }) {
  const variants = {
    default: "backdrop-blur-xl bg-white/20 border border-white/30",
    subtle: "backdrop-blur-lg bg-white/10 border border-white/20",
    strong: "backdrop-blur-2xl bg-white/25 border border-white/40",
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
        scale: 1.02,
      }}
      className={`
        ${variants[variant]} rounded-2xl
        shadow-xl hover:shadow-2xl transition-all duration-500
        hover:bg-white/30 hover:border-white/50
        ${className}
      `}
      style={{
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}


// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('public/home-bg.jpg')",
        }}
      />
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="max-w-4xl mx-auto text-center px-6 relative z-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 tracking-tight leading-tight drop-shadow-lg"
        >
          <motion.span
            animate={{
              color: ["#ffffff", "#fbbf24", "#06b6d4", "#10b981", "#ffffff"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Engineering
          </motion.span>{" "}
          <br className="hidden md:block" />
          <motion.span
            animate={{
              color: ["#ffffff", "#ef4444", "#8b5cf6", "#f59e0b", "#ffffff"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="text-white/90"
          >
            Excellence
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-[1px] bg-white/60 mx-auto mb-10"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow"
        >
          Engineering Consultant and Equipment Manufacturer for Cement Plant and Bulk Material Handling Equipments
        </motion.p>
        <motion.a
          href="/about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-white text-gray-900 px-10 py-4 text-sm font-light tracking-wider uppercase hover:bg-white/90 transition-colors duration-300"
        >
          Discover More
        </motion.a>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/60 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </motion.div>
      </motion.div>
      {/* Transition gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent z-15" />
    </section>
  );
}


// Services section with sophisticated glassmorphism
function Services() {
  const services = [
    {
      title: "Industrial Machinery",
      description:
        "Custom-engineered machinery tailored to your industrial requirements with precision manufacturing and quality assurance.",
      backgroundImage: "url('/industrial-machinery.jpg')",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Conveyor Solutions",
      description:
        "Advanced belt conveyor systems with comprehensive maintenance services including hot and cold vulcanizing solutions.",
      backgroundImage: "url('/conveyor-systems.jpg')",
      icon: (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Process Equipment",
      description:
        "Complete integrated systems for cement manufacturing, marble processing, and mineral handling operations.",
      backgroundImage: "url('/process-equipment.jpg')",
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ];


  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);


  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient and transition overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-50 to-transparent z-10" />
      <div className="absolute inset-0">
        <ParticleSystem className="opacity-60" />
        {/* Floating geometric shapes */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-200/60 rounded-lg shadow-lg"
            style={{
              background:
                "linear-gradient(45deg, rgba(59,130,246,0.08) 0%, rgba(147,51,234,0.08) 100%)",
              backdropFilter: "blur(2px)",
            }}
          />
          <motion.div
            animate={{
              rotate: -360,
              y: [-20, 20, -20],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-40 right-20 w-24 h-24 rounded-full border-2 border-purple-200/60 shadow-lg"
            style={{
              background:
                "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.08) 100%)",
              backdropFilter: "blur(1px)",
            }}
          />
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-tight">
            Our Expertise
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"
          />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <GlassCard
              key={i}
              delay={i * 0.2}
              variant="strong"
              className="p-8 text-center group relative overflow-hidden"
            >
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl"
                style={{
                  backgroundImage: service.backgroundImage,
                }}
              />


              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500 rounded-2xl" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-cyan-400/30 rounded-2xl" />
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 bg-white/95 rounded-2xl flex items-center justify-center shadow-lg border border-white/50"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">
                  {service.title}
                </h3>
                <p className="text-white/95 leading-relaxed font-medium drop-shadow">
                  {service.description}
                </p>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}


// Trusted collaborators section
function TrustedCollaboratorsSection() {
  const partners = [
    { name: "Fuji Electric", logo: "⚡", color: "from-orange-500 to-red-600" },
    { name: "Johnson Controls", logo: "🏢", color: "from-blue-500 to-cyan-600" },
    { name: "Honeywell", logo: "🔧", color: "from-green-500 to-blue-600" },
    { name: "Ultratech Cement", logo: "🏭", color: "from-gray-600 to-slate-700" },
  ];


  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/companies.jpg')",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-blue-900/80 backdrop-blur-[1px]" />
      {/* Particle overlay for depth */}
      <div className="absolute inset-0">
        <ParticleSystem className="opacity-20" />
      </div>
      {/* Animated subtle patterns */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59,130,246,0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147,51,234,0.4) 0%, transparent 50%)
          `,
        }}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-wider uppercase drop-shadow-lg">
            Trusted Collaborators
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8 shadow-lg"
          />
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div
                className="backdrop-blur-xl bg-white/15 border border-white/30 p-6 text-center min-w-[140px] rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/25 hover:border-white/50"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <motion.div
                  className={`text-3xl mb-3 bg-gradient-to-br ${partner.color} bg-clip-text text-transparent font-bold drop-shadow-sm`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {partner.logo}
                </motion.div>
                <div className="text-white text-sm font-medium tracking-wide drop-shadow-sm">
                  {partner.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// UPDATED: Professional motto and objective sections with images

// UPDATED: New Motto Section with different content and design
function MottoAndObjective() {
  // NEW CONTENT - Different from other pages
  const engineeringPrinciples = [
    {
      title: "Innovation Through Technology",
      text: "Leveraging cutting-edge technology and advanced engineering principles to create groundbreaking solutions for modern industrial challenges.",
      image: "url('/innovation-tech.jpg')",
      number: "01",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "Precision Engineering",
      text: "Every component designed with meticulous attention to detail, ensuring optimal performance and longevity in demanding industrial environments.",
      image: "url('/precision-engineering.jpg')",
      number: "02", 
      gradient: "from-purple-600 to-pink-500"
    },
    {
      title: "Sustainable Manufacturing",
      text: "Committed to environmentally responsible practices while delivering efficient solutions that reduce waste and energy consumption.",
      image: "url('/sustainable-manufacturing.jpg')",
      number: "03",
      gradient: "from-green-600 to-emerald-500"
    },
    {
      title: "Safety-First Approach",
      text: "Prioritizing workplace safety and operational security through rigorous testing and compliance with international safety standards.",
      image: "url('/safety-first.jpg')",
      number: "04",
      gradient: "from-orange-600 to-red-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <ParticleSystem className="opacity-20" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 border border-gray-200/30 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.02) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-16 w-80 h-80 border border-stone-200/40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(107,114,128,0.02) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* NEW DESIGN: Engineering Principles Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-gray-800 mb-6 tracking-tight">
              Engineering Principles
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-slate-600 mx-auto"
            />
            <p className="text-lg text-gray-600 font-light mt-6 max-w-3xl mx-auto">
              Four core principles that drive our engineering excellence and shape every project we undertake
            </p>
          </motion.div>

          {/* NEW DESIGN: Alternating Layout */}
          <div className="space-y-16">
            {engineeringPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Section */}
                <div className="lg:w-1/2">
                  <motion.div
                    className="relative group overflow-hidden rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="h-80 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: principle.image,
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                    {/* Number overlay */}
                    <div className="absolute top-6 left-6">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${principle.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {principle.number}
                      </motion.div>
                    </div>

                    {/* Floating stats or icons */}
                    <div className="absolute bottom-6 right-6">
                      <motion.div
                        className="bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                          {index === 0 && <span className="text-white text-lg">🔧</span>}
                          {index === 1 && <span className="text-white text-lg">⚙️</span>}
                          {index === 2 && <span className="text-white text-lg">🌱</span>}
                          {index === 3 && <span className="text-white text-lg">🛡️</span>}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-1 bg-gradient-to-r ${principle.gradient} rounded-full`} />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Principle {principle.number}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4 tracking-tight">
                      {principle.title}
                    </h3>

                    <p className="text-lg leading-relaxed font-light text-gray-600 mb-6">
                      {principle.text}
                    </p>

                    {/* Feature highlights */}
                    <div className="space-y-3">
                      {index === 0 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-sm text-gray-600">Advanced CAD/CAM Integration</span>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="text-sm text-gray-600">Tolerance Control ±0.01mm</span>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm text-gray-600">ISO 14001 Certified Processes</span>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <span className="text-sm text-gray-600">Zero-Accident Track Record</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Flow Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Innovation</span>
              </div>
              <div className="w-8 h-[1px] bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-sm text-gray-600">Precision</span>
              </div>
              <div className="w-8 h-[1px] bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Sustainability</span>
              </div>
              <div className="w-8 h-[1px] bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm text-gray-600">Safety</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 uppercase tracking-wider">Our Engineering Methodology</p>
          </motion.div>
        </div>

        {/* The Objective Section (keeping the same as it's good) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-800 mb-6 tracking-tight">
            The Objective
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[1px] bg-gradient-to-r from-gray-400 to-slate-600 mx-auto mb-12"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Split layout with image and content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div 
                  className="h-96 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/objective-hero.jpg')",
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating stats on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-center bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30"
                    >
                      <div className="text-xl font-extralight text-white mb-1">16+</div>
                      <div className="text-xs uppercase tracking-wider text-white/90 font-medium">Years</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-center bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30"
                    >
                      <div className="text-xl font-extralight text-white mb-1">99%</div>
                      <div className="text-xs uppercase tracking-wider text-white/90 font-medium">Satisfaction</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="text-center bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30"
                    >
                      <div className="text-xl font-extralight text-white mb-1">24/7</div>
                      <div className="text-xs uppercase tracking-wider text-white/90 font-medium">Support</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg leading-relaxed font-light text-gray-700"
              >
                To market and develop comprehensive engineering solutions tailored to specific industry requirements, 
                integrating both exceptional quality and unwavering reliability with prompt delivery schedules.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg leading-relaxed font-light text-gray-700"
              >
                Recognizing the critical importance of efficient replacement solutions, we have established comprehensive 
                service capabilities spanning diverse industrial sectors, ensuring operational continuity and enhanced productivity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-100/50"
              >
                <p className="text-lg leading-relaxed font-medium text-slate-700 italic">
                  "We believe in expanding our responsibility across all industrial domains, coordinating our expertise 
                  to deliver efficient and economical solutions. Our customers remain our most valued teachers."
                </p>
              </motion.div>

              {/* Action button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="pt-4"
              >
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 bg-slate-800 text-white text-sm font-medium tracking-wider uppercase hover:bg-slate-700 transition-colors duration-300 rounded-sm shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
