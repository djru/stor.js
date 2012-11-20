#Stor, A LocalStorage Helper Library

##About
Stor is a lightweight JavaScript library that aid and ease the use of localStorage. It includes set and get methods that obviate the need to deal with JSON parsing, allowing you to save objects to localStorage while maintaining code legibility and conciseness. Stor also includes advanced search functionality, enabling filtering using regex and multiple terms, while also providing search utility for both keys and values. Stor is not an ORM, nor does it make use of proprietary objects. It is simply a collection of functions that make interfacing with localStorage more efficient and easier. 

##Why
Stor was a product of an insufferably monotonous Saturday afternoon.

##Suggestion
If you'd like to request a feature, [email me](mailto:orzogen@gmail.com).

##Use
All functions are properties of the ```Stor2``` object.

Entries can be written to localStorage by calling ```create(KEY, VALUE)```. Values can be strings: ```create("Name", "Dan")```, or objects: ```create("numbers", [1,4,14]])```. If no key is specified, an random 8-digit string will be generated and set as the key. Calling ```create()``` will return a two-index array with the key and value.

Entries can be deleted using the ```remove()``` function. This function accepts a single string as a parameter and will delete the entrie for which that string is the key. This function will return a two-index array with the deleted key and value.

Pairs can be queried based on their key by using ```find(KEY)```. Parameters can be strings: ```find("Name")```, arrays of strings: ```find(["Name","Age"])```, or regular expressions: ```find(/N.{1,}/i)```. If only a single key is specified as a parameter, the returned value will be the value that corresponds to that key. In cases for which multiple parameters are specified, results will be returned in a hash of keys and values. 

Pairs can also be queried based on their value in a manner similar to that of ```find()```, using the ```where()``` function. This will return a hash of keys and values that meet the search criterion. Please note that objects are converted to strings when they are stored (this is a major shortcoming of localStorage in general), and using a regex as a parameter may return stringified objects. Use with discretion.

An array of all keys can be generated using the ```keys()``` function.

A function can be mapped over all pairs in localStorage using the ```map()``` function, which returns a hash of each pair that has been acted upon.

##Examples
```
Stor.create("Person1", "Dan Ruswick")  
	=> ["Person1", "Dan Ruswick"]
	
Stor.create("DR")  
	=> ["f31273d5", "DR"]
	
Stor.create("Dan", {name: "Dan Ruswick", age: 16, profession: "writer"})
	=> ["Dan", {name: "Dan Ruswick", age: 16, profession: "writer"}]
	
Stor.remove("Dan")
	=> ["Dan Ruswick", {name: "Dan Ruswick", age: 16, profession: "writer"}]

Stor.find("Person1")
	=> ["Dan Ruswick"]

Stor.find(["Dan", "Aristotle"])
	=> { "Dan" : {name: "Dan Ruswick", age: 16, profession: "writer"}, "Aristotle" : {name: "Aristotle", age: 2396, profession: ["ethicist","writer","poet","misogynist"]} }
	
Stor.find(/[dc].{1,}/i) // Matches keys "Dan" and "Camus"
	=> { "Dan" : {name: "Dan Ruswick", age: 16, profession: "writer"}, "Camus" : {name: "Albert Camus", age: 99, profession: "existentialist"} }

Stor.where("Dan Ruswick")
	=> ["Person1", "Dan Ruswick"]

Stor.where(["John Smith", "Johnny Appleseed"])
	=> { Person3: "John Smith", Person2: "Johnny Appleseed" }

Stor.where(/[J].{1,}/) //Matches John Smith and Johnny Appleseed
	=> { Person3: "John Smith", Person2: "Johnny Appleseed" }
	
Stor.keys()
	=> ["Person1", "Person2", "Person3", "Dan Ruswick", "Aristotle", "Camus", ]

Stor.map(function(value){if(typeof value == "string"){return value + "!"}})
	=> { Person1: "Dan Ruswick!", Person2: "Johnny Appleseed!", Person3: "John Smith!" }
```
##Todo
1. Allow searching by value using a hash of values as the search parameter.
