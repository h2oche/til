# Haskell Introduction #2
-
### Syntax in functions

* pattern matching
	* specify patterns to which some data should conform
	* check to see if it does and deconstructing the data according to patterns
	* pattern is checked from top to bottom
		* when defining function, order is important
	* example *function definition*
		* lucky :: (Integral a) => a -> String
		* lucky 7 = "Lucky Number Seven!"
		* lucky x = "Sorry, you're out of luck, pal!"
	* example *function definition with tuples*
		* addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
		* addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
	* example *function definition with list*
		* head' :: [a] -> a
		* head' [] = erro "empty list"
		* head' (x:_) = x
	* example *function definition with list-2*
		* capital :: String -> String
		* capital "" = "empty string"
		* capital all@(x:xs) = "the first letter of " ++ all ++ " is " ++ [x]
	* example *list comprehensions*
		* let xs = [(1,3), (4,3)]
		* [a+b | (a,b) <- xs] -> [4,7]
* guards, where bindings
	* a way of testing whether some property of a value are true or false
	* similar to an if statement
	* example
		* bmiTell :: (RealFloat a) => a -> String
		* bmiTell weight height
			* | bmi <= skinny = "underweight"
			* | bmi <= normal = "ugly"
			* | bmi <= fat = "fat"
			* | otherwise   = "whale"
			* **where** bmi = weight / height ^ 2
			* 			  skinny = 18.5
			* 			  normal = 25.0
			* 			  fat = 30.0
	* where section of a function are only visible to that function
	* example 2
		* myCompare :: (Ord a) => a -> a-> Ordering
		* a \`myCompare\` b
			* | a > b     = GT
			* | a == b    = EQ
			* | otherwise = LT
	* example 3
		* initials :: String -> String -> String
		* initials firstname lastname = [f] ++ "." ++ [l] ++ "."
		* 			where (f:\_) = firstname
		* 		 		   (l:\_) = lastname
* let bindings
	* bind variables anywhere and are expressions themselves, but very **local**
		* don't span across guards -> different from where bindings
	* **let <bindings> in <expression>**
	* example 1
		* cylinder :: (RealFloat a) => a -> a -> a
		* cylinder r h =
		* 		let sideArea = 2 * pi * r * h
		* 	 	    topArea = pi * r ^ 2
		* 	 	in  sideArea + 2 * topArea
	* *let bindings* are expressions themselves
		* *where bindings* are just syntactic constructs
		* [let sqaure x = x * x in (square 5, square 4)] == [(25,16)]
		* [let a=100;b=200 in a+b] = [300]
		* calcBmis xs = [bmi | (w,h) <- xs, let bmi = w / h^2, bmi >= 25.0]
* case expressions
	* pattern mathcing in function definitinos is just syntactic sugar for case expressions
	* **case** expression **of** pattern -> result
	* 								   pattern -> result
	* 								   pattern -> result
	* 								   ...
	* example 1
		* head' :: [a] -> a
		* head' xs = **case** xs **of** [] -> error "empty"
		*                               (x:\_) -> x

### Recursion

* In haskell, instead of while, for loops use recursions
* example 1
	* maximum' :: (Ord a) => [a] -> a
	* maximum' [] = error "empty"
	* maximum' [x] = x
	* maximum' (x:xs)
	*     | x > maxTail = x
	*     | otherwise = maxTail
	*     where maxTail = maximum' xs
* example 2 - infinite data structures thanks to lazy evaluation
	* repeat' :: a -> [a]
	* repeat' x = x:repeat' x
* example 3 - quick sort
	* quicksort :: (Ord a) => [a] -> [a]
	* quicksort [] = []
	* quicksort (x:xs) = 
	*     let smallerSorted = quicksort [a | a <-xs, a <= x]
	*         biggerSorted = quicksort [a | a <- xs, a > x]
	*     in smallerSorted ++ [x] ++ biggerSorted

### Higer Order Functions

* higher order functions
	* take functions as parameters and return functions as values
* Curried functions
	* every function in haskell officially takes one parameter
		* max 4 5 == (max 4) 5
		* a -> a -> a == a -> ( a -> a )
	* a function with too few parameters, get a **partially applied**
	* example
		* divideByTen :: (Floating a) => a -> a
		* divideByTen = (/10)
		* divideByTen 200 == 200 / 10 == 20
* higher order function
	* example
		* applyTwice ::  (a -> a) -> a -> a
		* applyTwice f x = f (f x)
		* applyTwice (+3) 10 == 16
		* applyTwice (++ " B") "A" == "A B B"
		* applyTwice (3:) [1]
	* example 2
		* zipWith' :: (a->b->c) -> [a] -> [b] -> [c]
		* zipWith' _ [] _ = []
		* zipWith' _ _ [] = []
		* zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys
	* example 3
		* filp' :: (a->b->c) -> (b->a->c)
		* filp' f = g
		* 		where g x y = f y x
	* example 4
		* listOfFuns = map (*) [0..]
		* (listOfFuns !! 4) 5 == 20
			* list !! index == list[index] 
	* no set rule for when to use **map** and **filter** versus using **list comprehesion** -> choose which is more readable
	* takeWhile : takes a predicate and a list
		* takeWhile (/=' ') "elephants know how to party" == "elephants"
* Lambda function
	* anonymous functions that are used only once
	* filter (**\xs -> length xs > 15**) (map chain [1..100]))
	* can use pattern match in lambdas
		* pattern matching fails in a lambda, a runtime error occurs
	* example 1
		* addThree :: (Num a) => a -> a -> a -> a
		* addThree x y z = x + y + z **equals** addThree = \x -> \y -> \z -> x + y + z
	* example 2
		* filp' :: (a->b->c) -> b -> a -> c
		* filp' f = \x y -> f y x
* Fold function
	* foldl : binary function + initial value + list -> accumulated value
	* sum' xs = foldl (\acc x -> acc + x) 0 xs
	* sum' = foldl (+) 0
		* foo a = bar b a -> foo = bar b : *because of currying*
	* elem' y ys = foldl (\acc x -> if x == y then True else acc) False ys
	* map' f xs = foldr (\x acc -> f x : acc) [] xs
		* = foldl (\acc x -> acc ++ [f x]) [] xs
		* but *++* is much more expensive than *:*
	* right folds work on infinite lists, whereas left ones don't
	* foldl1, foldr1
		* set first element of list to initial value
	* maximum' = foldr1 (\x acc -> if x > acc then x else acc)
* Scan function
	* almost like fold, but they report all the intermediate accumaulator states in list
	* scanl (+) 0 [3,5,2,1] == [0,3,8,10,11]
	* scanr (+) 0 [3,5,2,1] == [11,8,3,1,0]
	* sqrtSums = length (takeWhile (<1000) (scanl1 (+) (map sqrt [1..]))) + 1
* Function application with $
	* ($) :: (a->b) -> a -> b
	* f $ x = f x
	* $ function has the lowest precedence
	* function application with space -> left-associative
		* f a b c == ((f a) b) c
	* function application with $ -> right-associative
		* f $ g $z x == f (g (z x))
	* sum (map sqrt [1..130]) == sum $ map sqrt [1..130]
	* map ($ 3) [(4+), (10*), (^2), sqrt] == [7.0, 30.0, 9.0, 1.732...]
* Function composition with .
	* (.) :: (b->c) -> (a->b) -> a -> c
	* f . g = \x -> f (g x)
	* map (\x -> (negate (abs x)) == map (negate . abs)
	* function composition -> right-associatvie
		* \xs -> negate (sum (tail xs)) == negate . sum . tail
	* point free style
		* fn x = ceiling (negate (tan (cos (max 50 x))))
		* fn = ceiling . negate . tan . cos . max 50

### Modules

* module
	* collection of related functions, types, and typeclasses
	* **import Data.List**
	* **import Data.List (nub, sort)**
	* **import Data.List hiding (nub)**
	* **import qualified Data.Map as Map**
		* must be done before defining any functions
	* ghci> :m + Data.List Data.Map Data.Set
	* [reference](https://downloads.haskell.org/~ghc/latest/docs/html/libraries/)
	* [Hoogle](https://www.haskell.org/hoogle/)
		* Haskell search engine
		* search for functions or to find out where they're located
		* search by name, module name, even type signature
* Data.List
	* intersperse : takes an element and a list -> put that element in between each pair of elements in the list
		* intersperse '.' "ABC" == "A.B.C"
		* intersperse 0 [1,2,3] == [1,0,2,0,3]
	* intercalate : takes a list of lists and a list -> flatten
		* intercalate [0,0] [[1,2],[3,4]] == [1,2,0,0,3,4]
	* transpose : matrix transpose
		* map sum $ transpose [[0,3,5,9],[10,0,0,9],[8,5,1,-1]] == [18,8,6,17]
	* foldl', foldl1' : strict versions of foldl, foldl1
		* using lazy folds on really big lists can cause stack overflow error
		* due to lazy evaluation
	* concat : flattens a list of lists
		* concat ["foo","bar","car"] == "foobarcar"
	* concatMap : map function to a list then concat
	* and, or
	* any, all
	* 이하 생략
* Making own modules
	* we can only see and use the ones that we manually exports
	* module name has to be same with file name
		* Geometry.hs -> Geometry module
	* modules can also be given a hierarchical structures
		* create 'Geometry' folder
		* create Sphere.hs file
		* -> define Geometry.Sphere module in Sphere.hs