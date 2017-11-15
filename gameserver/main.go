package main

import (
	"net/http"
	"github.com/labstack/echo"
	"app/api/v1/rest"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/api/v1/bots", bots.GetBots)
	e.Logger.Fatal(e.Start(":5000"))
}
