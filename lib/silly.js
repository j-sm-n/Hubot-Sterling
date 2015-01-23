var seriousRooms = ('#serious,#serious2,serious3' || '').split(',');

module.exports = function(msg,seriousOnly){
    var originalSend = msg.send;
    msg.send = function(){
        var roomIsSerious = !!~seriousRooms.indexOf(this.message.room.toString());
        // console.log('received message in', this.message.room,'checking if in',seriousRooms,':',roomIsSerious,'serious only : ',seriousOnly);
        if(!seriousOnly && roomIsSerious){
            console.log('intercepted message : ' + Array.prototype.slice.call(arguments).join(',') + ', not silly enough.');
        } else if(seriousOnly && roomIsSerious){
            return originalSend.apply(this,arguments);
        } else if(!seriousOnly) {
            return originalSend.apply(this,arguments);
        }
    }
    return msg;
}