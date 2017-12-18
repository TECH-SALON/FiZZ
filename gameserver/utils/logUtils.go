package utils

func printErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}

func printErrs(errs []error) {
	for i:=0; i<len(errs); i++ {
		printErr(errs[i])
	}
}
