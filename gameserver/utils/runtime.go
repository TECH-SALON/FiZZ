package utils

import (
  "os"
  "path/filepath"
)

func GetRuntimeUrl(runtime string) string {
  if runtime == "go" {
    pwd() + "/go/"
  }else if runtime == "js" {

  }
}

func pwd() string {
  ex, err := os.Executable()
  if err != nil {
    panic(err)
  }
  return filepath.Dir(ex)
}
