# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Public Supabase config (anon key + URL are already shipped in the client bundle,
# so embedding them here is not a secret leak). Secrets live only in Supabase.
ENV VITE_SUPABASE_URL="https://rzupxcdhtkuaazwhxavn.supabase.co"
ENV VITE_SUPABASE_PROJECT_ID="rzupxcdhtkuaazwhxavn"
ENV VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dXB4Y2RodGt1YWF6d2h4YXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjg4NjksImV4cCI6MjA5OTcwNDg2OX0.pqOZdnsU0Vg6o6KYoLzjkf0qY6O2OCCd65OHh7RB1wg"
RUN npm run build

# ---- Serve stage ----
FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
