import { Item } from './Item';

type Props = {
  items: Task[];
  onDelete: (id: Task['id']) => void;
  onToggle: (id: Task['id']) => void;
};

const MAX_ITEMS_TO_SHOW = 10;

export const List = ({ items, onDelete, onToggle }: Props) => {
  const activeTasks = items.filter(item => !item.done);
  if (activeTasks.length > MAX_ITEMS_TO_SHOW) {
    items = items.slice(0, 10);
  }

  return (
    <>
      <ul className='task-list tasks'>
        {items.map(item => (
          <Item
            {...item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
      {activeTasks.length > MAX_ITEMS_TO_SHOW && (
        <div className='empty-wrapper'>
          В списке есть еще {activeTasks.length - 10} активных задачи, но вы не
          можете их видеть, так как их слишком много. <br />
          Показаны первые 10 задач.
        </div>
      )}
    </>
  );
};
