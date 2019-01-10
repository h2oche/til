import System.IO

main = do
	handle <- openFile "dummy.text" ReadMode
	contents <- hGetContents handle
	putStr contents
	hClose handle

main = do
	withFile "dummy.text" ReadMode (\handle -> do
		contents <- hGetContents handle
		putStr contents)