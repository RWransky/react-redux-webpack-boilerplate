FROM ubuntu:14.04

RUN apt-get update && apt-get install -y curl sudo git
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

COPY / /code

WORKDIR /code

RUN npm install

RUN npm rebuild node-sass

RUN npm i -g gulp

EXPOSE 3000

CMD ["gulp"]