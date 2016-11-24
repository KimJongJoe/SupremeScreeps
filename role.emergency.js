//////new one

module.exports =
	{
	    run: function (creep) {
	        /*
	        if(creep.ticksToLive > 0) {
	            creep.suicide();
	        }*/
	        var hBase = Game.spawns.HB;
	        var ctrl = creep.room.controller;
	        var sources = creep.room.find(FIND_SOURCES);
	        for (var i in sources) {
	            if (sources[i].energy > 1) {
	            var mine = sources[i];
	            }
	        }

	        //finds the health of all structures in the room, returns below max health structures
	        var structs = creep.room.find(FIND_STRUCTURES, { filter: structure => structure.hits < structure.hitsMax });
	        structs.sort((a, b) => a.hits - b.hits);

	        //finds all the construction sites in the room and sorts them by progress
	        var conSite = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: con => con.progress < con.progressTotal });
	        conSite.sort((a, b) => a.progress - b.progressTotal);

	        //finds all extensions in the room, returns if they below max enegy capacity
	        var ext = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity) } });

	        //checks to see if destinations are full
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.canMine = false;
	            creep.memory.isFull = true;
	        }
	        if (creep.carry.energy < 1) {
	            creep.memory.findSource = true;
	            creep.memory.canMine = false;
	            creep.memory.isFull = false;
	        }
	        if (hBase.energy == hBase.energyCapacity) {
	            creep.memory.baseFull = true;
	        }
	        if (hBase.energy < hBase.energyCapacity) {
	            creep.memory.baseFull = false;
	        }
	        
	        //find a source
	        if (creep.memory.findSource == true) {
	            creep.memory.canMine = true;
	            creep.memory.findSource = false;
	        }
	        
	        //mine source
	        if (creep.memory.canMine == true) {
	            if (creep.harvest(mine) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(mine);
	            }
	        }
	        
	        //when full, take energy to spawner
	        if (creep.memory.isFull == true && !creep.memory.baseFull) {
	            if (creep.transfer(hBase, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(hBase);
	            }
	        }
	        
	        //if the spawner is full, take energy to the extensions
	        if (creep.memory.isFull == true && creep.memory.baseFull == true && ext.length > 0) {
	            for (var b in ext) {
	                if (creep.transfer(ext[b], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(ext[b]);
	                }
	            }
	        }
	        
	        //if the extensions are full, build
	        if (creep.memory.isFull == true && creep.memory.baseFull == true && ext.length == 0 && conSite.length > 0) {
	            for (var c in conSite) {
	                if (creep.build(conSite[c]) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(conSite[c]);
	                }
	            }
	        }
	        
	        //if there is nothing to build, repair
	        if (creep.memory.isFull == true && creep.memory.baseFull == true && ext.length == 0 && conSite.length == 0 && structs.length > 0) {
	            for (var d in structs) {
	                if (creep.repair(structs[d]) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(structs[d]);
	                }
	            }
	        }
	        
	        //if there is nothing to repair, take energy to the control
	        if (creep.memory.isFull == true && creep.memory.baseFull == true && ext.length == 0 && conSite.length == 0 && structs.length == 0) {
	            if (creep.transfer(ctrl, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(ctrl);
	            }
	        }
	    }
	};