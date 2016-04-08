// hello
package hello

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func Greetings(name string) string {
	return fmt.Sprintf("Hello , %s!", name)
}

func GetCountries(url string) (result string) {
	resp, err := http.Get(url)

	defer func() {
		if resp != nil {
			resp.Body.Close()
		}
		if err := recover(); err != nil {
			result = "error"
		}
	}()
	if err != nil {
		panic(err)
	}

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)

	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println("response Body:", string(body))

	var countries []Country
	json.Unmarshal(body, &countries)

	size := len(countries)
	ret := make([]string, size)
	for i := 0; i < len(countries); i++ {
		ret[i] = countries[i].Name
	}
	fmt.Println(ret)
	return strings.Join(ret, ",")
}

type Country struct {
	Name string `json:"name"`
}
