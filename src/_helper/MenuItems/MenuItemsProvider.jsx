import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MENUITEMS } from '../../Layout/SideBar-Layout/Menu';
import { routes } from '../../Routes/Routes';
import { BlogSvg, BonusUISvg, ButtonsSvg, CalanderSvg, ChartsSvg, ChatSvg, ContactSvg, EcommerceSvg, EditorsSvg, EmailSvg, FAQSvg, FilemanagerSvg, FormsSvg, GallarySvg, HeaderBookmarkSvg, HomeSvg, IconsSvg, JobsearchSvg, KanbanSvg, KnowledgebaseSvg, LearningSvg, MapsSvg, OthersSvg, ProjectSvg, SamplePageSvg, SearchResultSvg, SocialappSvg, SupportTicketSvg, TablesSvg, TaskSvg, TodoSvg, UiKitsSvg, UsersComponentSvg, WidgetsSvg } from '../../Data/svgIcons';
import appStore from '../../Component/Live Chats/Client/AppStore';
const MenuItemsContext = createContext();

export const MenuItemsContextProvider = ({ children }) => {
    const [data, setData] = useState([...MENUITEMS]);
    const [routesData, setRoutesData] = useState([...routes])
    const menuItemsRef = useRef([...MENUITEMS]);
    const routeItemsRef = useRef([...routes]);

    const {userData} = appStore();

    const handleFilterForStorePresent = () => {
        let filteredItems = menuItemsRef.current.filter((ele) => (ele.menutitle !== 'Store'))
        setData([...filteredItems]);

        let filteredRoutes = routeItemsRef.current.filter((ele) => (ele.path !== `${process.env.PUBLIC_URL}/store`))
        setRoutesData([...filteredRoutes]);
    };

    const handleFilterForStoreAbsence = () => {
      let filteredItems = menuItemsRef.current.filter((ele) => (ele.menutitle === 'Store'))
        setData([...filteredItems]);

        let filteredRoutes = routeItemsRef.current.filter((ele) => (ele.path === `${process.env.PUBLIC_URL}/store`))
        setRoutesData([...filteredRoutes]);
    }
   
    const handleFilterForAgent = () => {
        let replacedItems = menuItemsRef.current.filter((ele) => (ele.menutitle === 'Live Chats'));
        setData(replacedItems);

        let filteredRoutes = routeItemsRef.current.filter((ele) => (ele.path === `${process.env.PUBLIC_URL}/live-chat`))
        setRoutesData([...filteredRoutes]);
    }
    
    useEffect(() => {
      if(userData?.userId){
        handleFilterForAgent();
      }
      if(userData?.store && !userData.userId){
        handleFilterForStorePresent();
      }
      if(!userData.store && !userData.userId){
        handleFilterForStoreAbsence();
      }
    }, [userData]);
    
    console.log('MenuItemsContext.Provider')

    return (
      <MenuItemsContext.Provider value={{ data, setData, handleFilterForStorePresent, routesData}}>
        {children}
      </MenuItemsContext.Provider>
    );
  };

export const GetMenuItemsProps = () => {
    const {data, setData, handleFilterForStorePresent, routesData} = useContext(MenuItemsContext);

    return {data, setData, handleFilterForStorePresent, routesData};
  }