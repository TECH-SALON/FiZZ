
package Game

type DockerManager struct {
  client *client.Client
  dockerNetwork string
  context context.Context
}

func (d *DockerManager)Init(){

}

func (d *DockerManager)Deinit(){

}

func (d *DockerManager)Invoke(c *Container){
  // d.client
	// imageName := utils.GetRuntimeImageName(c.runtime)
	// log.Println(imageName)
	// cmd := exec.Command("bash", "-c", "docker run -d -p "+c.port+":8080 --name "+c.name+" "+imageName+" ./start.sh up "+c.resUrl) //fileをrepoからとってきて埋め込む
	// b, err := cmd.Output()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// log.Println(b)
}

func (d *DockerManager)Destroy(c *Container){

}
