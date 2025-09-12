import React, { useEffect, useRef, useState } from "react";


// ---------- Reusable components
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-extralight text-stone-900 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className="w-20 h-[1px] bg-amber-600 mx-auto mt-6" />
  </div>
);


const Container = ({ children, className = "" }) => (
  <div className={`max-w-6xl mx-auto px-6 ${className}`}>{children}</div>
);


// Fixed FadeUp component with actual animation
const FadeUp = ({ delay = 0, children, className = "", duration = 0.6 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );


    if (ref.current) {
      observer.observe(ref.current);
    }


    return () => observer.disconnect();
  }, [delay]);


  return (
    <div
      ref={ref}
      className={`transition-all duration-${Math.round(duration * 1000)} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};


// Image component with error handling and lazy loading
const OptimizedImage = ({ src, alt, className = "", placeholder = true }) => {
  const [imageSrc, setImageSrc] = useState(placeholder ? null : src);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageError(true);
        setIsLoading(false);
      };
      img.src = src;
    }
  }, [src]);


  if (imageError) {
    return (
      <div className={`bg-stone-300 flex items-center justify-center ${className}`}>
        <div className="text-stone-500 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }


  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};


// ---------- Hero Section with improved accessibility
const AboutHero = () => (
  <section 
    className="min-h-[70vh] flex flex-col items-center justify-center relative px-6 text-center bg-gradient-to-b from-stone-800 via-stone-600 to-amber-50"
    role="banner"
    aria-label="About us hero section"
  >
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
    </div>


    {/* Content */}
    <div className="relative z-20 max-w-4xl">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-thin text-white tracking-wide leading-tight drop-shadow-lg">
        Precision.<br />
        Purpose.<br />
        <span className="inline-block border-b-4 border-amber-400 pb-2 text-amber-300">People.</span>
      </h1>


      <p className="mt-6 text-lg sm:text-xl md:text-2xl font-light text-stone-200 max-w-xl leading-relaxed drop-shadow-sm mx-auto">
        Decades of engineering excellence delivering reliable, elegant industrial solutions.
      </p>
    </div>
  </section>
);


// ---------- Overview Section with proper statistics
const Overview = () => (
  <section className="py-24 bg-stone-50" role="main">
    <Container>
      <SectionTitle title="Who We Are" />
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <FadeUp className="lg:col-span-6">
          <div className="aspect-[4/3] bg-stone-200 overflow-hidden rounded-2xl shadow-lg">
            <OptimizedImage 
              src="https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704908/machinery-heritage_ov2wns.jpg"
              alt="Industrial machinery and engineering team at work"
              className="w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-6">
          <div className="space-y-6">
            <p className="text-stone-700 font-light leading-relaxed text-lg">
              From custom industrial machinery to conveyor solutions and end‑to‑end processing equipment, we bring
              rigorous engineering and refined execution to every project.
            </p>
            <p className="text-stone-600 font-light leading-relaxed">
              Our philosophy is simple: <span className="italic text-amber-700 font-medium">solve real problems beautifully</span>. That means dependable
              performance, meticulous detailing, and support that lasts.
            </p>
            <div className="flex justify-center gap-16 pt-6">
              {[
                { label: "Years in Business", value: "16+" },
                { label: "Client Satisfaction", value: "99.9%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl font-extralight text-amber-700 group-hover:text-amber-600 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </Container>
  </section>
);


// ---------- Legacy Section with proper images
const Legacy = () => {
  const milestones = [
    {
      year: "2008",
      title: "Founded",
      text: "A small engineering outfit with a big vision for industrial reliability and innovation.",
      imageUrl: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704906/objective-vision_iiupsi.jpg"
    },
    {
      year: "2015",
      title: "Scaling Up",
      text: "Integrated conveyor systems and advanced process equipment into our expanding portfolio.",
      imageUrl: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704902/about-bg_fd30xb.jpg"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      text: "Implemented IoT solutions and predictive maintenance technologies across our equipment lines.",
      imageUrl: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704906/global_o81oeo.jpg"
    },
    {
      year: "2025",
      title: "Future‑Forward",
      text: "AI-assisted maintenance protocols and sustainable manufacturing practices leading the industry.",
      imageUrl: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757708557/future_dhegks.png"
    },
  ];


  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-amber-50">
      <Container>
        <SectionTitle 
          title="Legacy" 
          subtitle="Milestones that shaped our commitment to industrial excellence"
        />
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-[minmax(280px,320px)] gap-8 pb-2 md:grid-cols-4 md:grid-flow-row">
            {milestones.map((milestone, index) => (
              <FadeUp 
                key={index} 
                delay={index * 0.1}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-stone-100 group"
              >
                <div className="aspect-[4/3] bg-stone-100 rounded-t-2xl overflow-hidden">
                  <OptimizedImage
                    src={milestone.imageUrl}
                    alt={`${milestone.title} - ${milestone.year}`}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-amber-600 font-medium">
                    {milestone.year}
                  </div>
                  <h3 className="mt-2 text-xl font-light text-stone-900 group-hover:text-amber-700 transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-stone-600 font-light leading-relaxed">
                    {milestone.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};


// ---------- Leadership Section with corrected content and business owner name
const Leadership = () => (
  <section className="py-24 bg-gradient-to-br from-stone-800 to-amber-900">
    <Container>
      <FadeUp>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-700 shadow-2xl">
              <OptimizedImage
                src="https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704910/Leadership_y9veu1.jpg"
                alt="Leadership team reviewing industrial equipment blueprints"
                className="w-full h-full object-cover"
              />
            </div>
          </div>


          <div className="lg:col-span-5 text-white">
            <div className="text-xs uppercase tracking-widest text-amber-300 mb-3">
              Leadership Philosophy
            </div>
            <h3 className="text-3xl md:text-4xl font-extralight tracking-tight text-stone-100 mb-6">
              "Excellence begins with understanding our clients' vision."
            </h3>
            <p className="text-stone-200 font-light leading-relaxed text-lg mb-6">
              Our leadership team believes that exceptional engineering solutions start with deep client partnerships. 
              By personally engaging with every project from conception to completion, we ensure that our innovative 
              approach aligns perfectly with real-world industrial needs.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-px bg-amber-400"></div>
              <div className="text-amber-300 text-sm font-medium tracking-wide">
                Paresh Dwivedi, Founder & CEO
              </div>
            </div>
            <p className="text-stone-300 font-light italic text-base">
              "Our commitment goes beyond manufacturing equipment – we engineer lasting partnerships that drive industrial transformation."
            </p>
          </div>
        </div>
      </FadeUp>
    </Container>
  </section>
);


// ---------- Mission Section with proper content
const MissionSection = () => (
  <section className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-stone-800" />
    
    {/* Animated Elements */}
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 right-1/4 w-3 h-3 border border-amber-300/50 rounded-full"></div>
    </div>


    <Container className="relative z-10">
      <FadeUp className="text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-sm text-amber-300 font-medium tracking-[0.2em] uppercase">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Engineering Tomorrow's
            <br />
            <span className="text-amber-300">Industrial Solutions</span>
          </h2>
          <div className="w-24 h-px bg-amber-400 mx-auto"></div>
          <p className="text-xl text-stone-200 font-light leading-relaxed max-w-3xl mx-auto">
            We don't just manufacture equipment – we engineer partnerships that transform industries. 
            Every project reflects our unwavering commitment to precision, reliability, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-24 mt-16">
            {[
              { number: "Trusted by", label: "Fortune 500 Clients" },
              { number: "24/7", label: "Technical Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl md:text-3xl font-light text-amber-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-stone-300 text-sm font-light tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </Container>
  </section>
);


// ---------- Values Section with improved icons and content
const Values = () => {
  const coreValues = [
    {
      title: "Engineering Excellence",
      text: "Precision design and development of equipment to exact specifications, ensuring optimal performance and reliability.",
      icon: "⚙️"
    },
    {
      title: "Continuous Innovation",
      text: "Embracing cutting-edge technologies and methodologies to deliver next-generation industrial solutions.",
      icon: "🚀"
    },
    {
      title: "Quality Assurance",
      text: "Rigorous testing and quality control at every stage, from initial design to final commissioning.",
      icon: "✅"
    },
    {
      title: "Partnership Focus",
      text: "Building long-term relationships through transparency, reliability, and comprehensive support services.",
      icon: "🤝"
    },
  ];


  return (
    <section className="py-24 bg-stone-50">
      <Container>
        <SectionTitle 
          title="Core Values" 
          subtitle="The principles that guide every decision and drive our commitment to excellence"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {coreValues.map((value, index) => (
            <FadeUp key={index} delay={index * 0.05} className="group">
              <div className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-500 border border-stone-200 hover:border-amber-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-125 transition-transform duration-300 flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};


// ---------- Call to Action Section
const CallToAction = () => (
  <section className="relative h-80 flex items-center justify-center">
    {/* Background Image - covers full area */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704909/ready_image_mjznuh.jpg')" }}
    />
    
    {/* Overlay - on top of image but behind content */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 to-stone-900/90" />
    
    {/* Content - on top of everything */}
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
          Ready to Transform Your Industrial Operations?
        </h2>
        <p className="text-xl text-stone-200 font-light mb-8 max-w-2xl mx-auto">
          Partner with us to engineer solutions that drive efficiency, reliability, and growth.
        </p>
        
      </FadeUp>
    </div>
  </section>
);


// ---------- Main Component with proper error boundary - Updated order
const About = () => {
  return (
    <div className="page-transition" role="main">
      <AboutHero />
      <Overview />
      <Legacy />
      <Leadership />
      <MissionSection />
      <Values />
      <CallToAction />
    </div>
  );
};


export default About;