module.exports =
	{
	    run: function (creep) {

	        var stor = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
	        var sources = creep.room.find(FIND_SOURCES);

	        creep.memory.canMine = false;
	        creep.memory.canWork = false;

	        if (!creep.memory.canMine && !creep.memory.canWork) {
	            for (var i in sources) {
	                if (sources[i].energy > 1) {
	                    creep.memory.mine = sources[i];
	                    creep.memory.canMine = true;
	                }
	            }
	        }
	        if (creep.harvest(creep.memory.mine) == ERR_NOT_IN_RANGE && creep.memory.canMine == true && !creep.memory.canWork) {
	            creep.moveTo(creep.memory.mine);
	        }
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.canWork = true;
	            creep.memory.canMine = false;
	        }
	        if (creep.memory.canWork == true && !creep.memory.canMine) {
	            for (var x in stor) {
	                if (stor[x].store[RESOURCE_ENERGY] < stor[x].storeCapacity) {
	                    if (creep.transfer(stor[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                        creep.moveTo(stor[x]);
	                    }
	                }
	            }
	        }
	    }

	};