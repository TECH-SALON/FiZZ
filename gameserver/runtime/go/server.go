package main

import (
  "encoding/json"
  "net/http"
  "log"
  "fmt"
)

type Response struct {
  store map[string]string `json:"store"`
  action Action `json:"action"`
  context Context `json:"context"`
}

func main(){
	log.Println("http server is running")
	http.HandleFunc("/", run)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func run(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	switch r.Method {
		case "GET":
			log.Println(r)
			fmt.Fprintf(w, "Please use POST method")
		case "POST":
			decoder := json.NewDecoder(r.Body)
			var input map[string]string
			err := decoder.Decode(&input)

			if err != nil {
				log.Println(err)
        return
			}
			defer r.Body.Close()

      var action *Action = newAction()
      var store = &input["store"]
      var context *Context = &input["context"]

      handler(action, context, store)

      var response = Response{
        action: action,
        context: context,
        store: store,
      }

			json.NewEncoder(w).Encode(response)
	}
}
