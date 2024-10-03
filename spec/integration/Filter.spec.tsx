import { render, screen } from '@testing-library/react';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import { TaskList } from 'src/modules/TaskList';
import ue from '@testing-library/user-event';
import { store } from 'src/store/configureStore';
import { addTask, completeTask } from 'src/store/taskSlice';

const items = [
  {
    header: 'купить хлеб',
    done: false,
  },
  {
    header: 'купить молоко',
    done: false,
  },
  {
    header: 'выгулять собаку',
    done: true,
  },
];

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Список задач', () => {
  beforeAll(() => {
    // setup test store
    store.dispatch(addTask(items[0].header));
    store.dispatch(addTask(items[1].header));
    store.dispatch(addTask(items[2].header));
    store.dispatch(completeTask(store.getState().taskList.list[0].id));
  });
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
