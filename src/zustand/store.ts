
import { Filter, Task } from 'types/MainType';
import { create } from 'zustand';

interface StoreState {
  tasks: Task[];
  task: Task;
  open: boolean;
  openAlert: boolean;
  error: boolean;
  filterPage: Filter;
  isLoading: boolean;
  totalRecords: number;
  hasDataChanged: boolean;
  setTasks: (data: Task[]) => void;
  setTask: (data: Task) => void;
  setOpen: (status: boolean) => void;
  setOpenAlert: (status: boolean) => void;
  setError: (status: boolean) => void;
  setIsLoading: (status: boolean) => void;
  setTotalRecords: (number: number) => void;
  setHasDataChanged: (status: boolean) => void;
}
const filterInit = {
  keySearch: '',
  sort: {},
  page: 1,
  pageSize: 100,
  sessionCode: Math.random().toString(),
};

const useStore = create<StoreState>((set, get) => ({
  tasks: [],
  task: { _id: '', title: '', completed: false },
  open: false,
  openAlert: false,
  error: false,
  filterPage: filterInit,
  isLoading: false,
  totalRecords: 0,
  hasDataChanged: false,
  setTasks: (data: Task[]) => {
    set({ tasks: data });
  },
  setTask: (data: Task) => {
    set({ task: data });
  },
  setOpen: (status: boolean) => {
    set({ open: status });
  },
  setOpenAlert: (status: boolean) => {
    set({ openAlert: status });
  },
  setError: (status: boolean) => {
    set({ error: status });
  },
  setIsLoading: (status: boolean) => {
    set({ isLoading: status });
  },
  setTotalRecords: (total: number) => {
    set({ totalRecords: total });
  },
  setHasDataChanged: (status: boolean) => {
    set({ hasDataChanged: status });
  },

}));

export default useStore;
