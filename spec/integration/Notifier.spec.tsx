import { render, screen } from '@testing-library/react';
import { Notifier } from 'src/components/Notifier';
import { TaskList } from 'src/modules/TaskList';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import ue from '@testing-library/user-event';
import { NotifierContainer } from 'src/modules/NotifierContainer';
import { store } from 'src/store/configureStore';
import { addTask } from 'src/store/taskSlice';

const items = [
  {
    header: 'купить хлеб',
    done: false,
  },
  {
    header: 'купить молоко',
    done: false,
  },
];

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Оповещение при выполнении задачи', () => {
  it('появляется и содержит заголовок задачи', async () => {
    // setup test state
    store.dispatch(addTask(items[0].header));

    render(
      <>
        <TaskList />
        <NotifierContainer />
      </>,
      {
        wrapper: JestStoreProvider,
      }
    );

    const taskCheckbox = screen.getByRole('checkbox');
    await userEvent.click(taskCheckbox);

    const notifier = screen.getByTestId('notifier');

    expect(notifier).toBeInTheDocument();
    expect(notifier).toHaveTextContent(items[0].header);
  });
  it('одновременно может отображаться только одно', async () => {
    // setup test state
    store.dispatch(addTask(items[0].header));
    store.dispatch(addTask(items[1].header));

    render(
      <>
        <TaskList />
        <NotifierContainer />
      </>,
      {
        wrapper: JestStoreProvider,
      }
    );

    const [task1Checkbox, task2Checkbox] = screen.getAllByRole('checkbox');
    await userEvent.click(task1Checkbox);
    await userEvent.click(task2Checkbox);

    const notifier = screen.getAllByTestId('notifier');

    expect(notifier).toHaveLength(1);
  });
});
