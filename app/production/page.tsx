'use client';
import { BarChart } from '@/lib/BarChart';
import ExcelReader from '@/lib/ExcelReader';
import { LineChart } from '@/lib/LineChart';
import { NewPlanningItem, usePlanningStore } from '@/store/Production';
import { use, useEffect, useState } from 'react';
import ProductionTable from './ProductionTable';
import StartUp from './Startup';

interface ToolCardProps {
  title: string;
  description: string;
  setAnimation: (e: boolean) => void;
}

// Define the prop types for Chart
interface ChartProps {
  title: string;
  type: 'bar' | 'line';
}

const ProductionPage = () => {
  const [animationSection, setAnimationSection] = useState(false);
  const [view, setView] = useState('');
  const [excelData, setExcelData] = useState<NewPlanningItem[]>([]);

  const secondLoopAnimation = () => {
    setTimeout(() => {
      setAnimationSection(true);
    }, 700);
  };

  const setAnimation = (view: string) => {
    if (animationSection === false) {
      setView(view);
    }
    setAnimationSection(!animationSection);

    setTimeout(() => {
      setView(view);
    }, 500);
    secondLoopAnimation();
  };

  useEffect(() => {
    console.log(excelData);
  }, [excelData]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold underline text-center mb-4'>
        Production Dashboard
      </h1>
      <ExcelReader setDataFrom={(e: any) => setExcelData(e)} />
      <hr className='mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        {/* Placeholder for Tools */}
        <ToolCard
          setAnimation={() => setAnimation('view1')}
          title='Prepare Start Sheet'
          description='Generate the starting conditions for production lines.'
        />
        <ToolCard
          setAnimation={() => setAnimation('view2')}
          title='Planning Manning'
          description='Plan and schedule manpower for each line.'
        />
        <ToolCard
          setAnimation={() => setAnimation('view3')}
          title='Allocation People on Line'
          description='Allocate workers to their respective production lines.'
        />
        <ToolCard
          setAnimation={() => setAnimation('view4')}
          title='New Training'
          description='Initiate training programs for new equipment or procedures.'
        />
        {/* Additional Tools as needed */}
      </div>
      <div
        className={` bg-white min-h-[300px] p-4 rounded-lg shadow  transition-all duration-500 mb-4 overflow-hidden ${
          animationSection === false ? 'min-h-0 h-0 p-0 text-white' : null
        }`}>
        {view === 'view1' && (
          <div>
            <h2 className='text-xl font-semibold mb-3'>
              Start-Up Information{' '}
            </h2>
            <StartUp />
          </div>
        )}

        {view === 'view2' && (
          <div className=''>
            <h2 className='text-xl font-semibold mb-3'>time sheet</h2>
            <div>
              <p>
                This section will display the time sheet for the selected
                production line.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='bg-white min-h-[300px] p-4 rounded-lg shadow  transition-all duration-500 mb-4 overflow-hidden'>
        <h1>Production Schedule</h1>
        <ProductionTable productionData={excelData} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        {/* Efficiency Charts */}
        <Chart
          title='Line Efficiency'
          type='bar'
        />
        <Chart
          title='Timeline Production'
          type='line'
        />
      </div>
      {/* Placeholder for AI Implementation */}
      <div className='bg-gray-100 p-4 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-3'>
          AI Integration (Coming Soon)
        </h2>
        <p>
          This section will integrate AI capabilities to assist with production
          decisions.
        </p>
      </div>
    </div>
  );
};

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  setAnimation
}) => {
  return (
    <button
      className='bg-white p-4 rounded-lg shadow hover:bg-green-600/40 transition-all duration-500 '
      onClick={() => setAnimation(true)}>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p>{description}</p>
    </button>
  );
};

const Chart: React.FC<ChartProps> = ({ title, type }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <div className='h-64'>
        {type === 'bar' ? <BarChart /> : <LineChart />}
      </div>
    </div>
  );
};

export default ProductionPage;
