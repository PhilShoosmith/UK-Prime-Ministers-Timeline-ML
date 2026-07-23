
import React from 'react';

interface HouseIconProps {
  house: string;
  className?: string;
}

const housePeriodMap: { [key: string]: string } = {
    'Normandy': 'Norman & Plantagenet',
    'Blois': 'Norman & Plantagenet',
    'Plantagenet': 'Norman & Plantagenet',
    'Lancaster': 'Norman & Plantagenet',
    'York': 'Norman & Plantagenet',
    'Tudor': 'Tudor',
    'Stuart': 'Stuart',
    'Hanover': 'Hanover & Windsor',
    'Saxe-Coburg and Gotha': 'Hanover & Windsor',
    'Windsor': 'Hanover & Windsor',
};

const HouseIcon: React.FC<HouseIconProps> = ({ house, className }) => {
  const period = housePeriodMap[house] || 'default';

  let icon;

  switch (period) {
    case 'Norman & Plantagenet':
      icon = ( // Lion
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Lion Icon">
          <path d="M21.5,4.2c-0.3-1.2-1-2.2-2-2.9c-0.4-0.3-0.8-0.5-1.3-0.6C16.5,0.3,14,1.4,14,1.4l-1.6,1.4L11.7,2C9.4,1.1,5.9,2.4,5.9,2.4 C4.1,2.8,3,3.9,2.3,5.5C1.6,7.2,2.1,9,2.1,9l0.6,1.6l-1.3,1c-1,0.8-1.1,2.4-0.1,3.2c1,0.8,2.4,0.6,3.2-0.1l1-0.8l1.1,0.2 c1.2,0.2,2.8,0.1,4-0.1l1.5-0.3l1.5-0.3c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1l1,0.1c1.2,0.1,2.3-0.4,3.1-1.2 c0.8-0.9,1.1-2,0.9-3.1l-0.2-1.3l1-1C22.1,6.5,22,4.9,21.5,4.2z M10.1,13.1c-0.8,0.8-2.1,0.8-2.8,0c-0.8-0.8-0.8-2.1,0-2.8 c0.8-0.8,2.1-0.8,2.8,0C10.9,11.1,10.9,12.3,10.1,13.1z"/>
        </svg>
      );
      break;
    case 'Tudor':
      icon = ( // Tudor Rose
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Tudor Rose Icon">
          <path d="M12 1.1c2.2 0 4.1 1.3 5 3.2-1.5-1.1-3.4-1.8-5.5-1.8-2.1 0-3.9.7-5.5 1.8 1-1.9 2.9-3.2 5-3.2zM5.3 6.2C3.4 7.2 2.1 9 1.5 11.2c1.7-0.4 3.3-1.4 4.5-2.9-0.3-.7-0.6-1.4-0.7-2.1zM12 5.3c-1.8 0-3.5.8-4.7 2.1s-1.9 3-1.9 4.7c0 1.8.8 3.5 2.1 4.7s3 1.9 4.7 1.9 3.5-.8 4.7-2.1 1.9-3 1.9-4.7c0-1.8-.8-3.5-2.1-4.7-1.1-1.3-2.8-2.1-4.5-2.1zM18.7 6.2c-0.1.7-0.4 1.4-0.7 2.1 1.2 1.5 2.8 2.5 4.5 2.9-0.6-2.2-1.9-4-3.8-5zM6.8 17.5c-1.2-1.5-1.9-3.3-1.9-5.3 0-.4 0-.8.1-1.1 1.7.9 3.2 2.4 4.1 4.3-.9.9-2 1.6-3.3 2.1zM12 22.9c-2.2 0-4.1-1.3-5-3.2 1.5 1.1 3.4 1.8 5.5 1.8 2.1 0 3.9.7 5.5-1.8-1 1.9-2.9 3.2-5 3.2zM17.2 17.5c-1.3-.5-2.4-1.2-3.3-2.1.9-1.9 2.4-3.4 4.1-4.3 0 .4.1.8.1 1.1 0 2-0.7 3.8-1.9 5.3z"/>
        </svg>
      );
      break;
    case 'Stuart':
    case 'Hanover & Windsor':
      icon = ( // Crown
        <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Crown Icon">
          <path d="M139.1,128.3,128,141.4,140.9,153a93.3,93.3,0,0,1,28.2,28.2l-11.9,13.2,13.1,11.1,11.9-13.2a93.3,93.3,0,0,1,28.2,28.2l-11.9,13.2,13.1,11.1,11.9-13.2A93.2,93.2,0,0,1,284,233.9l11.9,13.2,13.1-11.1-11.9-13.2a93.2,93.2,0,0,1,28.2-28.2l11.9,13.2,13.1-11.1L340.9,153a93.3,93.3,0,0,1,28.2-28.2L384,141.4,372.9,128.3a93.3,93.3,0,0,1-28.2,28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.3,93.3,0,0,1-28.2,28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.2,93.2,0,0,1-56.4,0l11.9-13.2-13.1-11.1,11.9,13.2a93.2,93.2,0,0,1-28.2-28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.3,93.3,0,0,1-28.2-28.2Z"/>
          <path d="M432,208,312.3,242.1,256,192,200.7,241.1,80,208,48,352H464Z"/>
        </svg>
      );
      break;
    default:
      icon = null;
  }

  return icon;
};

export default HouseIcon;
