import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartProject = () => {
    navigate('/contact');
  };

  const handleExploreServices = () => {
    navigate('/products');
  };

  return (
    <div className="w-full bg-stone-50">
      {/* Professional Hero Section */}
      <section
        className={`relative min-h-screen bg-gradient-to-br from-stone-900 via-zinc-800 to-neutral-900 overflow-hidden flex items-center justify-center transition-opacity duration-1000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0">
          {/* Professional Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Elegant Accent Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-500/15 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Refined Main Headline */}
          <div
            className={`space-y-8 mb-16 transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-stone-100 leading-tight tracking-tight">
              Professional
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-normal">
                Services
              </span>
            </h1>
            <div className="text-lg md:text-xl text-stone-300 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              Engineering Excellence Through Innovation and Precision Manufacturing
            </div>
          </div>

          {/* Business Metrics - Fixed with proper spacing */}
          <div
            className={`flex justify-center items-center gap-16 max-w-3xl mx-auto mb-16 transition-all duration-800 delay-600 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {[
              { value: '12+', label: 'Products' },
              { value: '99.9%', label: 'Client Satisfaction' }
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-stone-600/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-amber-500/30"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-2xl font-light text-amber-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-stone-400 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Professional CTA - Navigate to Products */}
          <div
            className={`transition-all duration-800 delay-900 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button 
              onClick={handleExploreServices}
              className="group relative px-8 py-3 bg-transparent border border-stone-400/40 text-stone-300 text-sm tracking-[0.1em] font-medium overflow-hidden backdrop-blur-sm hover:border-amber-500 transition-all duration-300"
            >
              <span className="relative z-10 transition-colors duration-400 group-hover:text-white">
                Explore Our Services
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Professional Values Banner */}
          <div className="bg-stone-900 rounded-2xl p-8 mb-20">
            <div className="flex justify-center items-center space-x-12">
              {[
                { text: 'PRECISION', icon: '●' },
                { text: 'INNOVATION', icon: '●' },
                { text: 'RELIABILITY', icon: '●' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="text-amber-500 text-xs animate-pulse">{item.icon}</div>
                  <div className="text-xs text-stone-300 tracking-[0.2em] font-medium">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="text-sm text-amber-600 font-medium tracking-[0.2em] mb-4">
              OUR EXPERTISE
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6 tracking-tight">
              Core Services
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto mb-6"></div>
            <p className="text-stone-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Comprehensive manufacturing solutions backed by decades of engineering expertise and cutting-edge technology
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-24">
            {[
              {
                title: "Custom Manufacturing",
                subtitle: "Precision Engineering",
                image: "/manufacturing.jpg",
                desc: "Advanced manufacturing solutions tailored to your specifications. Our state-of-the-art facilities and experienced team ensure every component meets the highest quality standards with precise tolerances and superior finish.",
                features: ["CNC Machining", "Quality Assurance", "Custom Tooling", "Rapid Prototyping"],
                highlight: "Industry Leading Precision"
              },
              {
                title: "Quality Control",
                subtitle: "Standards Excellence",
                image: "/quality.jpg",
                desc: "Comprehensive quality management systems ensure consistent excellence across all production phases. From material inspection to final testing, every step is monitored and verified against industry standards.",
                features: ["ISO Certification", "Material Testing", "Process Validation", "Documentation"],
                highlight: "ISO 9001:2015 Certified"
              },
              {
                title: "SCADA Installation Services",
                subtitle: "Industrial Automation",
                image: "/supply.jpg",
                desc: "Specialized SCADA (Supervisory Control and Data Acquisition) installation and support services for diverse industrial sectors. Our expert team provides comprehensive automation solutions tailored to your industry requirements.",
                features: ["Cement Plants", "Textile Industries", "Packaging Industry", "Pharmaceutical Companies", "Government Departments", "Water Resources & Irrigation"],
                highlight: "Multi-Industry Expertise",
                industries: [
                  "Cement Plants",
                  "Textile Industries", 
                  "Packaging Industry",
                  "Pharmaceutical Companies",
                  "Government Departments (Water Resources, PHED, WRD, Irrigation)"
                ]
              }
            ].map((service, i) => (
              <div
                key={i}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Service Visual */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="group relative aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl overflow-hidden shadow-lg border border-stone-200/50 hover:shadow-xl transition-all duration-500 cursor-pointer">
                    {/* Image Background */}
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback Content */}
                    <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 p-12">
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `linear-gradient(rgba(120, 113, 108, 0.3) 1px, transparent 1px),
                                           linear-gradient(90deg, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <div className="w-12 h-12 bg-white rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                      </div>

                      <div className="absolute top-8 right-8 w-3 h-3 bg-amber-600 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                      <div className="absolute bottom-8 left-8 w-2 h-2 bg-orange-500 rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-150 transition-all duration-500"></div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 flex items-end justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center">
                        <div className="text-white text-lg font-light mb-2">{service.title}</div>
                        <div className="text-amber-300 text-sm tracking-wide">{service.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className={`space-y-6 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-3">
                    <div className="text-sm text-amber-600 font-medium tracking-[0.15em]">
                      {service.subtitle}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-stone-600 text-lg font-light leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Feature List - Special handling for SCADA service */}
                  <div className="pt-4">
                    {service.industries ? (
                      <div className="space-y-4">
                        <h4 className="text-sm text-amber-600 font-medium tracking-[0.1em] mb-3">
                          INDUSTRIES WE SUPPORT:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.industries.map((industry, idx) => (
                            <div key={idx} className="flex items-start space-x-3 group hover:text-amber-600 transition-colors duration-300">
                              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                              <span className="text-sm text-stone-600 font-medium group-hover:text-amber-600 transition-colors duration-300 leading-relaxed">{industry}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 group hover:text-amber-600 transition-colors duration-300">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                            <span className="text-sm text-stone-600 font-medium group-hover:text-amber-600 transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlight Badge */}
                  <div className="pt-6">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-amber-700 font-medium">{service.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="text-sm text-amber-600 font-medium tracking-[0.2em]">
                OUR COMMITMENT
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                Engineering the Future
                <br />
                <span className="text-amber-600">with Precision</span>
              </h2>
              <div className="w-16 h-px bg-amber-600 mx-auto"></div>
            </div>
            
            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
              At Paresh Enterprise, we combine traditional craftsmanship with modern technology to deliver 
              manufacturing solutions that exceed expectations. Our commitment to quality, innovation, and 
              client satisfaction drives everything we do.
            </p>

            <div className="pt-8">
              <button 
                onClick={handleStartProject}
                className="group relative px-10 py-4 bg-amber-600 text-white text-sm tracking-[0.1em] font-medium overflow-hidden hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">
                  Start Your Project
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}