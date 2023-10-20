import { ID, database } from '@/appwrite';
import { create } from 'zustand';

interface WeeklyReportState {
  weeklyReports: WeeklyReport[];
  setWeeklyReports: (weeklyReports: WeeklyReport[]) => void;
  setWeeklyReportsFromDB: () => Promise<WeeklyReport[]>;
}

export interface WeeklyReport {
  aCode: string;
  labelCode: string;
  startQuantity: number;
  quantityAfterProduction: number;
  endQuantity: number;
  wasted: number;
}

interface WeeklyReportState extends WeeklyReport {
  setWeeklyReports: (weeklyReports: WeeklyReport[]) => void;
  setWeeklyReportsFromDB: () => Promise<WeeklyReport[]>;
}

interface WeeklyReportActions {
  setACode: (aCode: string) => void;
  setLabelCode: (labelCode: string) => void;
  setStartQuantity: (startQuantity: number) => void;
  setQuantityAfterProduction: (quantityAfterProduction: number) => void;
  setEndQuantity: (endQuantity: number) => void;
  setWasted: (wasted: number) => void;
  createWeeklyReport: (weeklyReport: WeeklyReport) => void;
  createWeeklyReportInDB: (weeklyReport: WeeklyReport) => void;
  editWeeklyReport: (id: string, weeklyReport: WeeklyReport) => void;
  deleteWeeklyReport: (id: string) => void;
}

type WeeklyReportStore = WeeklyReportState & WeeklyReportActions;

const useWeeklyReportsStore = create<WeeklyReportStore>((set) => ({
  weeklyReports: [],
  aCode: '',
  labelCode: '',
  startQuantity: 0,
  quantityAfterProduction: 0,
  endQuantity: 0,
  wasted: 0,
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setLabelCode: (labelCode: string) =>
    set((state) => ({ ...state, labelCode })),
  setStartQuantity: (startQuantity: number) =>
    set((state) => ({ ...state, startQuantity })),
  setQuantityAfterProduction: (quantityAfterProduction: number) =>
    set((state) => ({ ...state, quantityAfterProduction })),
  setEndQuantity: (endQuantity: number) =>
    set((state) => ({ ...state, endQuantity })),
  setWasted: (wasted: number) => set((state) => ({ ...state, wasted })),
  createWeeklyReport: (weeklyReport: WeeklyReport) =>
    set((state) => ({
      ...state,
      weeklyReports: [...state.weeklyReports, weeklyReport]
    })),
  editWeeklyReport: (id: string, weeklyReport: WeeklyReport) =>
    set((state) => ({
      ...state,
      weeklyReports: state.weeklyReports.map((wr) =>
        wr.aCode === id ? weeklyReport : wr
      )
    })),
  deleteWeeklyReport: (id: string) =>
    set((state) => ({
      ...state,
      weeklyReports: state.weeklyReports.filter((wr) => wr.aCode !== id)
    })),
  setWeeklyReports: (weeklyReports: WeeklyReport[]) =>
    set((state) => ({ ...state, weeklyReports })),
  setWeeklyReportsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2'
    );
    const weeklyReports = data.documents.map((weeklyReport) => {
      return {
        aCode: weeklyReport.aCode,
        labelCode: weeklyReport.labelCode,
        startQuantity: weeklyReport.startQuantity,
        quantityAfterProduction: weeklyReport.quantityAfterProduction,
        endQuantity: weeklyReport.endQuantity,
        wasted: weeklyReport.wasted
      };
    });
    set((state) => ({ ...state, weeklyReports }));
    return weeklyReports;
  },
  createWeeklyReportInDB: async (weeklyReport: WeeklyReport) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '652fd1f24e89305872fd',
      ID.unique(),
      {
        aCode: weeklyReport.aCode,
        labelCode: weeklyReport.labelCode,
        startQuantity: weeklyReport.startQuantity,
        quantityAfterProduction: weeklyReport.quantityAfterProduction,
        endQuantity: weeklyReport.endQuantity,
        wasted: weeklyReport.wasted
      }
    );

    console.log('data', data);

    set((state) => ({
      ...state,
      weeklyReports: [...state.weeklyReports, weeklyReport]
    }));
  }
}));

export { useWeeklyReportsStore };
