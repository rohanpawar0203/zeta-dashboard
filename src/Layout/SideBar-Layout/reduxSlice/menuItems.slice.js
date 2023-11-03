import { createSlice } from '@reduxjs/toolkit'
import { MENUITEMS } from '../Menu'

export const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState: JSON.parse(JSON.stringify(MENUITEMS)),
  reducers: {
    replaceStoreItem: state => {
      return  state.map((ele) => {
            if(ele.menutitle === 'Store'){
              ele.menutitle = 'Bots'
              ele.Items[0].path = `${process.env.PUBLIC_URL}/bots`
              ele.Items[0].title = `Bot`
            }
            return ele;
          });
    },
    replaceBotItem: state => {
      return  state.map((ele) => {
            if(ele.menutitle === 'Bots'){
              ele.menutitle = 'Store'
              ele.Items[0].path = `${process.env.PUBLIC_URL}/store`
              ele.Items[0].title = `Store`
            }
            return ele;
          });
    },
    updateMenuItems: (state, {payload}) => {
      return  payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { replaceStoreItem, updateMenuItems, replaceBotItem } = menuItemsSlice.actions

export default menuItemsSlice.reducer