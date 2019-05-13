FROM python:3
ENV PYTHONUNBUFFERED 1

WORKDIR /server
COPY . /server

RUN pip install -r requirements.txt

CMD honcho start prod
