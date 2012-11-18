var Stor = function(){};

"use strict";

Stor.getId = // METHOD FOR GENERATING RANDOM ID
	function(){
		var id = Math.random(10).toString(16).split(".")[1];
		return (localStorage.getItem(id)) ? Stor.getId() : id;
	};

Stor.create = // CREATES A LOCALSTORAGE OBJECT, ASSIGNING RANDOM ID FOR KEY IF NOT PROVIDED
	function(k, v){
		var key = k, value = v;
		
		if(!!!value){value = key; key = Stor.getId();} // IF ONLY 1 PARAMATER IS GIVEN, ASSUME IT'S THE VALUE AND ASSIGN A RANDOM KEY
		value = JSON.stringify(value);
		localStorage.setItem(key, value);
		return [key, value];
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
		var keys = Stor.keys(), foundValues = [];
		if(typeof k == "string"){ // IF SEARCH PARAM IS A STRING TO SEARCH AGAINST
			return JSON.parse(localStorage.getItem(k));
		}
		
		if(k instanceof Array){ // IF SEARCH PARAM IS AN ARRAY OF TERMS TO SEARCH AGAINST
			var searchTerms = k;
			for(var termIndex in searchTerms){
				for(var key in keys){
					if(keys[key].toLowerCase() === searchTerms[termIndex].toLowerCase()){foundKeys.push(JSON.parse(localStorage.getItem(keys[key])));}
				}
			}
			return foundValues;
		}
		
		if(k instanceof RegExp){ // IF SEARCH PARAM IS A REGEX TO SEARCH AGAINST
			for(var key in keys){
				if(keys[key].match(k)){foundValues.push(JSON.parse(localStorage.getItem(keys[key])));}
			}
			return foundValues;
		}
		
	};

Stor.where = Stor.whereValueEquals = // SEARCH FOR KEYS BASED ON CORRESPONDING VALUES
	function(p){
		var foundKeys = [];
		
		if(typeof p == "string"){ // IF SEARCH PARAM IS A STRING TO SEARCH AGAINST
			var searchTerm = p.toLowerCase(), keys = Stor.arrayOfKeys();
			for(var key in Stor.keys()){
				if(Stor.fetchValueFromKey(keys[key]).toLowerCase() === searchTerm){foundKeys.push(keys[key]);}
			}
		}
		
		if(p instanceof Array){ // IF SEARCH PARAM IS AN ARRAY OF TERMS TO SEARCH AGAINST
			var searchTerms = p, keys = Stor.keys();
			for(var termIndex in searchTerms){
				for(var key in Stor.arrayOfKeys()){
					if(Stor.fetchValueFromKey(keys[key]).toLowerCase() === searchTerms[termIndex].toLowerCase()){foundKeys.push(keys[key]);}
				}
			}
		}
		
		if(p instanceof RegExp){ // IF SEARCH PARAM IS A REGEX TO SEARCH AGAINST
			var keys = Stor.keys();
			for(var key in Stor.arrayOfKeys()){
				if( Stor.fetchValueFromKey( keys[key] ).match(p) ) { foundKeys.push( key[key] ); }
			}
		}
		
		return foundKeys;
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