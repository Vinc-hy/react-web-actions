import { configureStore } from "@reduxjs/toolkit";
import * as reducer from "./modules";

// configureStore 创建一个 redux 数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    ...reducer,
  },
});

export default store;
