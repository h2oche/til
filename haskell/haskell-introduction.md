# haskell introduction #1
-
### what is haskell?
* purely functional programming language
	* tell it what stuff is
	* function has no side-effects
	* referential transparency
* lazy evaluation
	* allows you to think of programs a s a series of transformations on data
* statically typed
	* type inference
* elegant and consise
	* using a lot of high level concepts -> shorter code, easy maintaining, less bugs
* use GHC compiler

### Basic
-
* operator
	* numeric function : almost infix
		* +, -, div ...	
	* == : equal, /= : not equal
		* only valid if two parameters have same type
	* &&, ||, not : boolean operator
		* True, False
* function
	* call a function by putting a space after function name
		* testFunc a b
	* define a function
		* testFunc a b = a * b
	* function call has the highest precedence
	* can use ' to function name
		* denote a strict version of a function
		* slightly modified version of a function
	* function with 2 parameters can be called infix style with backtict
		* div 92 10 equals 92 \`div\`
* if then else
	* can't skip else statement
	* is expression : always return a value

* list
	* homogenous data structure
	* string is syntactic sugar for character list
		* "hello" == ['h','e','l','l','o']
	* [1,2,3] is syntactic sugar for 1:2:3:[]
* list operator
	* ++ : append two lists
		* has to walk through the whole list on the left side
	* : : putting something at the beginnig of a list
	* !! : get an element out of a list by index
	* >, <=, <, >=, == : compare lists in lexicographical order
* list function
	* head : return list's first element
	* tail : return list excluding its first element
	* last : return list's last element
	* init : return list excluding its last element
	* length : return legnth of list
	* null : check if list is empty
	* reverse : reverse list
	* take : return list that extracts elements in original list by given number
	* drop : return list that drops elements in original list by given number
	* maximum, mininum : return max/min element
	* sum, product : return sum/product of elements in list
	* elem : check if given element is in a list
* ranges
	* [1..5] == [1,2,3,4,5]
	* ['a'..'d'] == ['a','b','c','d']	
	* [2,4..10] == [2,4,6,8,10]
	* list from 20 to 1
		* not [20..1]
		* but [20,19..1]
	* [2,4..] : infinite list
* infinite list function
	* cycle : repeat list forever
		* cycle [1,2,3] == [1,2,3,1,2,3,...]
	* repeat : repeat single element
		* repeat 3 == [3,3,3,3,3,3,..]
	* replicate : use when you wnat some number of the same element in a list
		* replicate 3 10 == [10,10,10]
* list comprehension
	* [x*2 | x <- [1..5]] == [2,4,6,8,10]
	* [x\*2 | x <- [1..10], x\*2 > 10] == [12,14,16,18,20]
	* can include multiple predicates
		* [x | x <- [1..5], x /= 1, x /= 3] == [2,4,5]
	* can include multiple lists
		* produce all combinations of given lists and join them
		* [x*y | x <- [1,2], y <- [3,4]] == [3,4,6,8]
	* length' xs = sum [1 | _ <- xs]
		* _ : don't care what we'll draw from the list
* tuple
	* don't have to be homogenous
	* fst : takes a pair and returns its first component
		* fst (8,11) == 8
	* snd : takes a pair and returns second component
		* snd ("wow", False) == False
	* zip : produce a list of pairs
		* zip [1,2,3] [5,5,5] == [(1,5),(2,5),(3,5)]
		* longer list simply gets cut off to match the length of the shorter one

### Types, Typeclassses
* static type system
	* everything in Haskell has a type
	* complier can reason quite a lot about your program
	* Haskell has type inference feature
	* also function has a type
		* declare function type except writing very short functions
	* function declare example
		* removeNonUppercase :: [Char] -> [Char]
		* removeNonUppercase st = [c | c <- st, c \`elem\` ['A'..'Z']]
		* addThree :: Int -> Int -> Int -> Int
		* addThree x y z = x + y + z
* common types
	* Int : Integer with bounds (bounds depends on machine)
	* Integer : Integer with no bound
	* Float : real floating point with single precision
	* Double : real floating point with double precision
	* Bool : True or False
	* Char : Character, denoted by single quotes
		* String == [Char]
	* Tuple
	* Function
	* List
* type variable
	* :t head -> head :: [a] -> a
		* a can be of any type
	* functions which have type variables are called **polymorphic functions**
* typeclasses
	* sort of **interface** that defines some behavior
	* :t (==) -> (==) :: (Eq a) => a -> a -> Bool
		* everything before => symbol is called **class contraint**
	* Eq : types that support equality testing
	* Ord : types that have an ordering
		* compare : takes two Ord members and returns an GT, LT, EQ
	* Show : types that can be presented as strings
		* show : takes a value and presents it to as a string
	* Read : opposite typeclass of Show
		* read : takes a string and returns a type which is a member of Read
		* read "5" -> error
		* read "5" :: Int -> not error(**type annotations**)
	* Enum : sequentially ordered types
		* succ, pred
		* type in this class
			* (), Bool, Char, Ordering, Int, Integer, Float, Double
	* Bounded : class that have an upper and lower bound
		* minBound, maxBound -> polyporphic constants
	* Num : Numeric typeclass
		* To join Num, type must already be friends with Show and Eq
	* Integral : Int + Integer
		* fromIntegral :: (Num b, Integral a) => a -> b
	* Floating : Float + Double