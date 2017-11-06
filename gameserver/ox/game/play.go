package OxGame

import (
	"encoding/json"
	"github.com/pkg/errors"
	"net/http"
	"log"
	"io/ioutil"
	"strconv"
	"net/url"
)

func usersPlay(b Board) (_ int) {
	input, err := json.Marshal(b)
	checkErr(err, "usersPlay(): cannot marshal json")
	resp, err := http.PostForm("http://localhost:8483", url.Values{"board": {string(input)}})
	checkErr(err, "usersPlay(): cannot post form")
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err, "usersPlay(): cannot read resp")
	play, err := strconv.Atoi(string(body[0]))
	checkErr(err, "usersPlay(): response is not a number")
	if play == 9 {
		err = errors.New("usersPlay(): play is 9")
		log.Fatal(err)
	}
	return play
}

func checkErr(err error, msg string) {
	if err != nil {
		err = errors.Wrap(err, msg)
		log.Println(err)
	}
}
