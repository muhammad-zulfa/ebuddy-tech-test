FROM node:20.17-alpine

# Environment vars
ARG NODE_ENV=development
ENV NODE_CONFIG_STRICT_MODE=1
ENV NODE_ENV=$NODE_ENV
ENV APP_NAME=todo-app
ENV PORT=3000

# Configure user
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

WORKDIR /var/www/app

# Expose the port nginx is reachable on
EXPOSE ${PORT}

USER nonroot

# Let supervisord start nginx && node js built app
CMD ["yarn", "dev"]