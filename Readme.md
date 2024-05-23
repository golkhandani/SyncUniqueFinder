## Question!

  Write a function that
  - takes in an array of filepaths as parameter
  - return a list of unique emails that don't belong to sync.com
  Note: 
  The filepaths and paths to actual files, 
  for example:
  /home/surya/emailfiles/file1.txt 
  and 
  /home/surya/emailfiles/file2.txt.
  And these files contain email addresses. 
  One address per line.

## Function explanation
test

The `findUniqueEmails` function uses a set to store final result of unique email addresses. Using a set ensures that duplicate email addresses are automatically eliminated.

The function uses asynchronous iteration to process file content line by line. Asynchronous iteration allows the function to handle large files without blocking, will result in improving performance.

By using asynchronous iteration and concurrency with Promise.allSettled, the function can process multiple files concurrently.

If there are any issues during this process, such as invalid email formats or file not found errors, it collect these errors for later handling.

## How to run?

To run this code, you'll need the following:

### Node.js

Download and install `Node.js > v18.13.0` from the official website (https://nodejs.org/en). 

### Install dependencies

Use command below to install dependencies

```cmd
npm install
```

## Available Scripts

#### `build`

Runs the TypeScript compiler (`tsc`) to compile the TypeScript files into JavaScript files.

#### `start:prod`

Performs the following tasks:
1. Removes the existing `build` directory.
2. Builds the project by executing the `build` script.
3. Starts the application in production mode by running the compiled `index.js` file with gc tracing enabled.

#### `start:dev`

Starts the application in development mode using `nodemon`, which automatically restarts the server when changes are detected in the source files.

#### `test`

Executes the tests written in TypeScript located in the `test` directory. It requires `ts-node` to compile TypeScript files on the fly before running the tests.