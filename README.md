
## Getting Started

1. Download the EukaTodoApp or clone the project using its git link.

2. Install all project dependencies using :

```bash
npm install
```
3. Run the development server:

```bash

npm run dev

```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Using Docker 

1. Open CMD in the app's main directory and run:

```bash

docker build -t <image name>:latest .

```

2. Once the image has been downloaded and all dependencies installed, create a container using:

```bash

docker run --name <container name> -d -p 3000:3000 <image name>:latest

```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result


## For more information on how to deploy applications using NEXTJS:

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
