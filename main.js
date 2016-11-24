module.exports.loop = function () {

    //```variables//
    var hBase = Game.spawns.HB;
    var roleBuilder = require('role.builder');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var roleTrucker = require('role.trucker');
    var truckers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trucker');
    var roleMiner = require('role.miner');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var roleClaimer = require('role.claimer');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var roleFighter = require('role.fighter');
    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    var roleEmergency = require('role.emergency');
    var emergencycreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergency');
    
    console.log(builders.length + '-b');
    console.log(truckers.length + '-t');
    console.log(miners.length + '-m');
    console.log(claimers.length + '-c');
    console.log(fighters.length + '-f');
    console.log(emergencycreeps.length + '-e');
    console.log(Game.spawns.HB.memory.state + '- state');
    
    //```clears the memory of dead creeps//
    for (var x in Memory.creeps) {
        if (Game.creeps[x] == undefined) {
            delete Memory.creeps[x];
        }
    }
    
    //```switch for production: case 0 = normal, case 1 = emergency//
    switch (Game.spawns.HB.memory.state) {
        //```case 0//
        case 0:
            if (truckers.length < 5) {
                if (hBase.canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null, { role: 'trucker' });
                    break;
                }
                else {
                    hBase.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, { role: 'trucker' });
                    break;
                }
            }
            if (builders.length < 5) {
                if (hBase.canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null, { role: 'builder' });
                    break;
                }
                else {
                    hBase.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, { role: 'builder' });
                    break;
                }
            }
            if (miners.length < 5) {
                if (hBase.canCreateCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], null, { role: 'miner' });
                    break;
                }
                else {
                    hBase.createCreep([WORK, WORK, CARRY, MOVE], null, { role: 'miner' });
                    break;
                }
            }
            if (fighters.length < 5) {
                if (hBase.canCreateCreep([ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE], null, { role: 'fighter' });
                    break;
                }
                else {
                    hBase.createCreep([ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE], null, { role: 'fighter' });
                    break;
                }
            }
            else {
                break;
            }/*
            if (claimers.length < 1) {
                if (hBase.canCreateCreep([CLAIM, MOVE, MOVE, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([CLAIM, CARRY, CARRY, MOVE], null, { role: 'claimer' });
                }
            }*/
        //```case 1//
        case 1:
            if (emergencycreeps.length < 10) {
                if (hBase.canCreateCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], null, { role: 'emergency', findSource: true});
                    break;
                }
                else {
                    hBase.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, { role: 'emergency', findSource: true});
                    break;
                }
            }
            if (fighters.length < 10) {
                if (hBase.canCreateCreep([ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, ATTACK, TOUGH, TOUGH, MOVE, MOVE], null) == OK) {
                    hBase.createCreep([ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE], null, { role: 'fighter' });
                    break;
                }
                else {
                    hBase.createCreep([ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE], null, { role: 'fighter' });
                    break;
                }
            }
            else {
                break;
            }
    }
    
    //```goes through all the creeps and tells them to do their jobs//
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'trucker') {
            roleTrucker.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if (creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if (creep.memory.role == 'emergency') {
            roleEmergency.run(creep);
        }
    }
}
