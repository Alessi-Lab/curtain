# Curtain

![UKRI-UD](https://raw.githubusercontent.com/Alessi-Lab/curtain/master/src/assets/logo/UKRI_MRC_%20PPU_Dundee.png)

![ASAP](https://raw.githubusercontent.com/Alessi-Lab/curtain/master/src/assets/logo/ASAP_FullColor.png)

## Installation

Requirements:
`docker-compose`


- From this repository, download `dockerfiles` folder and `docker-compose.yml` file into the same folder.
- Edit file `dockerfiles/Dockerfile-curtain` and `dockerfiles/Dockerfile-curtainptm`, changing `http://curtain.omics.quest/` to the intended url of the backend server.
- The `docker-compose.yml` file also include service for `nginx-proxy-manager` to help with configuring reverse proxy. If it is not needed, please remove it from your `docker-compose.yml`
- Then `docker-compose build` to build all the neccessary images
- Finally `docker-compose up -d`
