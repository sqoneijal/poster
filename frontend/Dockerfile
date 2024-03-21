FROM alpine:3.19

# Install Nginx
RUN apk --no-cache --update add \
   nginx \
   tzdata

ENV TZ=Asia/Jakarta

RUN mkdir -p /var/www/html
WORKDIR /var/www/html

COPY ./nginx.conf /etc/nginx/http.d/default.conf

COPY . /var/www/html

# Port yang akan digunakan oleh Nginx
EXPOSE 80

# Command untuk menjalankan Nginx pada background
CMD ["nginx", "-g", "daemon off;"]