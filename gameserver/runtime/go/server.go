package main

import (
  "encoding/json"
  "io/ioutil"
  "net/http"
  "log"
  "fmt"
)

type Request struct {
  Context `json:"context"`
  Store map[string]interface{} `json:"store"`
}

type Response struct {
  Action `json:"action"`
  Store map[string]interface{} `json:"store"`
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

func parseInput(input []byte) (*Context, map[string]interface{}){
  req := decodeJson(input)
  context := req.Context
  store := req.Store

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

func decodeJson(j []byte) *Request{
  var req *Request = new(Request)
	json.Unmarshal(j, req)
	return req
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

      log.Println("Start handler exec.")

      action := newAction()

      handler(action, context, store)

      log.Println("End handler exec.")

      var response = Response{
        Action: *action,
        Store: store,
      }

			fmt.Fprintf(w, encodeJson(response))
	}
}
