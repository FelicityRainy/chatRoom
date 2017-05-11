const User = require('../models/user-mongo')
    , Private = require('../models/private-mongo');
module.exports = {
    getPrivateHistory: function *(info,cb) {
        let privateHistories = [];
        let fromUser = yield User.findOne({username: info.fromUser});
        let toUser = yield User.findOne({username: info.toUser});
        if(fromUser && toUser){
            let privateMessage = yield Private.find({
                $or: [{from: fromUser._id, to: toUser.username},{from: toUser._id, to: fromUser.username}],
                timestamp: {'$lt': info.timestamp}
            },null, {sort:'-timestamp',limit: info.limit}).populate('from');
            if(privateMessage){
                for(let i = 0; i < privateMessage.length; i++){
                    privateHistories.unshift({
                        avatar: privateMessage[i]['from']['avatar'],
                        content: privateMessage[i]['content'],
                        username: privateMessage[i]['from']['username'],
                        timestamp: privateMessage[i]['timestamp'],
                        type: privateMessage[i]['type']
                    })
                }
            }
        }
        cb({histories: privateHistories});
    } 
}