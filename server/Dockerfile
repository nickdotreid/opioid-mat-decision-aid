FROM python:3
ENV PYTHONUNBUFFERED 1

WORKDIR /server
COPY . /server

RUN pip install -r requirements.txt
RUN chmod +x /server/start_dev.sh

CMD honcho start prod
