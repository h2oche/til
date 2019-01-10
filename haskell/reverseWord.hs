main = do
	line <- getLine
	if null line
		then return ()
		else do
			putStrLn $ reverse line
			main

reverse :: String -> String
reverse = unwords . map reverse . words