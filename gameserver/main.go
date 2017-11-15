package main

import (
	"net/http"
	"github.com/labstack/echo"
)

// func main(){
// 	log.Println("http server is running")
// 	http.HandleFunc("/api/beta", runGM)
// 	err := http.ListenAndServe(":8281", nil)
// 	if err != nil {
// 		log.Fatal("ListenAndServe: ", err)
// 	}
// }

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":5000"))
}
