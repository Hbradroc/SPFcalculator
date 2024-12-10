import React from 'react';
import { Copyright } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pb-8 text-center">
      <div className="flex items-center justify-center gap-1 text-gray-600">
        <Copyright className="w-4 h-4" />
        <span>{new Date().getFullYear()}</span>
        <a 
          href="mailto:Hbradroc@uwo.ca"
          className="hover:text-indigo-600 transition"
        >
          Hbradroc@uwo.ca
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Developed for HVAC system analysis and optimization
      </p>
    </footer>
  );
}