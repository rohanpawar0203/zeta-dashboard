import {whatsAppTemplates} from '../Templates/WhatsApp';


export const templateController = {
    whatsApp: whatsAppTemplates,

    sendTemplateType: function(social, template){
        return this[social][template];
    }
}