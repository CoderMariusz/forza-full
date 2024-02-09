import { ID, database } from '@/appwrite';
import { Models } from 'appwrite';
import { create } from 'zustand';

export interface WeeklyReportStore {
  week: number;
  production: WeeklyProductionRow[];
}
export interface WeeklyProductionRow {
  aCode: string;
  labelCode: string;
  $id?: string;
  labelId?: string;
  startquantities: number;
  quantitiesAfterProduction: number;
  endquantities: number;
  wasted: number;
  week: number;
  avgWaste?: number;
}
interface WeeklyProductionState extends WeeklyProductionRow {}

interface WeeklyReportState extends WeeklyReportStore {
  setWeek: (week: number) => void;
  setProduction: (production: WeeklyProductionRow[]) => void;
  setWeeklyReportFromDBinRow: () => Promise<WeeklyProductionRow[]>;
  setWeeklyReportFromDB: () => Promise<WeeklyReportStore[]>;
  createWeeklyProductionRow: (
    row: WeeklyProductionRow
  ) => Promise<Models.Document>;
  updateWeeklyProductionRowToAvgWaste: (
    id: string,
    avgWaste: number
  ) => Promise<Models.Document>;
}

const useWeeklyReportStore = create<WeeklyReportState>((set) => ({
  week: 0,
  production: [],
  setWeek: (week: number) => set((state) => ({ ...state, week })),
  setProduction: (production: WeeklyProductionRow[]) => {
    set((state) => ({ ...state, production }));
  },

  updateWeeklyProductionRowToAvgWaste: async (id, avgWaste) => {
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '653a6ee8c9c891c8eaec',
      id,
      {
        avgWaste: avgWaste
      }
    );
    return data;
  },

  setWeeklyReportFromDBinRow: async (): Promise<WeeklyProductionRow[]> => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '653a6ee8c9c891c8eaec'
    );
    return data.documents.map((doc) => {
      return {
        aCode: doc.aCode || '',
        labelCode: doc.labelCode || '',
        labelId: doc.labelId || '',
        $id: doc.$id || '',
        startquantities: doc.startquantities || 0,
        quantitiesAfterProduction: doc.quantitiesAfterProduction || 0,
        endquantities: doc.endquantities || 0,
        wasted: doc.wasted || 0,
        week: doc.week || 0
      };
    });
  },
  setWeeklyReportFromDB: async (): Promise<WeeklyReportStore[]> => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '653a6ee8c9c891c8eaec'
    );

    // Convert the data into a more manageable format
    const convertedData: WeeklyProductionRow[] = data.documents.map((doc) => {
      return {
        week: doc.week || 0,
        aCode: doc.aCode || '',
        labelCode: doc.labelCode || '',
        labelId: doc.labelId || '',
        $id: doc.$id || '',
        startquantities: doc.startquantities || 0,
        quantitiesAfterProduction: doc.quantitiesAfterProduction || 0,
        endquantities: doc.endquantities || 0,
        wasted: doc.wasted || 0,
        avgWaste: doc.avgWaste || 0
      };
    });

    // Organize the data by week
    const weeklyReportsMap: { [key: number]: WeeklyProductionRow[] } = {};

    for (let entry of convertedData) {
      if (!weeklyReportsMap[entry.week]) {
        weeklyReportsMap[entry.week] = [];
      }
      weeklyReportsMap[entry.week].push(entry);
    }

    // Convert the organized data into the desired array format
    const weeklyReports: WeeklyReportStore[] = Object.keys(weeklyReportsMap)
      .map((week: any) => ({
        week: parseInt(week),
        production: weeklyReportsMap[week]
      }))
      .sort((a, b) => a.week - b.week); // Sort by week in ascending order

    return weeklyReports;
  },
  createWeeklyProductionRow: async (row: WeeklyProductionRow) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '653a6ee8c9c891c8eaec',
      ID.unique(),
      {
        aCode: row.aCode,
        labelCode: row.labelCode,
        labelId: row.labelId,
        startquantities: row.startquantities,
        quantitiesAfterProduction: row.quantitiesAfterProduction,
        endquantities: row.endquantities,
        wasted: row.wasted,
        week: row.week
      }
    );

    return data;
  }
}));

export { useWeeklyReportStore };
