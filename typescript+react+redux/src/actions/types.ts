import { deleteTodoAction, FetchToDosAction } from './todos';
export enum ActionTypes {
  fetchTodos,
  deleteTodo,
}

export type Action = FetchToDosAction | deleteTodoAction;
