module.exports = {
    run: function (creep) {
        
        var goAway = new RoomPosition(30, 30, 'W7N4');
        //creep.say('a');
        if(!creep.memory.isAway) {
            creep.moveTo(goAway);
        }
        if(creep.pos == goAway) {
            creep.say('b');
        }
    }
};