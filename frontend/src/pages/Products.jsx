import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Silo Feeding and Extraction System", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704912/Silo-Feeding-System_ryuwg3.jpg", category: "Cement Plant Equipment", description: "Advanced automated systems for efficient silo feeding and material extraction operations" },
    { id: 2, name: "Screw Conveyor", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704912/screw_lcaumj.jpg", category: "Material Handling", description: "Efficient material transport systems for bulk material handling in industrial applications" },
    { id: 3, name: "Bucket Elevator", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704903/bucket-elevator_baazpt.jpg", category: "Vertical Transport", description: "Reliable vertical material handling solutions for various industrial applications" },
    { id: 4, name: "Conveyor Accessories", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704907/conveyor-accessories_fh8tlj.jpg", category: "Components", description: "Complete range of conveyor components including idlers, pulleys, and belt accessories" },
    { id: 5, name: "Air Pollution Control (APC)", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704903/air-pollution-controller_w0phwr.jpg", category: "Environmental", description: "Comprehensive air pollution control systems for industrial emission management" },
    { id: 6, name: "Rotary Kilns & Dryer", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704907/Kiln_wjwkh5.jpg", category: "Processing Equipment", description: "High-temperature processing equipment for cement and industrial applications" },
    { id: 7, name: "Waste Recycling & Incineration", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704911/Recycling_zdtntj.jpg", category: "Environmental", description: "Advanced waste management and recycling systems for sustainable operations" },
    { id: 8, name: "Pulse Jet Bag House", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704909/Pulse-jet_xp3t2q.jpg", category: "Air Filtration", description: "High-efficiency dust collection systems with pulse jet cleaning technology" },
    { id: 9, name: "Dust Collection System", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704906/Dust-collection_tqweff.jpg", category: "Air Filtration", description: "Comprehensive dust collection solutions for cleaner industrial environments" },
    { id: 10, name: "Industrial Fans", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704908/Industrial_fans_m752xi.jpg", category: "Ventilation", description: "Complete range of industrial fans including ID, FD, centrifugal, and specialized fans" },
    { id: 11, name: "Water Pollution Control Equipment", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704914/water_pollution_kiuzic.jpg", category: "Environmental", description: "Advanced water treatment and pollution control systems for industrial applications" },
    { id: 12, name: "Belt Conveyors", image: "https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704903/belt_conveyors_xlzauw.jpg", category: "Material Handling", description: "Robust belt conveyor systems for efficient material transportation" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[80vh] bg-slate-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-amber-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatDelay: 8
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 border border-amber-500/30 rotate-45"
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-amber-500/10 rounded-full"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-slate-600/50 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center space-y-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Company Stats */}
              <div className="flex justify-center items-center space-x-8 mb-16">
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-extralight text-amber-500 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  >
                    12+
                  </motion.div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">Products</div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-extralight text-amber-500 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  >
                    16+
                  </motion.div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-extralight text-amber-500 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.4 }}
                  >
                    99.9%
                  </motion.div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">Precision</div>
                </div>  
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-xs text-amber-500 uppercase tracking-[0.3em] font-medium"
                >
                Engineering Excellence
                </motion.div>
                
                <motion.h1
                  className="text-4xl md:text-7xl lg:text-8xl font-extralight text-white leading-none tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1 }}
                >
                  CEMENT PLANT
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    SOLUTIONS
                  </span>
                </motion.h1>
              </div>

              {/* Company Description */}
              <motion.div
                className="max-w-3xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  Leading Designer, Manufacturer and Supplier of Cement Plants & Bulk Material Handling Equipments. 
                  Over 16 years of expertise in Turnkey Projects, Design Consulting and Equipment Manufacturing for industries worldwide.
                </p>
              </motion.div>

              {/* Interactive CTA */}
              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <motion.button
                  className="group relative px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 uppercase text-sm tracking-widest font-light overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-slate-900">
                    Explore Our Solutions
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-amber-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-amber-500 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Products Cards */}
      <motion.section
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {products.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Product Image */}
                <div className={`${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <motion.div
                    className="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl overflow-hidden shadow-xl border border-slate-600 cursor-pointer relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-600">
                          <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div className="text-xs text-gray-500 font-light uppercase tracking-widest">Click for Details</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className={`space-y-6 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="space-y-2">
                    <p className="text-xs text-amber-500 uppercase tracking-widest font-medium">{product.category}</p>
                    <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">{product.name}</h2>
                  </div>
                  
                  <p className="text-gray-300 text-lg font-light leading-relaxed">{product.description}</p>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProductClick(product.id)}
                      className="bg-amber-600 text-white px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-amber-700 transition-colors duration-300 shadow-lg"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* More Products Grid */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Complete Solutions Range</h2>
            <div className="w-16 h-[1px] bg-amber-500 mx-auto"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.slice(3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-700 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                      <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="text-xs text-amber-500 uppercase tracking-widest mb-2 font-medium">{product.category}</p>
                    <h3 className="text-lg font-light text-white leading-snug mb-3">{product.name}</h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
            "Quick and direct solution to your problems"
          </h2>
          <p className="text-gray-300 font-light mb-10 text-lg">
            Ready to transform your cement plant operations with our precision-engineered solutions? 
            Contact Paresh Enterprise for turnkey projects and equipment manufacturing.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact')}
            className="bg-amber-600 text-white px-10 py-4 text-sm font-light tracking-wider uppercase hover:bg-amber-700 transition-colors duration-300 shadow-lg"
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}