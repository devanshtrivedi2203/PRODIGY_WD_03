# Use official Nginx image as the base image
FROM nginx:alpine

# Copy the static files to the default Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
