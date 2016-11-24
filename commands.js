Game.spawns.HB.createCreep([WORK, CARRY, CARRY, CARRY, MOVE],null, {role: 'trucker'})
Game.spawns.HB.createCreep([WORK, CARRY, CARRY, CARRY, MOVE],null, {role: 'builder'})
Game.spawns.HB.createCreep([WORK, WORK, CARRY, MOVE],null, {role: 'miner'})

//normal creep production
Game.spawns.HB.memory.state = 0;
//emergency creep production
Game.spawns.HB.memory.state = 1;