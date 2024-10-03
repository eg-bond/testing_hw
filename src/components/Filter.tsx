import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { activeTasksSelector, doneTasksSelector } from 'src/store/taskSlice';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Done = 'done',
}

interface IFilter {
  currentFilter: FilterType;
  setItemsToList: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  allTasks: Task[];
}

export const Filter = ({
  currentFilter,
  setItemsToList,
  setCurrentFilter,
  allTasks,
}: IFilter) => {
  const activeTasks = useSelector(activeTasksSelector);
  const doneTasks = useSelector(doneTasksSelector);
  // update itemsToList if state changes
  useEffect(() => {
    if (currentFilter === FilterType.All) setItemsToList(allTasks);
    if (currentFilter === FilterType.Active) setItemsToList(activeTasks);
    if (currentFilter === FilterType.Done) setItemsToList(doneTasks);
  }, [allTasks, activeTasks, doneTasks]);

  const handleFilter = (filterType: FilterType) => {
    if (filterType === currentFilter) {
      setItemsToList(allTasks);
      setCurrentFilter(FilterType.All);
      return;
    }
    if (filterType === FilterType.Active) {
      setItemsToList(activeTasks);
    }
    if (filterType === FilterType.Done) {
      setItemsToList(doneTasks);
    }
    setCurrentFilter(filterType);
  };

  return (
    <div>
      <button
        style={{
          color: 'white',
          backgroundColor:
            currentFilter === FilterType.Active ? 'red' : '#293547',
          borderRadius: '7px',
          padding: '0.5rem',
        }}
        onClick={() => handleFilter(FilterType.Active)}>
        Активные
      </button>
      <button
        style={{
          color: 'white',
          backgroundColor:
            currentFilter === FilterType.Done ? 'red' : '#293547',
          borderRadius: '7px',
          padding: '0.5rem',
        }}
        onClick={() => handleFilter(FilterType.Done)}>
        Выполненные
      </button>
    </div>
  );
};
