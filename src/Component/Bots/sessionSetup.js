import { v4 as uuidv4 } from "uuid";

const generateSessionId = () => {
  return uuidv4();
};

export const getSessionId = (parameter) => {
  // Check if a session exists for the parameter
  console.log("Parameter", parameter);
  const sessions = JSON.parse(sessionStorage.getItem("sessions")) || null;
  if (sessions !== null) {
    const existingSession = Object.values(sessions[0]).find(
      (
        session //session.parameter === parameter
      ) => session.parameter === parameter
      //   {
      //     console.log(
      //       "parameter",
      //       parameter,
      //       "session.parameter",
      //       session.parameter,
      //       "session.parameter === parameter",
      //       session.parameter === parameter
      //     );
      //   }
    );

    if (
      existingSession &&
      Date.now() - existingSession.lastUsed <= 30 * 60 * 1000
    ) {
      // If session exists and is valid

      existingSession.lastUsed = Date.now();
      // console.log(
      //   "ExistingSession",
      //   Object.keys(sessions[0]).find((key) => {
      //     //sessions[key] === existingSession;
      //     console.log("sessions[key]:", key);
      //   })
      // );
      return Object.keys(sessions[0]).find(
        (key) => sessions[0][key] === existingSession
      );
    }
  } else {
    // console.log("Existing Sesson False");

    // Create a new session linked to the parameter
    const sessionId = generateSessionId();
    // console.log("generatedsessionID", sessionId);
    let localSession = [];
    localSession = [
      {
        [sessionId]: {
          parameter: parameter,
          lastUsed: Date.now(),
        },
      },
    ];
    sessionStorage.setItem("sessions", JSON.stringify(localSession));
    // console.log(
    //   "sessionStr",
    //   JSON.stringify(sessionStorage.getItem("sessions"))
    // );

    return sessionId;
  }
};
