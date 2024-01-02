

export const validatorObj = {
    regExpressions: {
        color_code: new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        web_url: new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
    },

    regExpValidator: function(regx_type, target_value){
    return this.regExpressions[regx_type]?.test(target_value);
    },

    fileFormatValidator: function(fileName, validExtensionsArray){
        let fileExtension = fileName?.split(".")?.pop();
        console.log('fileExtension got', fileExtension);
        return validExtensionsArray?.includes(fileExtension);
    }

}