import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import {TaskList} from '../../types/TaskList';

interface TaskListState {
  taskList: TaskList[];
}

const initialState = {
  taskList: [],
} satisfies TaskListState as TaskListState;

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskList>) => {
      state.taskList = _.concat(state.taskList ?? [], action.payload);
    },
    editTask: (state, action: PayloadAction<TaskList>) => {
      state.taskList = _.map(state.taskList, item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    deleteTask: (state, action: PayloadAction<TaskList>) => {
      state.taskList = _.reject(state.taskList, {id: action.payload.id});
    },
  },
});

export const {addTask, deleteTask, editTask} = taskListSlice.actions;
export default taskListSlice.reducer;
