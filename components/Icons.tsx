
import React from 'react';

export const DumbbellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.25 9.75H18.5V5.5H16.25V9.75H7.75V5.5H5.5V9.75H2.75C2.09 9.75 1.5 10.34 1.5 11V13C1.5 13.66 2.09 14.25 2.75 14.25H5.5V18.5H7.75V14.25H16.25V18.5H18.5V14.25H21.25C21.91 14.25 22.5 13.66 22.5 13V11C22.5 10.34 21.91 9.75 21.25 9.75Z" />
    </svg>
);

export const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-12a2.25 2.25 0 0 1-2.25-2.25V3M3.75 21v-6.125A2.25 2.25 0 0 1 6 12.625h12A2.25 2.25 0 0 1 20.25 14.875V21M3.75 21h16.5M12 18v3m-3-3v3m6-3v3" />
  </svg>
);


export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);
