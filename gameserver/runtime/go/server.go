package main

import (
  "encoding/json"
  "net/http"
  "log"
  "fmt"
)

type Event struct {
  EventCode string `json:"code"`
}

type Context struct {
  Board [8][8]int `json:"board"`
}

type Response struct {
  Store map[string]string `json:"store"`
  Event map[string]string `json:"event"`
  Context map[string]string `json:"context"`
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

      var event new(Event)
      var context Context
      var store = input["store"]
      context = input["context"]

      handler(&event, &context, &store)

      var response = &Respones{
        Event: event,
        Context: context,
        Store: store
      }

			json.NewEncoder(w).Encode(response)
	}
}
