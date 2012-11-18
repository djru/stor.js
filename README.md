#Stor, A LocalStorage Helper Library

##About
Stor is a lightweight JavaScript library that aid and ease the use of localStorage. It includes set and get methods that obviate the need to deal with JSON parsing, allowing you to save objects to localStorage while maintaining code legibility and conciseness. Stor also includes advanced search functionality, enabling filtering using regex and multiple terms, while also providing search utility for both keys and values.

##Why
Stor was a product of an insufferably monotonous Saturday afternoon.

##Suggestion
If you'd like to request a feature, [email me](mailto:orzogen@gmail.com).

##Use
Entries can be written to localStorage by calling ```create(KEY, VALUE)``` Values can be strings: ```Stor.create("Name", "Dan")```, or objects: ```Stor.create("numbers", [1,4,14]])```.
	
Values can be retrieved using ```find(KEY)```. Parameters can be strings: ```Stor.find("Name")```, arrays of strings: ```Stor.find(["Name","Age"])```, or regular expressions: ```Stor.find(/N.{1,}/i)```. In cases for which multiple values are returned, they will be returned in an array. 

Keys can be queried using values in a manner identical to that of ```find()```, using the ```where()``` function. This will return either a single key or an array of keys.

An array of all keys can be generated using the ```keys()``` function.

A function can be mapped over all pairs in localStorage using the ```map()``` function; A hash of including each pair that has been acted upon will be retuned.
