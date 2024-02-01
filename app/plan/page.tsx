'use client';
import React, { useState } from 'react';

const Plan = () => {
  const [efficiencies, setEfficiencies] = useState({
    am: { minPeopleRequired: 0, efficiency: 0, taskWorkDone: {} },
    pm: { minPeopleRequired: 0, efficiency: 0, taskWorkDone: {} }
  });

  const peopleNeeded = {
    job1: 4,
    racking: 8,
    mix1: 5,
    mix2: 3,
    take_in: 2
  };

  const [optimizedTasks, setOptimizedTasks] = useState<{
    AM: {
      tasks: {
        [x: string]: number;
      };
      people: number;
      efficiency: number;
    };
    PM: {
      tasks: {
        [x: string]: number;
      };
      people: number;
      efficiency: number;
    };
  }>({
    AM: {
      tasks: {},
      people: 0,
      efficiency: 0
    },
    PM: {
      tasks: {},
      people: 0,
      efficiency: 0
    }
  });

  const [amShiftTasks, setAmShiftTasks] = useState({
    job1: 0,
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

  function calculateEfficiency(
    shiftTasks: any,
    timeLimit = 7.25,
    peopleNeeded: any
  ) {
    peopleNeeded = peopleNeeded || {
      job1: 4,
      racking: 8,
      mix1: 5,
      mix2: 3,
      take_in: 2
    };
    let totalManHours = Object.keys(shiftTasks).reduce(
      (acc, task) => acc + shiftTasks[task] * peopleNeeded[task],
      0
    );
    let minPeopleRequired = Math.max(
      Math.ceil(totalManHours / timeLimit),
      Math.max(
        ...Object.keys(shiftTasks).map((task) =>
          shiftTasks[task] > 0 ? peopleNeeded[task] : 0
        )
      )
    );
    let efficiency = (totalManHours / (minPeopleRequired * timeLimit)) * 100;
    return [minPeopleRequired, efficiency];
  }

  function optimizeShiftAllocation(
    amTasks: { [x: string]: number },
    pmTasks: { [x: string]: number },
    peopleNeeded: { [x: string]: number },
    maxHoursPerTeam = 14.5,
    maxShiftHours = 7.25
  ) {
    function balanceTaskHours(
      task: string,
      shiftFrom: { [x: string]: number },
      shiftTo: { [x: string]: number }
    ) {
      let maxHours = peopleNeeded[task] * maxHoursPerTeam;
      while (shiftFrom[task] * peopleNeeded[task] > maxHours) {
        let hoursToMove =
          (shiftFrom[task] * peopleNeeded[task] - maxHours) /
          peopleNeeded[task];
        shiftFrom[task] -= hoursToMove;
        shiftTo[task] += hoursToMove;
      }
    }

    let totalRackingHours = amTasks['racking'] + pmTasks['racking'];
    amTasks['racking'] = Math.max(amTasks['racking'], totalRackingHours * 0.8);
    pmTasks['racking'] = totalRackingHours - amTasks['racking'];

    for (let task in peopleNeeded) {
      balanceTaskHours(task, amTasks, pmTasks);
      balanceTaskHours(task, pmTasks, amTasks);
    }

    let amEfficiency = calculateEfficiency(
      amTasks,
      maxShiftHours,
      peopleNeeded
    );
    let pmEfficiency = calculateEfficiency(
      pmTasks,
      maxShiftHours,
      peopleNeeded
    );

    return {
      AM: {
        tasks: amTasks,
        people: amEfficiency[0],
        efficiency: amEfficiency[1]
      },
      PM: {
        tasks: pmTasks,
        people: pmEfficiency[0],
        efficiency: pmEfficiency[1]
      }
    };
  }

  const handleInputChange = (shift: string, task: string, value: string) => {
    if (shift === 'AM') {
      setAmShiftTasks((prev) => ({ ...prev, [task]: parseInt(value) }));
    } else {
      setPmShiftTasks((prev) => ({ ...prev, [task]: parseInt(value) }));
    }
  };
  const handleCalculate = () => {
    const amTasks = { ...amShiftTasks };
    const pmTasks = { ...pmShiftTasks };
    const amEfficiency = calculateEfficiency(amTasks, 7.25, peopleNeeded);
    const pmEfficiency = calculateEfficiency(pmTasks, 7.25, {
      racking: 8,
      mix1: 5,
      mix2: 3,
      take_in: 2
    });

    setEfficiencies({
      am: {
        minPeopleRequired: amEfficiency[0],
        efficiency: amEfficiency[1],
        taskWorkDone: amEfficiency[2]
      },
      pm: {
        minPeopleRequired: pmEfficiency[0],
        efficiency: pmEfficiency[1],
        taskWorkDone: pmTasks
      }
    });

    console.log(amEfficiency);

    const optimization = optimizeShiftAllocation(
      amTasks,
      pmTasks,
      peopleNeeded
    );
    setOptimizedTasks(optimization);
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
            <p>Works Done on Am: {}</p>
          </div>
          {optimizedTasks && (
            <div>
              <h3 className='text-lg font-semibold mt-4'>Optimized Tasks</h3>
              <p>
                AM Shift: Efficiency: {optimizedTasks.AM.efficiency.toFixed(2)}%
                (People Needed: {optimizedTasks.AM.people})
              </p>
              <p>AM Shift Tasks: {JSON.stringify(optimizedTasks.AM.tasks)}</p>
              <p>
                PM Shift: Efficiency: {optimizedTasks.PM.efficiency.toFixed(2)}%
                (People Needed: {optimizedTasks.PM.people})
              </p>
              <p>PM Task: {JSON.stringify(optimizedTasks.PM.tasks)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Plan;
