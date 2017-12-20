#! /bin/sh

function clone(){
  if [ $# -eq 1 ]; then
    git clone $1 src
    mv ./src/* ./
    rm -rf ./src
  else
    echo "no args or ${#}"
  fi
}

function build(){
  go-wrapper download
  go-wrapper install
}

function run(){
  ./app
}

function docker_build(){
  docker build . -t fz-goruntimei
}

function docker_run(){
  port=1010
  if [[ $# -eq 0 ]]; then
    docker run -p $port:8080 fz-goruntimei
  elif [ $# -eq 1 ]; then
    port=$1
    docker run -p $port:8080 fz-goruntimei
    return
  fi
}

function docker_run_named(){
  port=1010
  if [ $# -eq 1 ]; then
    docker run --name $1 -p $port:8080 fz-goruntimei
    return
  elif [[ $# -eq 2 ]]; then
    port=$1
    if [ "$2" = "named" ]; then
      docker run --name fz-goruntime -p $port:8080 fz-goruntimei
      return
    else
      docker run --name $2 -p $port:8080 fz-goruntimei
      return
    fi
  fi
}

function docker_run_command_named(){
  port=$1
  name=$2
  shift 2
  echo "Port: $port, Name: $name"
  docker run -p $port:8080 --name $name fz-goruntimei $@
}

function docker_exec(){
  docker exec $@
}

function docker_clone(){
  name=$1
  shift 1
  docker_exec $name clone $@
}

function container_id(){
  cat /proc/self/cgroup | grep 'docker' | sed 's/^.*\///' | tail -n1
}

function help(){
  echo
  echo "Usage: command <action> [arguments...]"
  echo
  echo "See raw source for details. ;)"
}

action=${1:-"help"}

case "$action" in
  clone)
    clone $2
    ;;
  docker-clone)
    shift 1
    docker_clone $@
    ;;
  build)
    build
    ;;
  run)
    run
    ;;
  up)
    container_id
    shift 1
    clone $@ # <container name>
    build
    run
    ;;
  docker-build)
    docker_build
    ;;
  docker-run)
    shift 1
    docker_run $@
    ;;
  docker-run-cmd-test)
    shift 1
    docker_run_command 1010 $@
    ;;
  docker-run-named-test)
    docker_run_named 1010 named
    ;;
  docker-rm-test)
    docker rm fz-goruntime
    ;;
  docker-exec)
    shift 1
    docker_exec $@
    ;;
  docker-exec-test)
    shift 1
    docker_exec fz-goruntime $@
    ;;
  docker-rebuild-test)
    docker rm fz-goruntime
    docker_build
    shift 1
    docker_run_command_named 1010 fz-goruntime $@
    ;;
  docker-interact)
    docker run --rm -it -p 1001:8080 -name fz fz-goruntimei bash
    ;;
  *)
    ;;
  #/start.sh docker-rebuild-test ./start.sh up https://gist.github.com/Yukits/38e44ab5ffe2ab040e963c7f1e9ab0c0
esac
