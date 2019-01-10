import Control.Monad

main = do
	colors <- forM [1,2,3,4] (\a -> do
		putStrLn $ "which color do you associate with number " ++ show a ++ "?"
		color <- getLine
		return color)
	mapM print colors