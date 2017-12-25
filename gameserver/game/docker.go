package game

import (
  "github.com/docker/go-connections/nat"
  "github.com/docker/docker/client"
  "github.com/docker/docker/api/types"
  "github.com/docker/docker/api/types/container"

  "golang.org/x/net/context"

  "log"
  "fmt"
  "os"

  "app/utils"
)

type DockerManager struct {
  client *client.Client
  dockerNetwork string
  context context.Context
}

func (d *DockerManager)Init() (err error){
  d.client, err = client.NewEnvClient()
  if err != nil {
    return
  }
  d.context = context.Background()
  return
}

func (d *DockerManager)Deinit() []error{
  env := os.Getenv("NODE_ENV")
  if env != "production" || env != "staging" {
    log.Println("Skipped docker manager deinit.")
    return nil
  }

  cs, err := d.client.ContainerList(d.context, types.ContainerListOptions{All: true})
  if err != nil {
    return []error{err}
  }

  options := types.ContainerRemoveOptions{Force: true}
  var errs []error
  for _, container := range cs {
    err = d.client.ContainerRemove(d.context, container.ID, options)
    errs = append(errs, err)
  }

  return errs
}

func (d *DockerManager)Invoke(c *Container) error{
  log.Printf("Creating Container %s(%s)\n", c.BotCode, c.runtime)

	imageName := utils.GetRuntimeImageName(c.runtime)
  config := &container.Config{
    Image: imageName,
    Cmd: []string{"./start.sh", "up", c.resUrl},
  }
  host := &container.HostConfig{
    PortBindings: nat.PortMap{
      nat.Port("8080"): []nat.PortBinding{{HostPort: c.port}},
    },
  }

  resp, err := d.client.ContainerCreate(d.context, config, host, nil, c.name)
  c.id = resp.ID
  return err
}

func (d *DockerManager)Destroy(c *Container) error{
  if c.id == "" {
    return fmt.Errorf("Error: No ID container <%s> cannot be destoried.", c.name)
  }
  options := types.ContainerRemoveOptions{Force: true}
  err := d.client.ContainerRemove(d.context, c.id, options)
  return err
}
