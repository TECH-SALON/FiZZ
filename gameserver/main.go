package main

import (
	"net/http"
	"log"
)

func main(){
	log.Println("http server is running")
	http.HandleFunc("/api/beta", runGM)
	err := http.ListenAndServe(":8281", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
