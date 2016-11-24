module.exports =
	{
	    run: function (creep) {

	        var hBase = Game.spawns.HB;
	        var ctrl = creep.room.controller;
	        var ext = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity) } });
	        var stor = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });

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
	        if (hBase.energy < hBase.energyCapacity && creep.memory.canWork == true) {
	            if (creep.transfer(hBase, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(hBase);
	            }
	        }
	        if (hBase.energy == hBase.energyCapacity && ext.length > 0 && creep.memory.canWork == true) {
	            for (var x in ext) {
	                if (creep.transfer(ext[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(ext[x]);
	                }
	            }
	        }
	        if (hBase.energy == hBase.energyCapacity && ext.length == 0 && creep.memory.canWork == true) {
	            if (creep.transfer(ctrl, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(ctrl);
	            }
	        }
	    }

	};