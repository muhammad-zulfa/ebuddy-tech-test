FROM nginx:1.18-alpine

ARG PORT=8080
ENV PORT=${PORT}

# Configure user
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN touch /run/nginx.pid \
 && chown -R nonroot:nonroot /run/nginx.pid

# Configure nginx
COPY ./etc/nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default server definition
RUN rm /etc/nginx/conf.d/default.conf

USER nonroot

EXPOSE ${PORT}