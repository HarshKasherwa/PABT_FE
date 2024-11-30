FROM python:3.10-slim-bullseye

WORKDIR /home/pabt/frontend

# Install Node.js
RUN apt-get update && \
    apt install sysvbanner && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

RUN node -v && npm -v

RUN pwd

COPY ./frontend .
RUN rm package-lock.json

RUN ls -l

# set ENTRYPOINT_PATH as ENV variable
ENV FRONTEND_ENTRYPOINT="/home/pabt/frontend/entrypoint.sh"

# Make scripts executable and set permissions
RUN chmod +x "$FRONTEND_ENTRYPOINT"

# Copy the package.json and package-lock.json to the working directory
#COPY ./frontend/package.json .

RUN ls -l

RUN npm install
#
#COPY ./frontend/public ./public
#COPY ./frontend/src ./src
#COPY ./frontend/app ./app
#COPY ./frontend/.env ./.env

# Expose the port that the app runs on
EXPOSE 3000

#ENTRYPOINT ["npm", "start"]
# Set the entrypoint
ENTRYPOINT exec "$FRONTEND_ENTRYPOINT"