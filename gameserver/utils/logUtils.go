package utils

import (
  "log"
)

func PrintErr(err error) (_ error) {
	if err != nil {
		log.Println(err)
	}
	err = nil
	return err
}

func PrintErrs(errs []error) {
	for i:=0; i<len(errs); i++ {
		PrintErr(errs[i])
	}
}

func CheckErrs(errs []error) bool{
  flg := false
  for _, err := range errs {
    if err != nil{
		    log.Println(err)
        flg = true
    }
  }
  return flg
}
