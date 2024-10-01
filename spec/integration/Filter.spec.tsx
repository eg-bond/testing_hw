import { render, screen } from '@testing-library/react';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import { TaskList } from 'src/modules/TaskList';
import userEvent from '@testing-library/user-event';

const items: Task[] = [
  {
    id: '1',
    header: 'купить хлеб',
    done: false,
  },
  { id: '2', header: 'купить молоко', done: false },
  { id: '3', header: 'выгулять собаку', done: true },
];

describe('Список задач', () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации по активным
  it('с включенным фильтром по активным', async () => {
    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });
    const activeFilterBtn = screen.getByText(/Активные/i);
    await userEvent.click(activeFilterBtn);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(2);
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации по активным
  it('с выключенным фильтром по активным', async () => {
    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });
    const activeFilterBtn = screen.getByText(/Активные/i);
    await userEvent.click(activeFilterBtn);
    await userEvent.click(activeFilterBtn);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(3);
  });

  // содержит только выполненные задачи
  // после нажатия на кнопку фильтрации по выполненым
  it('с включенным фильтром по выполненным', async () => {
    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });
    const doneFilterBtn = screen.getByText(/Выполненные/i);
    await userEvent.click(doneFilterBtn);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
  });
});
