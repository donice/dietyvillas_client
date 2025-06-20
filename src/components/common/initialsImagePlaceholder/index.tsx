import React from 'react';

interface InitialsImagePlaceholderProps {
  text: string;
  40?: number;
}

const InitialsImagePlaceholder: React.FC<InitialsImagePlaceholderProps> = ({ text }) => {
  const rainbowColors = [
    '#FF0000',
    '#FF7F00',
    '#696917',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#9400D3',
  ];

  const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];

  const initials = text
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className='w-10 h-10 p-4 rounded-full flex items-center justify-center text-white font-bold'
      style={{
        backgroundColor: randomColor,
        fontSize: 40 * 0.4,
      }}
    >
      {initials}
    </div>
  );
};

export default InitialsImagePlaceholder;