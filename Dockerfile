FROM python:3.7
ENV PYTHONUNBUFFERED 1

ADD server/requirements.txt /server/requirements.txt
RUN pip install -r /server/requirements.txt

RUN apt-get update \
    && apt-get install -y curl build-essential openssl libssl-dev \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs

ADD client/package.json /client/package.json
ADD client/package-lock.json /client/package-lock.json
RUN cd /client && npm install && cd /

ADD /server /server
ADD /client /client

RUN cd /client && npm run build && cd /

WORKDIR /server
CMD python manage.py collectstatic \
    && gunicorn -b 0.0.0.0:$PORT app.wsgi:application --log-level debug
