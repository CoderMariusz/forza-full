'use client';
import { AnyNaptrRecord } from 'dns';
import React, { useState } from 'react';

const Plan = () => {
  const [efficiencies, setEfficiencies] = useState({
    am: { minPeopleRequired: 0, efficiency: 0 },
    pm: { minPeopleRequired: 0, efficiency: 0 }
  });

  const [optimizedTasks, setOptimizedTasks] = useState<{
    optimizedAmShift: any;
    optimizedPmShift: any;
    efficiencyAm: { minPeopleRequired: number; efficiency: number };
    efficiencyPm: { minPeopleRequired: number; efficiency: number };
  } | null>(null);

  const [amShiftTasks, setAmShiftTasks] = useState({
    racking: 0,
    mix1: 0,
    mix2: 0,
    take_in: 0
  });
  const [pmShiftTasks, setPmShiftTasks] = useState({
    racking: 0,
    mix1: 0,
    mix2: 0,
    take_in: 0
  });

  function calculateShiftEfficiency(shiftTasks: any) {
    const timeLimit = 8; // 8-hour shift
    const peopleNeeded = { racking: 8, mix1: 5, mix2: 3, take_in: 2 };

    let totalManHours = Object.keys(shiftTasks).reduce(
      (acc, task) =>
        acc +
        shiftTasks[task as keyof typeof shiftTasks] *
          peopleNeeded[task as keyof typeof peopleNeeded],
      0
    );

    let minPeopleRequired = Math.ceil(totalManHours / timeLimit);
    let efficiency = (totalManHours / (minPeopleRequired * timeLimit)) * 100;

    return { minPeopleRequired, efficiency };
  }

  function calculateTotalHours(shiftTasks: any) {
    const peopleNeeded = { racking: 8, mix1: 5, mix2: 3, take_in: 2 };
    return Object.keys(shiftTasks).reduce(
      (acc, task) =>
        acc +
        shiftTasks[task as keyof typeof shiftTasks] *
          peopleNeeded[task as keyof typeof peopleNeeded],
      0
    );
  }

  function optimizeTaskAllocation(amShiftTasks: any, pmShiftTasks: any) {
    // Copy the original task distributions
    const optimizedAmShift = { ...amShiftTasks };
    const optimizedPmShift = { ...pmShiftTasks };

    // Calculate total hours for each task
    const totalHours = {
      racking: amShiftTasks.racking + pmShiftTasks.racking,
      mix1: amShiftTasks.mix1 + pmShiftTasks.mix1,
      mix2: amShiftTasks.mix2 + pmShiftTasks.mix2,
      take_in: amShiftTasks.take_in + pmShiftTasks.take_in
    };

    // Ensure at least 80% of Racking is in AM shift and 60% of each task in each shift
    optimizedAmShift.racking = Math.max(
      amShiftTasks.racking,
      totalHours.racking * 0.8
    );
    optimizedPmShift.racking = totalHours.racking - optimizedAmShift.racking;

    for (let task in totalHours) {
      if (task !== 'racking') {
        const amTaskHours = Math.max(
          amShiftTasks[task],
          totalHours[task as keyof typeof totalHours] * 0.6
        );
        const pmTaskHours =
          totalHours[task as keyof typeof totalHours] - amTaskHours;

        // Adjust tasks to avoid overloading a shift
        const amTotalHours = calculateTotalHours(optimizedAmShift);
        const pmTotalHours = calculateTotalHours(optimizedPmShift);
        const maxShiftHours = 8 * 8; // Assuming 5 people max per task

        if (amTotalHours + amTaskHours > maxShiftHours) {
          optimizedAmShift[task] = maxShiftHours - amTotalHours;
          optimizedPmShift[task] =
            pmTaskHours + (amTaskHours - optimizedAmShift[task]);
        } else {
          optimizedAmShift[task] = amTaskHours;
          optimizedPmShift[task] = pmTaskHours;
        }
      }
    }

    // Calculate efficiencies for optimized shifts
    const efficiencyAm = calculateShiftEfficiency(optimizedAmShift);
    const efficiencyPm = calculateShiftEfficiency(optimizedPmShift);

    return {
      optimizedAmShift,
      optimizedPmShift,
      efficiencyAm,
      efficiencyPm
    };
  }

  const handleInputChange = (shift: any, task: any, value: any) => {
    if (shift === 'AM') {
      setAmShiftTasks({ ...amShiftTasks, [task]: Number(value) });
    } else {
      setPmShiftTasks({ ...pmShiftTasks, [task]: Number(value) });
    }
  };

  const handleCalculate = () => {
    const amEfficiency = calculateShiftEfficiency(amShiftTasks);
    const pmEfficiency = calculateShiftEfficiency(pmShiftTasks);
    const optimizationResult = optimizeTaskAllocation(
      amShiftTasks,
      pmShiftTasks
    );

    setEfficiencies({ am: amEfficiency, pm: pmEfficiency });

    // ...

    setOptimizedTasks(optimizationResult);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>Shift Scheduler</h1>

      {/* Task input tables */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {/* AM Shift Input */}
        <div>
          <h2 className='text-lg font-semibold mb-2'>AM Shift</h2>
          {Object.keys(amShiftTasks).map((task) => (
            <div
              key={task}
              className='mb-2'>
              <label className='block'>{task.toUpperCase()}</label>
              <input
                type='number'
                className='border p-2 w-full'
                value={amShiftTasks[task as keyof typeof amShiftTasks]}
                onChange={(e) => handleInputChange('AM', task, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* PM Shift Input */}
        <div>
          <h2 className='text-lg font-semibold mb-2'>PM Shift</h2>
          {Object.keys(pmShiftTasks).map((task) => (
            <div
              key={task}
              className='mb-2'>
              <label className='block'>{task.toUpperCase()}</label>
              <input
                type='number'
                className='border p-2 w-full'
                value={pmShiftTasks[task as keyof typeof pmShiftTasks]}
                onChange={(e) => handleInputChange('PM', task, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Calculate
      </button>

      {/* Display efficiencies and optimized tasks */}
      {efficiencies && (
        <div className='mt-4'>
          <div>
            <h3 className='text-lg font-semibold'>Initial Efficiencies</h3>
            <p>
              AM Shift: {efficiencies.am.efficiency.toFixed(2)}% (People Needed:{' '}
              {efficiencies.am.minPeopleRequired})
            </p>
            <p>
              PM Shift: {efficiencies.pm.efficiency.toFixed(2)}% (People Needed:{' '}
              {efficiencies.pm.minPeopleRequired})
            </p>
          </div>
          {optimizedTasks && (
            <div>
              <h3 className='text-lg font-semibold mt-4'>Optimized Tasks</h3>
              <p>
                AM Shift: Efficiency:{' '}
                {optimizedTasks.efficiencyAm.efficiency.toFixed(2)}% (People
                Needed: {optimizedTasks.efficiencyAm.minPeopleRequired})
              </p>
              <p>
                PM Shift: Efficiency:{' '}
                {optimizedTasks.efficiencyPm.efficiency.toFixed(2)}% (People
                Needed: {optimizedTasks.efficiencyPm.minPeopleRequired})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Plan;
