FROM node

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get -y install ssh rsync

RUN npm install -g yarn
RUN mkdir /root/.ssh