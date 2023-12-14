import React from 'react'
import FacebookLogin, {
  FacebookLoginClient,
} from "@greatsumini/react-facebook-login";

const Integrations = () => {
  return (
    <div className="d-flex flex-column align-items-left">
    <div className='mb-2'>
        <h3 className="mt-4 mb-1">Available Integrations</h3>
        <p className="mb-2">Seamlessly integrate and supercharge your Bot</p>
    </div>
    <div className='mb-2'>
        <h3 className="mt-4 mb-1"> Integrate Whatsapp Business Api</h3>
        <p className="mb-2">
        Integrating the WhatsApp Business API can be highly
                    beneficial for businesses, depending on their specific needs
                    and communication strategies.
        </p>
                        <FacebookLogin
                        appId="863075105199057"
                        autoLoad={false}
                        cssClass="my-facebook-button-class"
                        icon="fa-facebook"
                        fields="name,email,picture"
                        version="v17.0"
                        xfbml={true}
                        style={{
                          backgroundColor: "#4267b2",
                          color: "#fff",
                          fontSize: "16px",
                          padding: "12px 24px",
                          border: "none",
                          borderRadius: "4px",
                          marginTop: "10px ",
                        }}
                        // Make sure this prop is supported
                        loginOptions={{
                          config_id: "709854517281965",
                          response_type: "code",
                          override_default_response_type: true,
                          extras: {
                            setup: {},
                          },
                          ignoreSdkError: true,
                        }}
                        onSuccess={(response) => {
                          console.log("Login Success!", response);
                        }}
                        onFail={(error) => {
                          console.log("Login Failed!", error);
                        }}
                        onProfileSuccess={(response) => {
                          console.log("Get Profile Success!", response);
                        }}
                      />
    </div>
</div>
  )
}

export default Integrations