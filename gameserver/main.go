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
	api := e.Group("/api/v1")

	//bots
	api.GET("/bots", bots.GetBots)
	api.POST("/bots", bots.RegisterBot)
	api.GET("/bots/:id", bots.GetBot)
	api.PUT("/bots/:id", bots.StandBot)

	e.Logger.Fatal(e.Start(":5000"))
}
