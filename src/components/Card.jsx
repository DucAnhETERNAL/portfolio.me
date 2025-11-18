import React from 'react';

/**
 * Reusable Card Component
 * @param {node} children - Card content
 * @param {string} className - Additional classes
 * @param {boolean} hover - Enable hover effect
 */
const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`
        bg-dark-800 border border-dark-700 rounded-xl shadow-lg overflow-hidden 
        ${hover ? 'hover:shadow-2xl hover:shadow-primary-900/20 hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Card Image Component
 */
Card.Image = ({ src, alt, className = '', onError, ...props }) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      // Fallback to default image
      e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop';
      if (onError) onError(e);
    }
  };

  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        onError={handleError}
        {...props}
      />
    </div>
  );
};

/**
 * Card Header Component
 */
Card.Header = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Card Body Component
 */
Card.Body = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

/**
 * Card Footer Component
 */
Card.Footer = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 flex items-center gap-3 ${className}`}>
    {children}
  </div>
);

export default Card;

