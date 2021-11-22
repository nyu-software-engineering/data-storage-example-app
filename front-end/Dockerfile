# start from the node v16 base image
FROM node:16

# # create an app directory within the image
# WORKDIR /usr/src/app

# copy app source code into image
COPY . .

# copy package.json and package-lock.json from our local machine into the image
# COPY package*.json ./

# install dependencies into the image
RUN npm install

# expose port 4000 to make it available to the docker daemon
EXPOSE 4000

# define the runtime command that will be executed when a container is made from the image
CMD [ "npm", "start" ]
