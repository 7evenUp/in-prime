FROM node:18 as build

USER root

RUN apt update ; apt upgrade -y
RUN apt install -y git curl iputils-ping telnet supervisor haproxy
RUN apt autoremove -y ; apt clean ; apt autoclean

COPY docker/supervisor/supervisor.conf /etc/supervisor/conf.d/

WORKDIR /app
RUN chown node:node /app

#USER node

COPY package*.json ./

RUN npm install

COPY ./.env ./.env
COPY . .

RUN npm run build

USER root

RUN chown -R node:node /app
RUN chmod -R 777 /root

ENV TZ "Europe/Moscow"

CMD ["/usr/bin/supervisord"]

#HEALTHCHECK --start-period=10s --interval=10s --timeout=5s --retries=3 CMD curl -f http://127.0.0.1:3000/health-check || exit 1

EXPOSE 3000

