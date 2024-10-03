import { render, screen } from '@testing-library/react';
import { List } from 'src/components/List';

const generateUndoneTasks = (count: number): Task[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    header: '...',
    done: false,
  }));
};

it('отображение списка задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items = generateUndoneTasks(3);

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it('Список содержит не больше 10 невыполненных задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items = generateUndoneTasks(13);

  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const shownItems = screen.getAllByRole('listitem');

  expect(shownItems.length).toBeLessThanOrEqual(10);
});

it('Список выводит уведомление о том, что невыполненных задач больше чем 10', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items = generateUndoneTasks(10);

  const { rerender } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );

  const absentTooMuchTasksWarning = screen.queryByText(/В списке есть еще/i);
  expect(absentTooMuchTasksWarning).not.toBeInTheDocument();

  items.push({
    id: '11',
    header: '...',
    done: false,
  });

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const tooMuchTasksWarning = screen.getByText(/В списке есть еще/i);
  expect(tooMuchTasksWarning).toBeInTheDocument();
});
