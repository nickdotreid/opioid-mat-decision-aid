FROM nginx:1.19.0
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y python3.7 python3-pip && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1 && \
    update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1

RUN apt-get update && \
    apt-get install -y build-essential openssl libssl-dev libpq-dev

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs

ADD nginx.conf /etc/nginx/conf.d/default.conf

ADD server/requirements.txt /server/requirements.txt
RUN pip install -r /server/requirements.txt

ADD client/package.json /client/package.json
ADD client/package-lock.json /client/package-lock.json
RUN cd /client && npm install && cd /

ADD /server /server
ADD /client /client

RUN cd /client && npm run build && cd /

WORKDIR /server

RUN python manage.py collectstatic

CMD gunicorn -b 0.0.0.0:5000 app.wsgi:application --log-level debug --daemon \
    && sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
