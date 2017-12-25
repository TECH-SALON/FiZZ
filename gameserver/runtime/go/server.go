package main

import (
  "encoding/json"
  "io/ioutil"
  "net/http"
  "log"
  "fmt"
)

type Response struct {
  action Action `json:"action"`
  context Context `json:"context"`
  store map[string]string `json:"store"`
}

func main(){
	log.Println("Server is running.")
  defer log.Println("Server is down.")
	http.HandleFunc("/", run)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func parseInput(input []byte) (*Context, map[string]string){
  var context Context
  var store map[string]string

  response := decodeJson(input)
  context = response["context"].(Context)
  store = response["store"].(map[string]string)

  return &context, store
}

func encodeJson(a interface{}) string {
	ret, err := json.Marshal(a)
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return string(ret)
}

func decodeJson(j []byte)map[string]interface{}{
	var response map[string]interface{}
	json.Unmarshal(j, &response)
	return response
}

func run(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	switch r.Method {
		case "GET":
			log.Println(r)
			fmt.Fprintf(w, "Please use POST method")
		case "POST":
			defer r.Body.Close()

      body, err := ioutil.ReadAll(r.Body)
      if err != nil {
        log.Fatal(err) //負け
      }

      context, store := parseInput(body)

      log.Println("Start handler.")
      log.Println(context)
      log.Println(store)

      action := newAction()

      handler(action, context, store)

      var response = Response{
        action: *action,
        context: *context,
        store: store,
      }

			json.NewEncoder(w).Encode(response)
	}
}
