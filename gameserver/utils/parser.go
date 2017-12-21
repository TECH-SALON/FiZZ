package utils

import (
  "encoding/json"
  "log"
)

func EncodeJson(a interface{}) string {
	ret, err := json.Marshal(a)
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return string(ret)
}

func DecodeJson(j []byte)map[string]interface{}{
	var response map[string]interface{}
	json.Unmarshal(j, &response)
	return response
}
