#Stor, A LocalStorage Helper Library

##About
Stor is a lightweight JavaScript library that aid and ease the use of localStorage. It includes set and get methods that obviate the need to deal with JSON parsing, allowing you to save objects to localStorage while maintaining code legibility and conciseness. Stor also includes advanced search functionality, enabling filtering using regex and multiple terms, while also providing search utility for both keys and values.

##Why
Stor was a product of an insufferably monotonous Saturday afternoon.

##Suggestion
If you'd like to request a feature, [email me](mailto:orzogen@gmail.com).

##Use
Entries can be written to localStorage by calling ```create(KEY, VALUE)``` Values can be strings: ```Stor.create("Name", "Dan")```, or objects: ```Stor.create("numbers", [1,4,14]])```. If no key is specified, an random 8-digit string will be generated and set as the key. Calling ```create()``` will return an two-index array with the key and value.

Values can be retrieved using ```find(KEY)```. Parameters can be strings: ```Stor.find("Name")```, arrays of strings: ```Stor.find(["Name","Age"])```, or regular expressions: ```Stor.find(/N.{1,}/i)```. In cases for which multiple values are returned, they will be returned in an array. 

Keys can be queried using values in a manner identical to that of ```find()```, using the ```where()``` function. This will return either a single key or an array of keys. Please note that objects are converted to strings when they are stored, and using a regex as a parameter may return stringified objects. Use with discretion.

An array of all keys can be generated using the ```keys()``` function.

A function can be mapped over all pairs in localStorage using the ```map()``` function, which returns a hash of each pair that has been acted upon.

##Examples
```
Stor.create("Person1", "Dan Ruswick")
	=> ["Person1", "Dan Ruswick"]
	
Stor.create("Person2", "John Smith")
	=> ["Person2", "John Smith"]
	
Stor.create("Person3", "Johnny Appleseed")
	=> ["Person3", "Johnny Appleseed"]

Stor.create("Dan Ruswick", {age: 16, profession: "unemployed"})
	=> ["Dan Ruswick", "{age: 16, profession: "unemployed"}"]

Stor.create("Aristotle", {age: 2396, profession: ["ethicist","writer","poet","Mysogynyst"]})
	=> ["Aristotle", "{age: 2396, profession: ["ethicist","writer","poet","Mysogynyst"]}"]

Stor.create("Camus", {age: 99, profession: "existentialist"})
	=> ["Camus", "{age: 99, profession: "existentialist"}"]

Stor.find("Person1")
	=> ["Dan Ruswick"]

Stor.find(["Dan Ruswick","Aristotle"])
	=> [{age: 16, profession: "unemployed"},{age: 2396, profession: ["ethicist","writer","poet","Mysogynyst"]}]
	
Stor.find(/[dc].{1,}/i) // Matches keys "Dan Ruswick" and "Camus"
	=> ["{age: 16, profession: "philosopher"}", "{age: 99, profession: "existentialist"}"]

Stor.where("John Smith")
	=> ["Person1"]

Stor.where(["John Smith", "Johnny Appleseed"])
	=> ["Person2", Person3]

Stor.where(/[J].{1,}/) //Matches John Smith and Johnny Appleseed
	=> ["Person2", Person3]
	
Stor.keys()
	=> ["Person1", "Person2", "Person3", "Dan Ruswick", "Aristotle", "Camus", ]




```
