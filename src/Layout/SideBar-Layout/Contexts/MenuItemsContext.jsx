import { useState, createContext } from "react";


const MenuItemsContext = createContext();

const MenuItemsContextProvider = ({children}) => {
 const [menuItems, setMenuItems] = useState([]);

 const replaceStoreItem = () => {
    let items = menuItems.map((ele) => {
        if(ele.menutitle === 'Store'){
          ele.menutitle = 'Bots'
          ele.Items[0].path = `${process.env.PUBLIC_URL}/bots`
          ele.Items[0].title = `Bot`
        }
        return ele;
      });
      setMenuItems(items);
 }

 const replaceBotItem = () => {
    let items = menuItems.map((ele) => {
        if(ele.menutitle === 'Bots'){
            ele.menutitle = 'Store'
            ele.Items[0].path = `${process.env.PUBLIC_URL}/store`
            ele.Items[0].title = `Store`
          }
          return ele;
      });
      setMenuItems(items);
 }

 const updateMenuItems = (items) => {
    setMenuItems(items);
 }

 return <MenuItemsContext.Provider value={{menuItems, replaceStoreItem, replaceBotItem, updateMenuItems}}>
   {children}
 </MenuItemsContext.Provider>
}