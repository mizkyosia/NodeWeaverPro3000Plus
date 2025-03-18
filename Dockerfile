FROM node:18-alpine

# Add user for directory permission shenanigans
RUN adduser --disabled-password appuser
USER appuser

# Copy source files into 
COPY --chown=appuser:appuser ./ /node_weaver

# Set working directory
WORKDIR /node_weaver

# Install dependencies
RUN npm ci

# Run project
CMD npm run dev
