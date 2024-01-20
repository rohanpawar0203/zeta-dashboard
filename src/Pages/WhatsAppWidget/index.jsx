import React, { Fragment, useEffect } from "react";
import WhatsAppWidgetContent from "../../Component/WhatsAppWidget/WidgetContent";
import { Breadcrumbs } from "../../AbstractElements";

const WhatsAppWidget = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Whatsapp widget" />

      <WhatsAppWidgetContent />
    </Fragment>
  );
};
export default WhatsAppWidget;
