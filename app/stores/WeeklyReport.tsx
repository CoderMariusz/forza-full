interface ReportItem {
  aCode: string;
  labelCode: string;
  startQuantity: number;
  quantityAfterProduction: number;
  endQuantity: number;
  wasted: number;
}

interface WeeklyReportProps {
  data: ReportItem[];
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ data }) => {
  console.log('data', data);

  return (
    <table className='w-full text-center'>
      <thead className='bg-gray-800 text-white'>
        <tr>
          <th className='py-2'>A-Code</th>
          <th className='py-2'>Label Code</th>
          <th className='py-2'>Start Quantity</th>
          <th className='py-2'>Quantity After Production</th>
          <th className='py-2'>End Quantity</th>
          <th className='py-2'>Difference (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr
              key={index}
              className={`${
                item.quantityAfterProduction < 0
                  ? 'bg-red-600 text-yellow-100'
                  : 'bg-gray-100'
              }`}>
              <td className='py-2'>{item.aCode}</td>
              <td>{item.labelCode}</td>
              <td>{item.startQuantity}</td>
              <td>{item.quantityAfterProduction}</td>
              <td>{item.endQuantity}</td>
              <td>{item.wasted.toFixed(2)}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeeklyReport;
