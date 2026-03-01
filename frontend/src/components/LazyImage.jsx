import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23111" width="100" height="100"/%3E%3C/svg%3E',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;
    
    if (imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setImageLoaded(true);
              };
              img.onerror = () => {
                setImageSrc(placeholder);
                setImageLoaded(true);
              };
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(imgRef.current);
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src);
      setImageLoaded(true);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, placeholder]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${imageLoaded ? 'loaded' : 'loading'}`}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: imageLoaded ? 1 : 0.5,
      }}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
