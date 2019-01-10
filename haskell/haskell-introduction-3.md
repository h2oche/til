# haskell introduction #3

### Make Own Type and Typeclasses

* data types
	* **data** keyword to define a data types
		* data Bool = False | True
		* data Int = -2147483648 | ... | -1 | 0 | 1 | 2 | ... | 2147483647
			* illustrative purposes
		* data Shape = Circle Float Float Float | Rectangle Float Float Float Float **deriving** (Show)
			* Shape, Rectangle -> value constructor
			* :t Circle
				* Circle :: Float -> Float -> Float -> Shape
	* value constructor
		* functions that ultimately return a value of a data type
		* pattern match against value constructors when defining function
			* surface (Circle _ _ r) = pi * r ^ 2
	* can export data types in modules
	* not exporting value constructors of a data types makes them more abstract
* Record Syntax
	* data Person = Person { firstName :: String, lastName :: String } deriving (Show)
		* haskell automatically make firstName, lastName functions
			* firstName :: Person -> String, lastName :: Person -> String
		* Person {lastName = "bar", firstName = "foo"} == Person "foo" "bar"
	* display data type neatly
* Type contructor
	* type constructor : take types as parameters to produce new types
		* data Maybe a = Nothing | Just a
		* Maybe: represents an option of either having nothing or having one of something
	* example
		* data Car a b = Car { company :: a, model :: b} deriving (Show)
	* similar to *c++ template*
	* could add a **typeclass constraints**
		* data (Ord k) => Map k v = ...
		* **but never add typeclass contraints in data declarations**
			* create useless code, contraints when defining function
* Deriving typeclasses
	* data Person = Person { f :: String, age :: Int } deriving(Show, Eq, Read)
		* To be Person derived from Show, Eq, Read -> all types in value contructors have to be derived from Show, Eq, Read
	* deriving instances for the **Ord** type class
		* data Bool = False | True deriving (Ord)
			* sequence of value constructor matters
			* True is greater than False in this example
		* data Maybe a = Nothing | Just a
			* if value constructor is same, what's inside in it is matters
			* Just 100 > Just 50
	* deriving instances for the **Enum** type class
		* data Day = Monday | Tuesday | ... | Sunday deriving (Enum)
			* all value constructors have to take no parameters(nullary)
* Type synonyms
	* use **type** keyword to make a synonym for already existing type
		* type String = [Char]
	* type synonyms can also be parameterized
		* type AssocList k v = [(k, v)]
	* partailly apply type parameters and get new type constructors
		* type IntMap v = Map Int v
		* type IntMap = Map Int
	* *Either a b* type
		* data Either a b = Left a | Right b deriving (Eq, Ord, Read, Show)
		* encapsulate a value of one type or another
		* see use cases in *Locker.hs* example
* Recursive data structures
	* haskell supports recursive data structures like list
		* data List a = Empty | Cons a (List a) deriving (Show, Read, Eq, Ord)
		* data Tree a = Empty | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)
	* fixity declarations
		* example 1
			* **infixr** 5 :-:
			* data List a = Empty | a :=: (List a) derving(Show, Read, Eq, Ord)
		* example 2
			* infixr 5 ++
			* (++) :: [a] -> [a] -> [a]
			* [] ++ ys = ys
			* (x:xs) ++ ys = x:(xs ++ ys)
* Typeclasses
	* **class** for new typeclasses, **instance** for making type instances
		* class <typeclass> <type variable> where ..
			* use minimal complete definition
		* instance <typeclass> <type> where ..
	* class contraints on class declaration
		* can also make typeclasses that are subclasses of other typeclasses
		* class (<parent typeclass> <type>) => <typeclass> <type> where ..
		* have to make <type> instace of <parent typeclass> first
	* **:info <MyTypeClass>**
		* see what the instances of a typeclass are
		* :info works for types and type constructors too
	* YesNo typeclass
		* class YesNo a where
			* yesno :: a -> Bool
		* instance YesNo Int where
			* yesno 0 = False
			* yesno _ = True
		* instance YesNo [a] where
			* yesno [] = False
			* yesno _ = True
		* instance YesNo (Maybe a) where
			* yesno (Just _) = True
			* yesno Nothing = False
		* instance YesNo Bool where
			* yesno = id
* Functor Typeclass
	* is basically for things that can be mapped over
	* list type is part of **Functor** typeclass
	* definition
		* class Functor f where
		*     fmap :: (a -> b) -> f a -> f b
			* *f* is a type contructor in this symatic
			* takes a function from one type to another and a functor applied with one type and returns a functor applied with another type
	* instances - types that can act like a box can be functors
		* instance Functor [] where
		*     fmap = map
			* for lists, fmap is just map
		* instance Functor Maybe where
		*     fmap f (Just x) = Just (f x)
		*     fmap f Nothing = Nothing
		* instance Functor Tree where
		*     fmap f EmptyTree = EmptyTree
		*     fmap f (Node x left right) = Node (f x) (fmap f left) (fmap f right)
		* instance Functor (Either a) where
		*     fmap f (Right x) = Right (f x)
		*     fmap f (Left x) = Left x
