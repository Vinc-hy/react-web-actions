import { createSlice } from "@reduxjs/toolkit";

type Props = {
  [key: string]: any;
};

export interface AboutState {
  currentMenu: Props[];
}

const initialState: AboutState = {
  currentMenu: [],
};

// 创建一个 Slice
export const currentMenu = createSlice({
  // 命名空间
  name: "currentMenu",

  // 初始化状态值
  initialState,

  // 定义 reducers 并生成关联的操作
  reducers: {
    saveCurrentValue(state, { payload }) {
      state.currentMenu = payload;
      localStorage.setItem("currentMenu", JSON.stringify(state.currentMenu));
    },
  },
});

// 导出 reducers 方法
export const { saveCurrentValue } = currentMenu.actions;

// 默认导出
export default currentMenu.reducer;
