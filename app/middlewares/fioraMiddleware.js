import pluginConfig from '../plugins/config.js'

const fioraMiddleware = {
    dealFioraMessage: function(message){
        if(message.username === pluginConfig.PLUGIN_ROBOT){
            try{
                var fioraMsg = JSON.parse(message.content);
            } catch(err){
                return message;
            }
            if(typeof fioraMsg !== 'object'){
                return message;
            }
            if(fioraMsg.type === 'code'){
                fioraMsg.type = 'text';
                fioraMsg.content = '[code]';
            }
            var reg = /^https?:/;
            if(!reg.test(fioraMsg.avatar)){
                fioraMsg.avatar = pluginConfig.DEFAULT_AVATAR;
            }
            return {
                username: 'fiora-'+fioraMsg.name,
                avatar: fioraMsg.avatar,
                timestamp: message.timestamp,
                type: fioraMsg.type + 'Message',
                content: fioraMsg.content
            }
        }
        return message;
    }
}
export default fioraMiddleware;