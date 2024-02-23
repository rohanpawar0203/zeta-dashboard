import React, { Fragment, useContext } from "react";
import { Button, Media } from "reactstrap";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL } from "../../../AbstractElements";
import UserProfile from "../../../assets/images/user/userProfile.png";
import moment from "moment-timezone";

const ChatHeader = () => {
  const { selectedUserr } = useContext(ChatAppContext);
  const getLocaleTime = (utcTimestamp) => {
    return moment
      .utc(utcTimestamp)
      .tz("Asia/Kolkata")
      .format("DD-MM-YYYY h:mm a");
  };
  console.log(
    "SelectedUSer",
    selectedUserr,
    selectedUserr.chat.map((c) => {
      console.log("Chat", JSON.parse(c.message));
    })
  );

  const export2Txt = () => {
    const data = selectedUserr.chat.map((c) => {
      console.log("c.from", c.from, c.from === "USER", getLocaleTime(c.time));
      return `${getLocaleTime(c.time)} - ${
        c.from === "USER"
          ? selectedUserr.customer
            ? selectedUserr.customer.firstName !== ""
              ? selectedUserr.customer.firstName +
                " " +
                selectedUserr.customer.lastName
              : selectedUserr.customer.phoneNumber
            : selectedUserr.chatSessionId
          : c.from
      } : ${JSON.parse(c.message).message}`.toString();
    });

    const chatText = data.join("\n");
    // Create a Blob with the text content
    const blob = new Blob([chatText], { type: "text/plain" });

    // Create a link element
    const link = document.createElement("a");

    // Set the link's attributes
    link.href = window.URL.createObjectURL(blob);
    link.download = `${selectedUserr.phoneNumber}.txt`;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();
  };

  return (
    <Fragment>
      {selectedUserr && (
        <Media className="chat-header clearfix d-flex align-items-center">
          <Image
            attrImage={{
              className: "rounded-circle",
              src: `${UserProfile}`,
              alt: "",
            }}
          />
          <Media body>
            <div className="about">
              <div className="name f-4">
                {selectedUserr
                  ? selectedUserr?.customer?.firstName &&
                    selectedUserr?.customer?.firstName !== ""
                    ? `${
                        selectedUserr?.customer?.firstName +
                        " " +
                        selectedUserr?.customer?.lastName
                      }`
                    : selectedUserr?.phoneNumber
                  : ""}
                {selectedUserr && selectedUserr.typing ? (
                  <span className="font-primary f-12"> Typing...</span>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="status digits">{selectedUserr ? (new Date(selectedUserr.updatedAt)).toLocaleString() : '5 May, 5:30 PM'}
            </div> */}
            </div>
          </Media>
          <Button onClick={() => export2Txt()}>Download</Button>
        </Media>
      )}
    </Fragment>
  );
};
export default ChatHeader;
