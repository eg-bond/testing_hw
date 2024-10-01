import { FilterType } from './Filter';

interface IEmpty {
  allTasks: Task[];
}

export const Empty = ({ allTasks }: IEmpty) => {
  if (allTasks.length > 0) {
    return null;
  }
  return (
    <div className='empty-wrapper'>
      Вы пока не создали ни одной задачи. <br />
      Давайте что-нибудь запланируем?
    </div>
  );
};
