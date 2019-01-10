import Data.List

solveRPN :: (Num a, Read a) => String -> a
solveRPN = head . foldl foldFunc [] . words
	where
	foldFunc (x:y:ys) "*" = (x * y):ys
	foldFunc (x:y:ys) "+" = (x + y):ys
	foldFunc (x:y:ys) "-" = (y - x):ys
	foldFunc xs number = read number:xs