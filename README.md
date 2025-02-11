# Deployment on AWS

## Prerequisites:
Ensure docker compose v2 is installed on the instance and nginx service is turned off to free port 80.

1. Clone both frontend and backend repos
2. Copy gcp_cred.json on the backend root folder.
3. Build docker image for the frontend first (to avoid memory issues):
```
docker build --build-arg VITE_API_URL=/api -t frontend .
```
4. Build and run backend:
```
docker compose -f docker-compose.yml up -d --build

```
5. Now run frontend container
```
docker run -d -p 80:80 --name frontend frontend --network backend_default
```

