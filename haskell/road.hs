import Data.List

data Section = Section {getA :: Int, getB :: Int, getC :: Int} deriving (Show)
type RoadSystem = [Section]

data Label = A | B | C deriving (Show)
type Path = [(Label, Int)]

heathrowToLondon :: RoadSystem
heathrowToLondon = [Section 50 10 30, Section 5 90 20, Section 40 2 25, Section 10 8 0]

roadStep :: (Path, Path) -> Section -> (Path, Path)
roadStep (pathA, pathB) (Section a b c) = 
	let priceA = sum $ map snd pathA;
			priceB = sum $ map snd pathB;
			directA = priceA + a;
			inDirectA = priceB + b + c;
			directB = priceB + b;
			inDirectB = priceA + a + c;
			newPathA = if directA <= inDirectA
									then (A, a):pathA
									else (C, c):(B, b):pathB;
			newPathB = if directB <= inDirectB
									then (B, b):pathB
									else (C, c):(A, a):pathA;
	in
		(newPathA, newPathB)

optimalPath :: RoadSystem -> Path
optimalPath roadSystem = 
	let (pathA, pathB) = foldl roadStep ([], []) roadSystem;
			pathAValue = sum $ map snd pathA;
			pathBValue = sum $ map snd pathB;
	in
		if pathAValue >= pathBValue
			then reverse pathB
			else reverse pathA

groupsOf :: Int -> [a] -> [[a]]
groupsOf 0 _ = undefined
groupsOf _ [] = []
groupsOf n xs = take n xs : groupsOf n (drop n xs)

main = do
	contents <- getContents
	let threes = groupsOf 3 (map read $ lines contents)
	let roads = map (\[a,b,c] -> Section a b c) threes
	let path = optimalPath roads
	let pathValue = sum $ map snd path
	let pathString = concat $ map (show . fst) path
	putStrLn $ "path : " ++ pathString
	putStrLn $ "value : " ++ show pathValue