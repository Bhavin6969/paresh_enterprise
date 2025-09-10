import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Phone, Mail, Wrench, Settings, Zap } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Updated products database matching products.jsx with images
  const products = [
    { 
      id: 1, 
      name: "Silo Feeding and Extraction System", 
      image: "/Silo-Feeding-System.jpg",
      category: "Cement Plant Equipment", 
      description: "Advanced automated systems for efficient silo feeding and material extraction operations",
      fullDescription: "Our Silo Feeding and Extraction System represents the pinnacle of cement plant automation technology. Engineered for maximum efficiency in material handling, this system features advanced automated controls, precision feeding mechanisms, and reliable extraction processes. Built with decades of engineering expertise and tested in demanding industrial environments for optimal performance, safety, and durability.",
      specifications: [
        "Automated PLC control system with HMI interface",
        "Feeding capacity: 200-2000 tons/hour (customizable)",
        "Extraction system: Pneumatic and mechanical options",
        "Material compatibility: Cement, fly ash, limestone, coal",
        "Operating temperature: -20°C to 150°C",
        "Safety systems: Emergency stops, level indicators, overload protection"
      ],
      applications: ["Cement manufacturing plants", "Ready-mix concrete facilities", "Industrial storage operations", "Bulk material handling facilities"],
      features: ["Real-time monitoring system", "Dust suppression technology", "Energy efficient design", "Modular construction for scalability"],
      benefits: ["Reduced manual intervention", "Consistent material flow", "Improved plant efficiency", "Enhanced safety standards"],
      price: "Contact for pricing"
    },
    { 
      id: 2, 
      name: "Screw Conveyor", 
      image: "/screw.jpg",
      category: "Material Handling", 
      description: "Efficient material transport systems for bulk material handling in industrial applications",
      fullDescription: "High-performance screw conveyors engineered for reliable transportation of bulk materials across diverse industrial applications. Our conveyors feature robust construction, customizable configurations, and precision engineering to ensure optimal throughput while minimizing maintenance requirements and operational costs.",
      specifications: [
        "Length: Customizable from 3-50 meters",
        "Capacity range: 10-500 tons/hour",
        "Screw diameter: 150-800mm available",
        "Material options: Carbon steel, stainless steel, abrasion-resistant steel",
        "Drive system: Electric motor with heavy-duty gearbox",
        "Trough design: U-trough, tubular, or open design"
      ],
      applications: ["Cement plants", "Chemical processing facilities", "Food processing industry", "Mining operations", "Agricultural facilities"],
      features: ["Corrosion-resistant construction", "Variable speed drive options", "Easy maintenance access", "Dust-tight sealing system"],
      benefits: ["Gentle material handling", "Consistent conveying rates", "Low power consumption", "Minimal product degradation"],
      price: "Contact for pricing"
    },
    { 
      id: 3, 
      name: "Bucket Elevator", 
      image: "/bucket-elevator.jpg",
      category: "Vertical Transport", 
      description: "Reliable vertical material handling solutions for various industrial applications",
      fullDescription: "Robust bucket elevators designed for efficient vertical transportation of bulk materials in industrial environments. Available in multiple configurations with customizable bucket designs, drive systems, and discharge arrangements to meet specific operational requirements while ensuring reliable, continuous operation.",
      specifications: [
        "Lifting height: Up to 100 meters",
        "Capacity range: 5-1000 tons/hour",
        "Bucket materials: Steel, plastic, rubber, or stainless steel",
        "Belt/Chain options: Heavy-duty rubber belt or steel chain",
        "Drive system: Electric motor with speed reducer",
        "Discharge types: Continuous, centrifugal, or positive"
      ],
      applications: ["Cement manufacturing", "Grain handling facilities", "Mining operations", "Chemical processing", "Power plants"],
      features: ["Self-tensioning system", "Spillage prevention design", "Safety monitoring systems", "Easy bucket replacement"],
      benefits: ["Space-efficient vertical transport", "Gentle material handling", "High reliability", "Low maintenance requirements"],
      price: "Contact for pricing"
    },
    { 
      id: 4, 
      name: "Conveyor Accessories", 
      image: "/conveyor-accessories.jpg",
      category: "Components", 
      description: "Complete range of conveyor components including idlers, pulleys, and belt accessories",
      fullDescription: "Comprehensive range of high-quality conveyor accessories designed to optimize conveyor system performance and reliability. Our accessories are manufactured to exacting standards and are compatible with various conveyor types, ensuring seamless integration and extended service life.",
      specifications: [
        "Idler types: Carrying, return, impact, training, self-aligning",
        "Pulley range: Drive, tail, snub, bend, and take-up pulleys",
        "Belt widths: 400mm to 2400mm compatibility",
        "Materials: Steel, stainless steel, ceramic, rubber lagging",
        "Bearing types: Sealed for life, re-greaseable options",
        "Temperature range: -40°C to 200°C depending on component"
      ],
      applications: ["Mining conveyors", "Industrial belt systems", "Port handling equipment", "Power plant material handling"],
      features: ["Precision manufactured components", "Corrosion resistant coatings", "Extended bearing life", "Easy installation design"],
      benefits: ["Reduced maintenance downtime", "Improved conveyor efficiency", "Extended system life", "Cost-effective operation"],
      price: "Contact for pricing"
    },
    { 
      id: 5, 
      name: "Air Pollution Control (APC)", 
      image: "/air-pollution-controller.jpg",
      category: "Environmental", 
      description: "Comprehensive air pollution control systems for industrial emission management",
      fullDescription: "Advanced air pollution control systems engineered to meet stringent environmental standards while maintaining optimal industrial operations. Our APC systems feature cutting-edge filtration technology, automated controls, and robust construction to ensure reliable emission control and regulatory compliance.",
      specifications: [
        "Filtration efficiency: 99.5% for particles >1 micron",
        "Air flow capacity: 1,000-100,000 CFM",
        "Operating temperature: Up to 250°C",
        "Filter types: Bag filters, cartridge, electrostatic precipitator",
        "Control system: PLC with remote monitoring capability",
        "Emission compliance: Meets EPA and local standards"
      ],
      applications: ["Cement plants", "Steel mills", "Power generation facilities", "Chemical processing plants", "Waste incineration"],
      features: ["Automated cleaning systems", "Real-time emission monitoring", "Energy recovery options", "Modular design"],
      benefits: ["Environmental compliance", "Reduced operating costs", "Improved air quality", "Reliable operation"],
      price: "Contact for pricing"
    },
    { 
      id: 6, 
      name: "Rotary Kilns & Dryer", 
      image: "/Kiln.jpg",
      category: "Processing Equipment", 
      description: "High-temperature processing equipment for cement and industrial applications",
      fullDescription: "High-efficiency rotary kilns and dryers engineered for demanding industrial processing applications. Our equipment features advanced refractory lining, precision temperature control, and robust mechanical design to ensure consistent product quality and reliable operation in high-temperature environments.",
      specifications: [
        "Kiln diameter: 2-6 meters (customizable)",
        "Length: Up to 200 meters",
        "Operating temperature: Up to 1800°C",
        "Capacity: 50-10,000 tons/day",
        "Drive system: Variable speed with load monitoring",
        "Refractory lining: High alumina, magnesia, or specialized refractories"
      ],
      applications: ["Cement clinker production", "Lime calcination", "Iron ore pelletizing", "Chemical processing", "Waste treatment"],
      features: ["Advanced process control", "Energy efficient design", "Predictive maintenance systems", "Flexible fuel options"],
      benefits: ["Consistent product quality", "Reduced fuel consumption", "Extended refractory life", "High availability"],
      price: "Contact for pricing"
    },
    { 
      id: 7, 
      name: "Waste Recycling & Incineration", 
      image: "/Recycling.jpg",
      category: "Environmental", 
      description: "Advanced waste management and recycling systems for sustainable operations",
      fullDescription: "Comprehensive waste recycling and incineration systems designed for sustainable waste management and energy recovery. Our systems incorporate advanced emission control, energy recovery technology, and automated operations to maximize resource recovery while minimizing environmental impact.",
      specifications: [
        "Processing capacity: 1-50 tons/hour",
        "Operating temperature: 850-1100°C",
        "Energy recovery: Steam generation and electricity",
        "Waste types: Municipal, industrial, hazardous waste compatible",
        "Emission control: Advanced scrubbing and filtration",
        "Automation level: Fully automated with remote monitoring"
      ],
      applications: ["Municipal waste management", "Industrial waste processing", "Hazardous waste treatment", "Energy recovery facilities"],
      features: ["Advanced emission control", "Energy recovery systems", "Automated ash handling", "Real-time monitoring"],
      benefits: ["Volume reduction up to 90%", "Energy generation", "Environmental compliance", "Sustainable waste management"],
      price: "Contact for pricing"
    },
    { 
      id: 8, 
      name: "Pulse Jet Bag House", 
      image: "/Pulse-jet.jpg",
      category: "Air Filtration", 
      description: "High-efficiency dust collection systems with pulse jet cleaning technology",
      fullDescription: "State-of-the-art pulse jet bag house systems engineered for superior dust collection performance in demanding industrial environments. Features advanced pulse jet cleaning technology, high-efficiency filter media, and robust construction for reliable operation and extended service life.",
      specifications: [
        "Filtration area: 100-10,000 m²",
        "Air flow capacity: 1,000-50,000 m³/hr",
        "Filtration efficiency: 99.9% for particles >0.3 microns",
        "Operating temperature: Up to 260°C",
        "Compressed air requirement: 6-8 bar",
        "Filter media: PTFE membrane, polyester, or specialty fabrics"
      ],
      applications: ["Cement plants", "Steel mills", "Power plants", "Mining operations", "Chemical processing"],
      features: ["Pulse jet cleaning system", "Automatic bag monitoring", "Corrosion resistant construction", "Energy efficient design"],
      benefits: ["Low pressure drop", "Extended filter life", "Reduced maintenance", "Excellent dust collection efficiency"],
      price: "Contact for pricing"
    },
    { 
      id: 9, 
      name: "Dust Collection System", 
      image: "/Dust-collection.jpg",
      category: "Air Filtration", 
      description: "Comprehensive dust collection solutions for cleaner industrial environments",
      fullDescription: "Comprehensive dust collection systems designed to maintain clean, safe working environments in industrial facilities. Our systems combine advanced filtration technology with intelligent controls to provide reliable dust capture and collection while minimizing energy consumption and maintenance requirements.",
      specifications: [
        "Collection efficiency: 95-99.9% depending on application",
        "Air volume: 500-75,000 CFM",
        "Filter types: Cartridge, bag, or cyclone separators",
        "Control system: Manual or automated with PLC",
        "Housing materials: Carbon steel or stainless steel",
        "Discharge options: Rotary valve, screw conveyor, or bin"
      ],
      applications: ["Woodworking facilities", "Metalworking shops", "Food processing plants", "Pharmaceutical manufacturing", "General manufacturing"],
      features: ["Multiple filter options", "Compact footprint design", "Easy filter maintenance", "Variable speed drives"],
      benefits: ["Improved air quality", "Worker safety enhancement", "Regulatory compliance", "Reduced cleanup costs"],
      price: "Contact for pricing"
    },
    { 
      id: 10, 
      name: "Industrial Fans", 
      image: "/Industrial_fans.jpg",
      category: "Ventilation", 
      description: "Complete range of industrial fans including ID, FD, centrifugal, and specialized fans",
      fullDescription: "Comprehensive range of industrial fans engineered for diverse ventilation and material handling applications. Our fans feature advanced aerodynamic design, robust construction, and precision balancing to deliver optimal performance, energy efficiency, and reliable operation in demanding industrial environments.",
      specifications: [
        "Fan types: Centrifugal, axial, mixed flow, high-temperature",
        "Air flow: 100-500,000 CFM capacity range",
        "Pressure capability: Up to 2000 mmWC",
        "Temperature rating: Up to 800°C for high-temp applications",
        "Construction: Carbon steel, stainless steel, or special alloys",
        "Drive options: Direct drive, belt drive, or flexible coupling"
      ],
      applications: ["Power plants", "Cement plants", "HVAC systems", "Industrial ventilation", "Pollution control systems"],
      features: ["Advanced impeller design", "Dynamic balancing", "Vibration monitoring", "Variable speed capability"],
      benefits: ["High efficiency operation", "Low noise levels", "Extended bearing life", "Reduced energy consumption"],
      price: "Contact for pricing"
    },
    { 
      id: 11, 
      name: "Water Pollution Control Equipment", 
      image: "/water_pollution.jpg",
      category: "Environmental", 
      description: "Advanced water treatment and pollution control systems for industrial applications",
      fullDescription: "Advanced water pollution control equipment designed to treat industrial wastewater and ensure compliance with environmental regulations. Our systems incorporate cutting-edge treatment technologies, automated controls, and monitoring systems to deliver reliable water treatment performance.",
      specifications: [
        "Treatment capacity: 10-10,000 m³/day",
        "Treatment processes: Physical, chemical, biological",
        "Removal efficiency: >95% for targeted contaminants",
        "Automation level: Fully automated with SCADA",
        "Materials: Corrosion resistant construction",
        "Discharge standards: Meets industrial and municipal standards"
      ],
      applications: ["Chemical processing plants", "Textile industries", "Food processing facilities", "Pharmaceutical manufacturing", "Metal finishing operations"],
      features: ["Multi-stage treatment process", "Automated chemical dosing", "Real-time water quality monitoring", "Sludge handling systems"],
      benefits: ["Regulatory compliance", "Water reuse capability", "Reduced treatment costs", "Environmental protection"],
      price: "Contact for pricing"
    },
    { 
      id: 12, 
      name: "Belt Conveyors", 
      image: "/belt_conveyors.jpg",
      category: "Material Handling", 
      description: "Robust belt conveyor systems for efficient material transportation",
      fullDescription: "Heavy-duty belt conveyor systems engineered for reliable material transportation in demanding industrial applications. Our conveyors feature robust construction, advanced belt tracking systems, and customizable configurations to handle various materials while ensuring maximum uptime and operational efficiency.",
      specifications: [
        "Belt width: 300-2400mm standard sizes",
        "Conveyor length: Up to 10km single flight",
        "Capacity: 100-15,000 tons/hour",
        "Belt speed: 0.5-8.0 m/s (variable)",
        "Materials: Steel structure with various belt types",
        "Inclination: Up to 30° depending on material"
      ],
      applications: ["Mining operations", "Port facilities", "Power plants", "Cement plants", "Steel mills"],
      features: ["Advanced belt tracking", "Energy efficient drives", "Automated safety systems", "Weather protection options"],
      benefits: ["High capacity transport", "Long distance capability", "Low operating costs", "Minimal maintenance"],
      price: "Contact for pricing"
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Product not found</h1>
          <button 
            onClick={() => navigate('/products')}
            className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 py-8 border-b border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-amber-500 hover:text-amber-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <span className="text-xs text-amber-500 uppercase tracking-widest mb-2 md:mb-0">{product.category}</span>
            <div className="hidden md:block w-1 h-1 bg-amber-500 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-light text-white">{product.name}</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl overflow-hidden shadow-2xl border border-slate-600">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-light text-white mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-amber-500" />
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {product.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-light text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-3 text-amber-500" />
                Key Features
              </h3>
              <div className="grid sm:grid-cols-1 gap-3">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-light text-white mb-4">Benefits</h3>
              <div className="grid sm:grid-cols-1 gap-3">
                {product.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-light text-white mb-8 text-center">Technical Specifications</h3>
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-light text-white mb-8 text-center">Applications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {product.applications.map((app, index) => (
              <span
                key={index}
                className="bg-slate-800 text-gray-300 px-6 py-3 rounded-full text-sm border border-slate-700 hover:border-amber-500 transition-colors"
              >
                {app}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 text-center">
            <h3 className="text-2xl font-light text-white mb-4">Request Quote</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Interested in this product? Contact us for detailed specifications, customization options, and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Get Quote Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center space-x-2 bg-slate-700 text-white px-8 py-4 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email Inquiry</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-amber-500 uppercase tracking-wider">{relatedProduct.category}</span>
                    <h4 className="text-white font-light mb-2 mt-1">{relatedProduct.name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{relatedProduct.description}</p>
                    <div className="mt-4">
                      <span className="text-amber-500 text-sm hover:text-amber-400 transition-colors">
                        View Details →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}