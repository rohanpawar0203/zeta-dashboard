import React, { createContext, useContext, useState } from 'react';
import { MENUITEMS } from '../../Layout/SideBar-Layout/Menu';
import { BlogSvg, BonusUISvg, ButtonsSvg, CalanderSvg, ChartsSvg, ChatSvg, ContactSvg, EcommerceSvg, EditorsSvg, EmailSvg, FAQSvg, FilemanagerSvg, FormsSvg, GallarySvg, HeaderBookmarkSvg, HomeSvg, IconsSvg, JobsearchSvg, KanbanSvg, KnowledgebaseSvg, LearningSvg, MapsSvg, OthersSvg, ProjectSvg, SamplePageSvg, SearchResultSvg, SocialappSvg, SupportTicketSvg, TablesSvg, TaskSvg, TodoSvg, UiKitsSvg, UsersComponentSvg, WidgetsSvg } from '../../Data/svgIcons';

const MenuItemsContext = createContext();

export const MenuItemsContextProvider = ({ children }) => {
    const [data, setData] = useState([...MENUITEMS]);
    
    const handleForStore = () => {
        data.map((ele) => {
            if(ele.menutitle === 'Store'){
            ele.menutitle = 'Bot';
            ele.Items[0].path = `${process.env.PUBLIC_URL}/bots`;
            ele.Items[0].title = 'Bots'
            }
            return ele;
        });
        let dashBoardItem = {
            menutitle: 'Dashboard',
            Items: [
                { path: `${process.env.PUBLIC_URL}/dashboard`, bookmark: true, icon: FilemanagerSvg, title: 'Dashboard', type: 'link' }
            ]
        };
        setData([{...dashBoardItem}, ...data]);
        console.log('did handle ', data);
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
        console.log(replacedItems);
        setData(replacedItems);
    };

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