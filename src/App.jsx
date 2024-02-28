import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import Routers from "./Routes";
import BookmarkProvider from "./_helper/bookmark/BookmarkProvider";
import { ChatProvider } from "./_helper/chat-app/ChatProvider";
import ContactProvider from "./_helper/Contact/ContactProvider";
import CartProvider from "./_helper/ecommerce/cart/CartProvider";
import FilterProvider from "./_helper/ecommerce/filter/FilterProvider";
import ProductProvider from "./_helper/ecommerce/product/ProductProvider";
import WishListProvider from "./_helper/ecommerce/wishlist/WishProvider";
import EmailProvider from "./_helper/email/EmailProvider";
import ProjectProvider from "./_helper/project-app/ProjectProvider";
import TodoProvider from "./_helper/todo-app/TodoProvider";
import TaskProvider from "./_helper/task-app/TaskProvider";
import LearningProvider from "./_helper/Leatning/LearningProvider";
import JobSearchProvider from "./_helper/JobSearch/JobSearchProvider";
import CustomProvider from "./_helper/customizer/CustomizerProvider";
import GalleryProvider from "./_helper/Gallery/GalleryProvider";
import TableProvider from "./_helper/Table/TableProvider";
import ChartistProvider from "./_helper/Chartist/ChartistProvider";
import ChartjsProvider from "./_helper/Chartjs/ChartProvider";
import GoogleChartProvider from "./_helper/GoogleChart/GoogleChartProvider";
import FAQProvider from "./_helper/Faq/FaqProvider";
import AnimationThemeProvider from "./_helper/AnimationTheme/AnimationThemeProvider";
import CustomizerProvider from "./_helper/customizer/CustomizerProvider";
import { MenuItemsContextProvider } from "./_helper/MenuItems/MenuItemsProvider";
import { getSessionId } from "./Component/Bots/sessionSetup";
import { connectWithSocketIOServer } from "./Component/Live Chats/Client/wss";
import { v4 as uuidv4 } from "uuid";
import appStore from "./Component/Live Chats/Client/AppStore";
import { toast } from "react-toastify";
import { PlanDetails } from "./api";
import { SocketContext } from "./Component/Live Chats/Context/socketContext";

function App() {
  const {setRoomId} = useContext(SocketContext);
  useEffect(() => {
    if (!sessionStorage.getItem("sessionUUID")) {
      console.log('sessionUUID create =.')
      sessionStorage.setItem("sessionUUID", uuidv4().toString());
    }
    if (sessionStorage.getItem("sessionUUID")) {
      setRoomId(getSessionId(sessionStorage.getItem("sessionUUID")));
      // getSessionId(sessionStorage.getItem("sessionUUID"));
    }
    connectWithSocketIOServer();
  }, []);
  return (
    <Fragment>
      <CustomizerProvider>
        <FAQProvider>
          <GoogleChartProvider>
            <ChartjsProvider>
              <ChartistProvider>
                <TableProvider>
                  <JobSearchProvider>
                    <LearningProvider>
                      <GalleryProvider>
                        <CustomProvider>
                          <TaskProvider>
                            <ContactProvider>
                              <TodoProvider>
                                <WishListProvider>
                                  <BookmarkProvider>
                                    <FilterProvider>
                                      <CartProvider>
                                        <ChatProvider>
                                          <EmailProvider>
                                            <ProductProvider>
                                              <ProjectProvider>
                                                <AnimationThemeProvider>
                                                  <MenuItemsContextProvider>
                                                    {" "}
                                                    <Routers />
                                                  </MenuItemsContextProvider>
                                                </AnimationThemeProvider>{" "}
                                              </ProjectProvider>
                                            </ProductProvider>
                                          </EmailProvider>
                                        </ChatProvider>
                                      </CartProvider>
                                    </FilterProvider>
                                  </BookmarkProvider>
                                </WishListProvider>
                              </TodoProvider>
                            </ContactProvider>
                          </TaskProvider>
                        </CustomProvider>
                      </GalleryProvider>
                    </LearningProvider>
                  </JobSearchProvider>
                </TableProvider>
              </ChartistProvider>
            </ChartjsProvider>
          </GoogleChartProvider>
        </FAQProvider>
      </CustomizerProvider>
    </Fragment>
  );
}
export default App;
