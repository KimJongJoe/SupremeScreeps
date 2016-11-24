module.exports =
	{
	    run: function (creep) {

	        //finds the health of all structures in the room, returns below max health structures
	        var structs = creep.room.find(FIND_STRUCTURES, { filter: structure => structure.hits < structure.hitsMax });
	        structs.sort((a, b) => a.hits - b.hits);
	        //finds all  the construction sites in the room and sorts them by progress
	        var conSite = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: con => con.progress < con.progressTotal });
	        conSite.sort((a, b) => a.progress - b.progressTotal);
	        var hBase = Game.spawns.HB;
	        var ctrl = creep.room.controller;
	        //finds all extensions in the room, returns if they below max enegy capacity
	        var ext = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity) } });
	        var stor = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });

	        //looks through all containers in the room for energy, if they are empty, looks on the floor, if there is none, moves out of the way
	        if (creep.carry.energy < creep.carryCapacity && creep.memory.canWork == false) {
	            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
	            if (target) {
	                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(target);
	                }
	            }
	            else {
	                for (var x in stor) {
	                    if (stor[x].store[RESOURCE_ENERGY] > 0) {
	                        if (creep.withdraw(stor[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                            creep.moveTo(stor[x]);
	                        }
	                    }
	                    else if (creep.carry.energy > 0) {
	                        creep.memory.canWork = true;
	                    }
	                    else {
	                        creep.moveTo(38, 13);
	                    }
	                }
	            }
	        }

	        if (creep.carry.energy < 1) {
	            creep.memory.canWork = false;
	        }
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.canWork = true;
	        }
	        //builds
	        if (conSite.length > 0 && creep.memory.canWork == true) {
	            if (creep.build(conSite[0]) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(conSite[0]);
	            }
	        }
	        //repairs
	        if (conSite.length == 0 && structs.length > 0 && creep.memory.canWork == true) {
	            if (creep.repair(structs[0]) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(structs[0]);
	            }
	        }
	        //if builder has nothing to build or repair, does hauling stuff
	        if (conSite.length == 0 && structs.length == 0 && creep.memory.canWork == true) {
	            if (hBase.energy < hBase.energyCapacity) {
	                if (creep.transfer(hBase, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(hBase);
	                }
	            }
	            if (hBase.energy == hBase.energyCapacity && ext.length > 0) {
	                for (var x in ext) {
	                    if (creep.transfer(ext[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                        creep.moveTo(ext[x]);
	                    }
	                }
	            }
	            if (hBase.energy == hBase.energyCapacity && ext.length == 0) {
	                if (creep.transfer(ctrl, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(ctrl);
	                }
	            }
	        }
	    }
	};