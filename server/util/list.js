module.exports = {
    joinRooms: function(socket,roomList) {
        for(let i = 0; i < roomList.length; i++){
            socket.join(roomList[i]);
        }
    },
    getRoomNameArr: function(roomList){
        let arr = [];
        for(let i = 0;i< roomList.length; i++){
            
            arr.push(roomList[i]['name'])
        }
        console.log('roomList:',arr);
        return arr;
    },
    getRoomList: function(list){
        let rooms = {};
        for(let i = 0;i< list.length; i++){
            let roomName = list[i]['name'];
            if(!rooms[roomName]){
                rooms[roomName] = {
                    roomName: roomName,
                    avatar: list[i]['avatar'],
                    isPrivate: false
                }
            }
        }
        return rooms;
    },
    getUserList: function(list){
        let users = {};
        for(let i = 0;i< list.length; i++){
            let roomName = list[i]['from']['username'];
            if(!users[roomName]){
                users[roomName] = {
                    roomName: roomName,
                    avatar: list[i]['from']['avatar'],
                    isPrivate: true
                }
            }
        }
        return users;
    },
    selectOnlineUser: function(list){
        let onlineList = {};
        for(let i = 0; i<list.length; i++){
            if(list[i].online && !onlineList[list[i]['username']]){
                onlineList[list[i]['username']] = {
                    username: list[i]['username'],
                    avatar: list[i]['avatar'],
                    device: list[i]['device']
                }
            }
        }
        return onlineList;
    },
    getHistoryUsers: function(histories,owner){
        users = {};
        for(var i = 0; i < histories.length; i++){
            if(histories[i][owner]){
                if(!users[histories[i][owner]['username']]){
                    users[histories[i][owner]['username']] = {
                        username: histories[i][owner]['username'],
                        avatar: histories[i][owner]['avatar'],
                        device: histories[i][owner]['device']
                    }
                }
            }
        }
        return users;
    },
    getHistoryList: function(histories,owner,room){
        let messages = {};
        for(var i = 0; i < histories.length; i++){
            if(!messages[histories[i][room]]){
                messages[histories[i][room]] = [{
                    content: histories[i]['content'],
                    avatar: histories[i][owner]['avatar'],
                    username: histories[i][owner]['username'],
                    timestamp: histories[i]['timestamp'],
                    type: histories[i]['type']
                }]
            } else{
                messages[histories[i][room]].unshift({
                    content: histories[i]['content'],
                    avatar: histories[i][owner]['avatar'],
                    username: histories[i][owner]['username'],
                    timestamp: histories[i]['timestamp'],
                    type: histories[i]['type']
                });
            }
        }
        return messages;
    },
    getPrivateList: function(histories,owner,room){
        let messages = {};
        for(var i = 0; i < histories.length; i++){
            if(histories[i][owner]){
                if(!messages[histories[i][room]['username']]){
                    messages[histories[i][room]['username']] = [{
                        content: histories[i]['content'],
                        avatar: histories[i][owner]['avatar'],
                        username: histories[i][owner]['username'],
                        timestamp: histories[i]['timestamp'],
                        type: histories[i]['type']
                    }]
                } else{
                    messages[histories[i][room]['username']].unshift({
                        content: histories[i]['content'],
                        avatar: histories[i][owner]['avatar'],
                        username: histories[i][owner]['username'],
                        timestamp: histories[i]['timestamp'],
                        type: histories[i]['type']
                    });
                }
            }
        }
        return messages;
    }
}