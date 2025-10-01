import { useEffect, useState } from "react";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import lifestyle5 from "@/assets/lifestyle-5.jpg";
import lifestyle6 from "@/assets/lifestyle-6.jpg";
import lifestyle7 from "@/assets/lifestyle-7.jpg";
import lifestyle8 from "@/assets/lifestyle-8.jpg";

const TuffLifestyle = () => {
  const [rotation, setRotation] = useState(0);

  const lifestyleImages = [
    { src: lifestyle1, alt: "Tuff Lifestyle 1" },
    { src: lifestyle2, alt: "Tuff Lifestyle 2" },
    { src: lifestyle3, alt: "Tuff Lifestyle 3" },
    { src: lifestyle4, alt: "Tuff Lifestyle 4" },
    { src: lifestyle5, alt: "Tuff Lifestyle 5" },
    { src: lifestyle6, alt: "Tuff Lifestyle 6" },
    { src: lifestyle7, alt: "Tuff Lifestyle 7" },
    { src: lifestyle8, alt: "Tuff Lifestyle 8" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360); // Faster rotation
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const radius = 450;
  const angleStep = 360 / lifestyleImages.length;

  return (
    <section 
      className="py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--muted) / 0.3) 0%, hsl(var(--muted) / 0.6) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Tuff Lifestyle</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our community rocks Too Tuff
          </p>
        </div>

        <div 
          className="relative h-[700px] flex items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 45%",
          }}
        >
          {/* Base shadow */}
          <div className="absolute bottom-8 w-96 h-8 bg-black/10 blur-2xl rounded-full" />
          
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(10deg) rotateY(${rotation}deg)`,
              transition: "transform 0.03s linear",
            }}
          >
            {lifestyleImages.map((image, index) => {
              const angle = angleStep * index;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const z = Math.cos((angle * Math.PI) / 180) * radius;
              
              // Calculate distance from camera for depth of field effect
              const distanceFromFront = (z + radius) / (radius * 2);
              const blur = Math.abs(0.5 - distanceFromFront) * 3;
              const brightness = 0.7 + (distanceFromFront * 0.3);
              const scale = 0.95 + (distanceFromFront * 0.05);

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg) scale(${scale})`,
                    transformStyle: "preserve-3d",
                    zIndex: Math.round(z),
                  }}
                >
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      width: "280px",
                      height: "360px",
                      boxShadow: `
                        0 20px 60px rgba(0, 0, 0, 0.3),
                        0 0 1px rgba(255, 255, 255, 0.2) inset,
                        ${x > 0 ? '10px' : '-10px'} 0 20px rgba(255, 255, 255, 0.05) inset
                      `,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{
                        filter: `brightness(${brightness}) contrast(1.15) blur(${blur}px)`,
                      }}
                    />
                    {/* Glossy overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.15) 0%, 
                          rgba(255, 255, 255, 0) 50%, 
                          rgba(0, 0, 0, 0.1) 100%)`,
                      }}
                    />
                    {/* Rim light */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: x > 0 
                          ? 'inset -2px 0 20px rgba(255, 255, 255, 0.3)' 
                          : 'inset 2px 0 20px rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuffLifestyle;
