import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const ImageRevealSponsors = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const progressRef = useRef(null);

  const sponsors = [
    {
      name: 'TSN Securitys',
      logo: '/Logo/Sponser_1.jpeg',
      title: 'Security Partner',
      description: 'Leading cybersecurity solutions provider'
    },
    {
      name: 'Fresca',
      logo: '/Logo/Sponser_2.png',
      title: 'Technology Partner',
      description: 'Innovation in tech solutions'
    }
  ];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const images = imageRefs.current.filter(Boolean);
      if (images.length === 0) return;

      // Create timeline for scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * sponsors.length}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.to(progressRef.current, {
                scaleX: self.progress,
                duration: 0.1,
              });
            }
          },
        },
      });

      // Animate each image
      images.forEach((img, index) => {
        if (index === 0) {
          // First image starts visible
          gsap.set(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            filter: "brightness(1)",
          });
        } else {
          // Other images start hidden
          gsap.set(img, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            filter: "brightness(0.5)",
          });
        }

        // Reveal animation
        if (index > 0) {
          tl.to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              filter: "brightness(1)",
              duration: 1,
              ease: "power2.inOut",
            },
            index - 0.5
          );
        }

        // Hide previous image
        if (index < images.length - 1) {
          tl.to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              filter: "brightness(0.5)",
              duration: 1,
              ease: "power2.inOut",
            },
            index + 0.5
          );
        }
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div className="relative w-full bg-black">
      {/* Header */}
      <div className="text-center py-20">
        <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">
          OUR PARTNERS
        </h2>
        <p className="text-gray-400 text-lg">
          Scroll down to reveal our amazing partners
        </p>
      </div>

      {/* Sticky Image Container */}
      <div
        ref={containerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div
            ref={progressRef}
            className="h-full bg-cyan-400 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Images Stack */}
        <div className="relative w-full max-w-4xl h-[80vh] mx-auto px-4">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              style={{ zIndex: sponsors.length - index }}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain p-12"
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {sponsor.name}
                  </h3>
                  <p className="text-cyan-400 text-lg font-semibold mb-1">
                    {sponsor.title}
                  </p>
                  <p className="text-gray-300">
                    {sponsor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40">
          <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-32 bg-black" />
    </div>
  );
};

export default ImageRevealSponsors;
