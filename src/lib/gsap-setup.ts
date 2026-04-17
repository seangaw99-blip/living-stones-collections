'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register all plugins once — import this in client components
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Project-wide defaults
gsap.defaults({
  duration: 0.7,
  ease: 'power3.out',
});

export { gsap, ScrollTrigger, SplitText, useGSAP };
