import { DeleteButton } from './DeleteButton';

type Props = Task & {
  onDelete: (id: Task['id']) => void;
  onToggle: (id: Task['id']) => void;
};

export const Item = (props: Props) => {
  let header = props.header;

  if (props.header.length < 1) {
    header = 'Задача без названия';
  }

  if (props.header.length > 32) {
    header = props.header.slice(0, 32);
  }

  return (
    <li className='item-wrapper'>
      <input
        type='checkbox'
        id={props.id}
        defaultChecked={props.done}
        onChange={() => props.onToggle(props.id)}
      />
      <label htmlFor={props.id} data-testid='header'>
        {props.done ? <s>{header}</s> : header}
      </label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
