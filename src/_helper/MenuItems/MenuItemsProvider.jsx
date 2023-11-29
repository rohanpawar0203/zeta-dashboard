import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENUITEMS } from '../../Layout/SideBar-Layout/Menu';
import { BlogSvg, BonusUISvg, ButtonsSvg, CalanderSvg, ChartsSvg, ChatSvg, ContactSvg, EcommerceSvg, EditorsSvg, EmailSvg, FAQSvg, FilemanagerSvg, FormsSvg, GallarySvg, HeaderBookmarkSvg, HomeSvg, IconsSvg, JobsearchSvg, KanbanSvg, KnowledgebaseSvg, LearningSvg, MapsSvg, OthersSvg, ProjectSvg, SamplePageSvg, SearchResultSvg, SocialappSvg, SupportTicketSvg, TablesSvg, TaskSvg, TodoSvg, UiKitsSvg, UsersComponentSvg, WidgetsSvg } from '../../Data/svgIcons';
import appStore from '../../Component/Live Chats/Client/AppStore';

const MenuItemsContext = createContext();

export const MenuItemsContextProvider = ({ children }) => {
    const [data, setData] = useState([...MENUITEMS]);
    const {userData} = appStore.getState();
    
    const handleForStore = () => {
        let filteredItems = data.filter((ele) => (ele.menutitle !== 'Store'))
        setData([...filteredItems]);
    };
   
    const handleForLogout = () => {
        let replacedItems = data.map((ele) => {
            if(ele.menutitle === 'Bot'){
            ele.menutitle = 'Store';
            ele.Items[0].path = `${process.env.PUBLIC_URL}/store`;
            ele.Items[0].title = 'Store'
            }
            if(ele.menutitle !== 'Dashboard'){
                return ele;
            }
        });
        setData(replacedItems);
    };
    
    const handleFilterForAgent = () => {
        let replacedItems = data.filter((ele) => (ele.menutitle === 'Live Chats'));
        setData(replacedItems);
    }
    
    useEffect(() => {
        console.log('currentUser', userData);
      if(userData?.userId){
        handleFilterForAgent();
      }
      if(userData?.store){
        handleForStore();
      }
    }, [userData]);
    

    return (
      <MenuItemsContext.Provider value={{ data, setData, handleForStore, handleForLogout }}>
        {children}
      </MenuItemsContext.Provider>
    );
  };

export const GetMenuItemsProps = () => {
    const {data, setData, handleForStore, handleForLogout} = useContext(MenuItemsContext);

    return {data, setData, handleForStore, handleForLogout};
  }