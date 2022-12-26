import React from 'react';
import { render, screen } from '../utils/test-utils';
import { LoginPage } from '../pages/guest/LoginPage';
import '@testing-library/jest-dom';
import TaskItem from '../components/Tasks/TaskItem';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const task = {
    id: 1,
    task_name: 'My Task',
    date: new (Date),
    done: true
}

describe('Task Item test', () => {
  test('Should be render correctly', () => {
    render(<TaskItem task={task} />);
    const task_name = screen.getByText(task.task_name, { selector: 'p' });
    const date = screen.getByText(task.date.toString(), { selector: 'p' });
    const delete_icon = screen.getByRole('button', { name: /delete/i });
    const update_icon = screen.getByRole('button', { name: /update/i });
    const checkbox = screen.getByRole('checkbox');
    expect(task_name).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(delete_icon).toBeInTheDocument();
    expect(update_icon).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
});
