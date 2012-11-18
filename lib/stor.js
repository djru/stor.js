var Stor = function(){};

"use strict";

Stor.getId = // METHOD FOR GENERATING RANDOM ID
	function(){
		var id = Math.random(10).toString(16).split(".")[1];
		return (localStorage.getItem(id)) ? Stor.getId() : id;
	};

Stor.create = Stor.update = // CREATES A LOCALSTORAGE OBJECT, ASSIGNING RANDOM ID FOR KEY IF NOT PROVIDED
	function(k, v){
		var key = k, value = v;
		
		if(!!!value){value = key; key = Stor.getId();} // IF ONLY 1 PARAMATER IS GIVEN, ASSUME IT'S THE VALUE AND ASSIGN A RANDOM KEY
		value = JSON.stringify(value);
		localStorage.setItem(key, value);
		return [key, value];
	};
	
Stor.remove = 	
	function(k){
		var keys = Stor.keys();
		
		if(typeof k == "string" && keys.indexOf(k) != -1){ // IF SEARCH PARAM IS A STRING TO SEARCH AGAINST
			var value = Stor.find(k);
			localStorage.removeItem(k);
			return [k, value];
		}
		
		if(k instanceof Array){ // IF SEARCH PARAM IS AN ARRAY OF TERMS TO SEARCH AGAINST
			var deletedPairs = {};
			for(var termIndex in k){
				if(keys.indexOf(k[termIndex]) != -1){
					localStorage.removeItem(Stor.find(k[termIndex]));
					deletedPairs[k[termIndex]] = Stor.find(k[termIndex]);
				}
			}
			return deletedPairs;
		}
		
		if(k instanceof RegExp){ // IF SEARCH PARAM IS A REGEX TO SEARCH AGAINST
			var deletedPairs = {};
			for(var key in keys){
				if(keys[key].match(k)){
					localStorage.removeItem(Stor.find(keys[key]));
					deletedPairs[keys[key]] = Stor.find(keys[key]);
				}
			}
			return deletedPairs;
		}
		
	};
	

	
Stor.keys = Stor.arrayOfKeys = // RETURNS AN ARRAY OF ALL KEYS
	function(){
		var keys = [];
		for(var key in localStorage){
			keys.push(key);
		}
		return keys;
	};

Stor.find = Stor.fetchValueFromKey = // GET ITEM FROM STORAGE
	function(k){
		var keys = Stor.keys();
		
		if(typeof k == "string"){ // IF SEARCH PARAM IS A STRING TO SEARCH AGAINST
			return JSON.parse(localStorage.getItem(k));
		}
		
		if(k instanceof Array){ // IF SEARCH PARAM IS AN ARRAY OF TERMS TO SEARCH AGAINST
			var foundPairs = {};
			for(var termIndex in k){
				if(keys.indexOf(k[termIndex]) != -1){
					foundPairs[termIndex[k]] = Stor.find(k[termIndex]);
				}
			}
			return foundPairs;
		}
		
		if(k instanceof RegExp){ // IF SEARCH PARAM IS A REGEX TO SEARCH AGAINST
			var foundPairs = {};
			for(var key in keys){
				if(keys[key].match(k)){
					foundPairs[keys[key]] = Stor.find(keys[key]);
				}
			}
			return foundPairs;
		}
		
	};

Stor.where = Stor.whereValueEquals = // SEARCH FOR KEYS BASED ON CORRESPONDING VALUES
	function(p){	
		var foundPairs = {};
		if(typeof p == "string"){ // IF SEARCH PARAM IS A STRING TO SEARCH AGAINST
			var keys = Stor.arrayOfKeys();
			for(var key in keys){
				if(Stor.find(keys[key]).toLowerCase() === p.toLowerCase()){
					foundPairs[keys[key]] = Stor.find(keys[key]);
				}
			}
		}
		
		if(p instanceof Array){ // IF SEARCH PARAM IS AN ARRAY OF TERMS TO SEARCH AGAINST
			var keys = Stor.keys();
			for(var termIndex in p){
				for(var key in keys){
					if(Stor.find(keys[key]).toLowerCase() === p[termIndex].toLowerCase()){
						foundPairs[keys[key]] = Stor.find(keys[key]);
					}
				}
			}
		}
		
		if(p instanceof RegExp){ // IF SEARCH PARAM IS A REGEX TO SEARCH AGAINST
			var keys = Stor.keys();
			for(var key in keys){
				console.log(keys[key]);
				try{
					if(Stor.find(keys[key]).match(p)){
						foundPairs[keys[key]] = Stor.find(keys[key]);
					}
				}
				catch(e){}
			}
		}
		
		
		return foundPairs;
	};

Stor.map =
	function(fn){
		var newPairs = {}, keys = Stor.keys();
		for (var key in keys){
			var result = fn(Stor.fetchValueFromKey(keys[key]));
			newPairs[keys[key]] = result;
		}
		return newPairs;
	};

	
/* TESTING
Stor.create("Dan", "Ruswick");
Stor.create("Paul", "Irish");
Stor.create("Clark", "Kent");
Stor.where(/[di].{1,}/i);
Stor.where(["Ruswick", "Zuckerburg"]);
Stor.find(/[di].{1,}/i);
Stor.map(function(e){return e + "!"});
*/