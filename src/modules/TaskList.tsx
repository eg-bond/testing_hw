import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Empty } from 'src/components/Empty';
import { Filter, FilterType } from 'src/components/Filter';
import { List } from 'src/components/List';
import {
  activeTasksSelector,
  deleteTask,
  doneTasksSelector,
  tasksSelector,
  toggleTask,
} from 'src/store/taskSlice';

export const TaskList = () => {
  const allTasks = useSelector(tasksSelector);
  const activeTasks = useSelector(activeTasksSelector);
  const doneTasks = useSelector(doneTasksSelector);

  const dispatch = useDispatch();
  const [itemsToList, setItemsToList] = useState<Task[]>(allTasks);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All
  );

  const handleDelete = (id: Task['id']) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task['id']) => {
    dispatch(toggleTask(id));
  };

  return (
    <>
      <Filter
        currentFilter={currentFilter}
        setItemsToList={setItemsToList}
        setCurrentFilter={setCurrentFilter}
        allTasks={allTasks}
        activeTasks={activeTasks}
        doneTasks={doneTasks}
      />
      {itemsToList.length > 0 ? (
        <List
          items={itemsToList}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ) : (
        <Empty allTasks={allTasks} />
      )}
    </>
  );
};
