import React from 'react';

type GradientBarProps = {
  count: number;
  maxCount: number;
};

const ProductionBar: React.FC<GradientBarProps> = ({ count, maxCount }) => {
  const validCount = Math.min(count, Math.max(0, maxCount));

  const fillPercentage = (validCount / maxCount) * 100;

  return (
    <div
      className=' bg-white rounded overflow-hidden transition-all'
      style={{ width: '300px', height: '40px' }}>
      <div
        className='h-full'
        style={{
          transition: 'all 1s',
          height: '10px',
          width: `${fillPercentage}%`,
          background: 'linear-gradient(to right, #d60000, #03d203)'
        }}></div>
      <div className='flex justify-between mx-2'>
        <div className='text-center text-xs'>{fillPercentage.toFixed(0)}%</div>
        <div>
          <p className='text-center text-xs whitespace-nowrap'>
            Production pre minute {count * 8}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductionBar;
