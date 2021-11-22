# start from the node v16 base image
FROM node:16

# copy app source code into image
COPY . .

# install dependencies into the image
RUN npm install

# expose port 3000 to make it available to the docker daemon
EXPOSE 3000

# define the runtime command that will be executed when a container is made from the image
CMD ["node", "server.js"]

