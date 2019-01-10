doubleMe x = x + x
doubleUs x y = doubleMe x + doubleMe y
doubleSmallNumber x = if x > 100
												then x
												else doubleMe x

doubleSmallNumber' x = (if x > 100 then x else doubleMe x) + 1

boomBangs xs = [if x < 10 then "boom!" else "bang!" | x <- xs, odd x]
length' xs = sum [1 | _ <- xs]
removeNonUppercase st = [c | c <-st, c `elem` ['A'..'Z']]

lucky :: (Integral a) => a -> String
lucky 7 = "Lucky seven"
lucky x = "Not lucky"