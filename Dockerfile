FROM node

RUN apt-get update

RUN mkdir -p /usr/src/app
# 指定
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --unsafe-perm
# . 编译时候的路径
COPY . /usr/src/app
#RUN grunt deploy

CMD [ "npm", "start" ]
EXPOSE 9000