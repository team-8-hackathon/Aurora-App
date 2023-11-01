FROM node:16 AS build-stage

WORKDIR /frontend

COPY frontend/. .

RUN npm install && npm run build

FROM python:3.9

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

WORKDIR /var/www

COPY /requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

COPY . .

COPY --from=build-stage /frontend/build/ /var/www/app/static/

COPY migrate_and_seed.sh /var/www/migrate_and_seed.sh


CMD gunicorn -b 0.0.0.0:5001 app:app
EXPOSE 5001