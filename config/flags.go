package config

import (
	"flag"
)

var (
	PublicDir = flag.String("public-dir",
		"./frontend/public",
		"Directory containing static web assets.")

	Address = flag.String("address",
		"0.0.0.0:9090",
		"Address and port to listen on.")

	K8sUrl = flag.String("k8s-url",
		"http://localhost:8080",
		"Url of the kubernetes api server.")

	DiscoveryJson = flag.String("discovery-json",
		"schema/v1.json",
		"path to discovery json file")
)