* Kinds
	* types are labels that values carry, and kinds are labels that types carry
		* all value have their type, all type have their kind
	* **:k** command in GHCI to examine the kind of a type
		* :k Int => Int :: *
		* **\*** means that the type is concrete
		* all values have concrete types
	* class Tofu t where
	*     tofu :: j a -> t a j
	* instance Tofu Frank where
	*     tofu x = Frank x
		* tofu (Just 'a') :: Frank Char Maybe -> Frank {frankField = Just 'a'}
		* tofu ["hello"] :: Frank [Char] [] -> Frank {frankField = ["hello"]}
	* data Frank a b = Frank {frankField :: b a} deriving (Show)
		* :t Frank {frankField = Just "HAHA"} :: Frank [Char] Maybe
		* :t Frank {frankField = Node 'a' EmptyTree EmptyTree} :: Frank Char Tree
		* :t Frank {frankField = "YES"} :: Frank Char []

### IO ()
* compile *.hs* file
	* ghc --make <filename>
* I/O action
	* will be performed when they are
		* given a name of *main*
		* inside a bigger I/O action that we composed with a *do block*
	* **do** syntax
		* glue several I/O actions into one
		* use *let* to use pure code
		* main = do
		*     putStrLn "Hello, what's your name?"
		*     name <- getLine
		*     *let* bigName = map toUpper name
		*     putStrLn ("Hey" ++ bigName ++ ", you rock!")
	* *return* keyword
		* encampsulate pure value as I/O action
		* return "haha" :: IO String
		* main = do
		*     a <- return "hell"
		*     putStrLn $ a ++ " "
	* functions
		* putStr, putStrLn, putChar, print, getChar, getLine, getContents
		* when
		* sequence: takes a list of I/O actions and return single I/O action
		* mapM, mapM_: maps the function over the list and then sequences it
		* forever: take single I/O action and repeat it forever
		* forM: takes a list and mapping function and return sequence of mapping result
* Files, Streams
	* **getContents** function
		* lazy I/O action 
		* useful when piping the output from one to another
	* interact: takes a function of type *String-> String* and execute it with I/O input
	* openFile :: FilePath -> IOMode -> IO Handle
		* type FilePath = String
		* data IOMode = ReadMode | WriteMode | AppendMode | ReadWriteMode
	* withFile :: FilePath -> IOMode -> (Handle IO a) -> IO a
	* hGetContents, hGetLine, hPutStr, hPutStrLn, hGetChar
	* readFile, writeFile, appendFile
	* hSetBuffering :: Handle -> BufferMode
		* line-buffering, block-buffer 	
		* data BufferMode = NoBuffering | LineBuffering | BlockBuffering (Maybe Int)
		* bigger chunks minimize disk access
	* hFlush: flush the buffer of the file associated with the handle
		* line-buffering: buffer is flushed after every line
		* block-buffering: buffer is flushed after read a chunk, or closing a handle
	* openTempFile, getCurrentDirectory
* Command Line Arguments
	* getArgs, getProgName
		* System.Environment module
* Randomness
	* random :: (RandomGen g, Random a) => g -> (a, g)
		* System.Random
		* RandomGen typeclass: types that can act as sources of randomness
		* StdGen: instance of RandomGen
	* mkStdGen :: Int -> StdGen
	* randoms: takes a generator and returns an infinite sequence of values
		* take 5 $ randoms (mkStdGen 11) :: [Int]
	* randomR :: (RandomGen g, Random a) :: (a,a) -> g -> (a,g)
		* random (1,6) (mkStdGen 3333) == (3, ...)
	* randomRs: same functionality with randoms
		* take 10 $ randomRs ('a','z') (mkStdGen 3) :: [Char]
	* getStdGen :: IO StdGen
		* get global generator
		* perform getStdGen twice will ask the system for the same global generator twice
	* newStdGen: get updated global generator
* Bytestrings
	* processing files as strings tends to be slow
		* Char don't have a fixed size (Unicode)
		* too many thunks(promise)
	* processing big files can be slow because of lazyness
	* bytestrings are soft of lists, only each element is one byte in size
	* strict version
		* reside in Data.ByteString
		* do away with the laziness completely
	* lazy version
		* reside in Data.ByteString.Lazy
		* are stored in chunks, and each chunk has a size of 64K
		* read data chunk by chunk
	* pack :: [Word8] -> ByteString
		* takes a list of bytes and returns a ByteString
		* Word8: similar to *Int* but with small range 0-255
		* B.pack [99, 97, 110] == Chunk "can" Empty
	* unpack: inverse function of pack
	* fromChunks, toChunks: convert a list of strict bytestrings to lazy bytestring and vice versa
		* good if you have a lot of small strict bytestrings and want to process them efficiently without joining them into one big strict bytestring in memory first
	* cons, cons': bytestring version of *:*
	* empty: makes an empty bytestring
* Exceptions
	* Both I/O code( i.e impure code ) and pure code can throw exceptions
		* 4 \`div\` 0 => exception occurs
	* pure code's exceptions can only be caught in the I/O part of our code
		* because of layiness
	* don't mix exceptions and pure code
		* use types like *Either* and *Maybe*
	* I/O exceptions
		* catch :: IO a -> (IOError -> IO a) -> IO a
			* System.IO.Error
		* ioError :: IOException -> IO a
			* takes an *IOError* and produces an I/O action that will throw it
		* userError: making exceptions manually
		* can view attributes of error via **ioe**
			* [list of ioe](http://www.haskell.org/ghc/docs/6.10.1/html/libraries/base/System-IO-Error.html#3)
		* 