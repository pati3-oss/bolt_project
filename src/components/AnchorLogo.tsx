import React from 'react';

interface AnchorLogoProps {
  size?: number;
  className?: string;
}

export default function AnchorLogo({ size = 48, className = "" }: AnchorLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Anchor body */}
        <path 
          d="M50 15 L50 75" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* Anchor ring */}
        <circle 
          cx="50" 
          cy="25" 
          r="8" 
          stroke="currentColor" 
          strokeWidth="4" 
          fill="none"
        />
        
        {/* Anchor arms */}
        <path 
          d="M30 60 Q30 75 40 75 L50 75 L60 75 Q70 75 70 60" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none"
        />
        
        {/* Brain inside head silhouette */}
        <g transform="translate(35, 10)">
          {/* Head silhouette */}
          <path 
            d="M0 15 Q0 5 10 5 Q20 5 20 10 Q25 10 30 15 L30 25 Q25 30 15 30 Q5 30 0 25 Z" 
            fill="currentColor" 
            opacity="0.3"
          />
          
          {/* Brain pattern */}
          <g opacity="0.8">
            <path 
              d="M8 12 Q12 10 16 12 Q20 10 22 14" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            <path 
              d="M6 16 Q10 14 14 16 Q18 14 22 18" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            <path 
              d="M8 20 Q12 18 16 20 Q20 18 22 22" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
          </g>
        </g>
        
        {/* Crossbar */}
        <path 
          d="M35 45 L65 45" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}