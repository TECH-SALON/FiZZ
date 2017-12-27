package utils

import (
  "os"
  "fmt"
  "path/filepath"
)

func GetRuntimeImageName(runtime string) (string, error) {
  err := fmt.Errorf("ERROR: bot runtime is invalid.")
  switch runtime {
  case "golang1.9":
    return "fz-goruntimei", nil
  case "python3.6":
    return "fz-pyruntimei", nil
  case "node9.3":
    return "fz-jsruntimei", nil
  default:
    return "", err
  }
}

func pwd() string {
  ex, err := os.Executable()
  if err != nil {
    panic(err)
  }
  return filepath.Dir(ex)
}
