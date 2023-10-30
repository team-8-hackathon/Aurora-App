FROM node:12 AS build-stage

WORKDIR /frontend

COPY frontend/. .

RUN npm install && npm run build

FROM python:3.6.4-slim

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

WORKDIR /var/www

COPY /requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .
COPY --from=build-stage /frontend/build/ app/static/


CMD gunicorn app:app
EXPOSE 5000