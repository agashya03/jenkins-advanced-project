FROM nginx:alpine

COPY index.html /usr/share/ngix/html/index.html
COPY style.css /usr/share/ngix/html/style.css
COPY script.js /usr/share/ngix/html/script.js

EXPOSE 80
