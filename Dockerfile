# Fetching the latest node image on alpine linux
FROM node:12-alpine as build

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Copy the React App to the container
COPY . /app

# Installing dependencies
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

# Prepare nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
