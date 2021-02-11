# Choose the Image which has Node installed already
FROM node:lts-alpine

EXPOSE 8080

# make the 'app' folder the current working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json ./app
COPY package-lock.json ./app

COPY . .

# install project dependencies
RUN npm install
RUN npm install @vue/cli@3.7.0 -g


# copy project files and folders to the current working directory (i.e. 'app' folder)


# build app for production with minification
RUN npm run build

##EXPOSE
CMD ["npm","run","serve"]
