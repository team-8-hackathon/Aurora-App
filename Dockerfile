FROM python:3.6.4-slim
WORKDIR /app
COPY /app /app
RUN pip install -r /app/requirements.txt
CMD python /app/__init__.py 
EXPOSE 5000