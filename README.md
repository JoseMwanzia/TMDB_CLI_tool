# 📦 Movie CLI
A simple CLI tool written in TypeScript that fetches movie data from The Movie Database (TMDB) using their public API.
This project supports development mode using ts-node so you can see changes instantly without rebuilding.

## 🚀 Features
- Fetches movie information from TMDB API
- Supports categories:
    - playing → now_playing
    - popular
    - top → top_rated
    - upcoming
- Accepts --type CLI flag
- Includes a development wrapper command using ts-node
- Production-ready architecture

## 🛠️ Tech Stack
This CLI tool is built with:
- Node.js
- TypeScript
- Dotenv — Environment variable management
- Jest — Testing framework

## 🛠 Project Structure
```bash 
project/
  |-__test__
      |---helpers
          |---mockCli.ts
          |---mockEnv.ts
          |---mockExit.ts
          |---mockFetch.ts
      |---index.test.ts
  |-.github/workflows
      |tests.yml
  |-bin/
      |---tmdb_app           <-- Dev mode entry (ts-node wrapper)
  |-dist/                    <-- Compiled JS (for production)
      |---cli.js
      |---cli.js.map
      |---index.js
      |---index.js.map
  |-src
      |---cli.ts
      |---index.ts           <-- Main CLI logic
  |.env
  |-.gitignore
  |-jest.config.js       
  |-package.json
  |-README.md 
  |-tsconfig.json
```
## ⚙️ Installation
Clone the project:
``` bash 
git clone <repo-url>
cd project 
```
Install dependencies by running:
``` bash
npm install 
```
## 🔐 Environment Variables
Create a .env file in the project root:
``` bash
ACCESSS_TOKEN=your_tmdb_api_token_here
```
This value will automatically load because dotenv/config is required at runtime.
You can get your ACCESS_TOKEN from this [TMDB API](https://developer.themoviedb.org/reference/movie-now-playing-list)

## 🔧 Development Mode (Instant Updates)
Development mode uses a wrapper script that loads TypeScript directly through ts-node, meaning you do NOT need to run tsc every time you make changes.
### 1. Dev wrapper file
`` bin/tmdb-app ``

```bash 
#!/usr/bin/env node
require("ts-node/register");
require("../src/index.ts");
```
Make it executable:
```bash
chmod +x bin/tmdb-app
```
### 2. Link the dev command globally (optional)
```
npm link
```
Now you can run:

```
tmdb-app --type popular
```
#### ✔ Instant updates
Every change in ``./index.ts`` is reflected immediately.
### 🧪 Usage (Development)
```
tmdb-app --type <category>
```
Example:
```
 tmdb-app --type playing
 ```
Output example:
```
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/example.jpg",
      "title": "Some Movie",
      "overview": "Movie description...",
      ...
    }
  ],
  "total_pages": 20,
  "total_results": 398
}
```
### 🎬 Supported Categories
```md
CLI Input	| TMDB Category
____________________________
playing	    |now_playing
popular	    |popular
top	        |top_rated
upcoming	|upcoming
````
Example
```
tmdb-app --type top
```
### 🧩 CLI Logic Explanation
Your TypeScript logic validates:
1. The --type flag
If missing → CLI exits with an error.

2. The category argument
If missing → warns user.

3. If category is valid
If not in one of the allowed categories → exits with a warning.

4. Makes a request to TMDB
Using:
```
fetch(url, {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESSS_TOKEN}`
  }
})
```

## 🧪 Testing Tools Used
This project uses the following testing tools:
- Jest — Unit testing framework
- ts-jest — TypeScript preprocessor for Jest
- supertest (optional if you add HTTP tests)
- Mock implementations for ``console.log``, ``console.error``, and ``process.exit``

To run all tests:
``` bash
npm test
```

To run watch mode:
``` bash
npm run test:watch
```

To run coverage mode:
``` bash
npm run test:coverage
```

## 🏗 Production Build (Optional)
When you're ready to build for production:
1. Compile TypeScript:
```
tsc
```
2. Make the output executable:
```
chmod +x dist/index.js
```
3. Add the production command to package.json:
```
{
  "bin": {
    "tmdb-app": "bin/tmdb-app",
    "tmdb-app-prod": "dist/index.js"
  }
}
```
4. Re-link:
```
npm link
```
Then run:
```
tmdb-app-prod --type popular
```

## 🤝 How to Contribute
Contributions are welcome!
1.  Fork the repository
2. Create a new branch:
`` git checkout -b feature/my-feature`` 
3. Make your changes
4. Run tests to ensure everything passes:
``npm test``
5. Commit and push:
``git push origin feature/my-feature``
6. Create a Pull Request.

Please ensure your code follows the existing coding style and structure.

## 🙏 Acknowledgments
This project uses data provided by [TMDB](https://developer.themoviedb.org/reference/movie-now-playing-list)
.
This product uses the TMDB API but is not endorsed or certified by TMDB.
Big thanks to TMDB for providing an amazing API for movie and TV  data[.](https://roadmap.sh/projects/tmdb-cli)


## 🎉 Final Notes
You now have:

##### ✔ A working TypeScript CLI.
##### ✔ A development command (tmdb-app)
##### ✔ Full flag support (--type)
##### ✔ TMDB movie fetching
##### ✔ Production-ready structure