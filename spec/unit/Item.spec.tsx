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
  it.todo('название не должно быть пустым');
  it.todo('нельзя удалять невыполненные задачи');
  it.todo('задачу можно удалить если она отмечена выполненной');
  it.todo('выполненная задача обозначается перечеркнутой');
});
