import { configureStore } from '@reduxjs/toolkit'
import menuItemsSlice from '../Layout/SideBar-Layout/reduxSlice/menuItems.slice'

export default configureStore({
  reducer: {
    menuItems: menuItemsSlice,
  }
})