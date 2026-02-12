import React from 'react';
import { ExternalLink } from 'lucide-react';

const EnhancedBirdLink = () => {
  return (
    <div className="mt-6 flex mt-6">
      <a
        href="https://ebird.org/submit"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
        style={{
          color: '#2563eb',
          textDecoration: 'none',
          border: '1px solid #bfdbfe',
          maxWidth: '400px'
        }}
      >
        <div className="flex-1">
          <span 
            style={{
              fontWeight: '500',
              fontSize: '16px',
              display: 'block'
            }}
          >
            Help us track the skies
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#4b5563',
              display: 'block'
            }}
          >
            Submit your bird sightings today
          </span>
        </div>
        <ExternalLink 
          size={20} 
          className="text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
        />
      </a>
    </div>
  );
};

export default EnhancedBirdLink;