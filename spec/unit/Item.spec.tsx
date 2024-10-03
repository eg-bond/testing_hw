import { render, screen } from '@testing-library/react';
import { Item } from 'src/components/Item';

describe('Элемент списка задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  it('название не должно быть больше 32 символов', () => {
    render(
      <Item
        id='1'
        header='Очень длинный заголовок для задачи'
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const taskHeader = screen.getByTestId('header');
    expect(taskHeader.textContent?.length).toBeLessThanOrEqual(32);
  });
  it('название не должно быть пустым', () => {
    render(
      <Item
        id='2'
        header=''
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const taskHeader = screen.getByTestId('header');
    expect(taskHeader.textContent?.length).not.toBeLessThanOrEqual(1);
  });
  it('нельзя удалять невыполненные задачи', () => {
    render(
      <Item
        id='3'
        header='Помыть машину'
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeDisabled();
  });
  it('задачу можно удалить если она отмечена выполненной', () => {
    render(
      <Item
        id='4'
        header='Выгулять собаку'
        done={true}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).not.toBeDisabled();
  });
  it('выполненная задача обозначается перечеркнутой', () => {
    render(
      <Item
        id='5'
        header='Купить газету'
        done={true}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const taskHeader = screen.getByText(/Купить газету/i);
    expect(taskHeader).toHaveStyle('text-decoration: line-through');
  });
});
