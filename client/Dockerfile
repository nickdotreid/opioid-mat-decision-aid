FROM node:10

# Install Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && apt-get install -y google-chrome-stable

RUN npm install -g @angular/cli@v6-lts

# RUN mkdir /client && chown node:node /client
# USER node

WORKDIR /client

ADD package.json /client/package.json
ADD package-lock.json /client/package-lock.json
RUN npm install

ADD . /client

CMD ng serve --host 0.0.0.0
