package utils

import (
  "os"
  "path/filepath"
)

func GetRuntimeUrl(runtime string) string {
  url := pwd() + "/" + runtime
  return url
}

func GetRuntimeImageName(runtime string) string {
  return "fz-"+runtime+"runtimei"
}

func pwd() string {
  ex, err := os.Executable()
  if err != nil {
    panic(err)
  }
  return filepath.Dir(ex)
}
