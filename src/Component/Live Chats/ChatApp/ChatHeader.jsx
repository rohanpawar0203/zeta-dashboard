import React, { Fragment, useContext, useEffect, useState } from "react";
import { Media } from "reactstrap";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Btn, Image, LI, UL } from "../../../AbstractElements";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../Client/AppStore";
import { envConversationToServer } from "../Client/wss";
import { SocketContext } from "../Context/socketContext";

const ChatHeader = ({ viewConversation }) => {
  const { liveUser, setliveUser, checkValid } = useContext(ChatAppContext);
  const { userData } = appStore();
  const [conversationEnded, setConversationEnded] = useState(false);
  const { roomId, setRoomId } = useContext(SocketContext);

  const endingConversation = async () => {
    // console.log(
    //   "chatSessionId, firstName",
    //   viewConversation?.chatSessionId,
    //   liveUser?.customer?.firstName
    // );
    // await envConversationToServer(
    //   viewConversation?.chatSessionId,
    //   liveUser?.customer?.firstName
    // );
    // setliveUser(null);

    // console.log("RoomID", viewConversation?.chatSessionId);
    // setRoomId((roomId) => {
    //   console.log("Room", roomId);
    // });
  };

  // useEffect{() => {},[

  // ]}

  return (
    <Fragment>
      {liveUser && (
        <Media className="chat-header clearfix d-flex align-items-center">
          <Image
            attrImage={{
              className: "rounded-circle",
              src: `${UserProfile}`,
              alt: "",
            }}
          />
          <Media body>
            <div className="w-100 d-flex justify-content-between">
              <div className="about">
                <div className="name f-4">
                  {liveUser?.customer?.firstName &&
                  liveUser?.customer?.firstName !== " "
                    ? `${
                        liveUser?.customer?.firstName +
                        " " +
                        liveUser?.customer?.lastName
                      }`
                    : liveUser?.phoneNumber}
                  {liveUser && liveUser?.typing ? (
                    <span className="font-primary f-12"> Typing...</span>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="status digits">{selectedUserr ? (new Date(selectedUserr.updatedAt)).toLocaleString() : '5 May, 5:30 PM'}
            </div> */}
              </div>
              {
                <Btn
                  attrBtn={{
                    className: "btn-danger",
                    onClick: () => {
                      endingConversation();
                      // envConversationToServer(
                      //   viewConversation?.chatSessionId,
                      //   liveUser?.customer?.firstName
                      // );
                      // setliveUser(null);
                      // setTimeout(() => {
                      //   window.location.reload();
                      // }, 1000);
                    },
                  }}
                >
                  {"End Conversation"}
                </Btn>
              }
            </div>
          </Media>
        </Media>
      )}
    </Fragment>
  );
};
export default ChatHeader;
