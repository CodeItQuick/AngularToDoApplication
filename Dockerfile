FROM node:16.14 as build-context-frontend

RUN mkdir /home/frontend
COPY frontend /home/frontend/

WORKDIR /home/frontend/
COPY frontend/package.json /home/frontend/package.json
RUN npm ci
RUN npm run build
RUN cd /home/frontend/

FROM node:16.14 as build-context-backend

RUN mkdir /home/backend
COPY backend /home/backend/
COPY --from=build-context-frontend /home/frontend/dist/todo/ /usr/share/nginx/html/site/

WORKDIR /home/backend/
RUN npm ci
