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
  {
    header: 'выгулять собаку',
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

    const notifierWrapper = screen.getByTestId('notifier-wrapper');

    expect(notifierWrapper).toBeInTheDocument();
    expect(notifierWrapper).toHaveTextContent(items[0].header);
  });
  it.todo('одновременно может отображаться только одно');
});
