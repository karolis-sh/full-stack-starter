import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      username: string;
    };
  }
}

// Secret key for signing and verifying JWTs
const JWT_SECRET = 'your-secret-key'; // Replace with a strong, unique secret

// Middleware to check user authentication using JWT
async function authenticateJWT(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      reply.code(401).send({ error: 'Unauthorized - Missing JWT' });
      return;
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET) as { username: string };

    // Check if the user exists in the database (you can add more checks here if needed)
    const user = users.find((user) => user.username === decodedToken.username);
    if (!user) {
      reply.code(401).send({ error: 'Unauthorized - Invalid user' });
      return;
    }

    // Store user information in the request object for later use
    request.user = { username: decodedToken.username };

    // Continue to the next middleware or route handler
    return;
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized - Invalid token' });
  }
}

// Sample in-memory database for storing user data
const users: { username: string; password: string }[] = [];

const app = fastify();

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Register route with JWT token generation
app.post('/register', async (request, reply) => {
  try {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      reply.code(400).send({ error: 'Username already exists' });
      return;
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object and store it in the database
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET);

    reply.code(201).send({ token });
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (request, reply) => {
  try {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    // Find the user by username
    const user = users.find((user) => user.username === username);
    if (!user) {
      reply.code(401).send({ error: 'Unauthorized - Invalid credentials' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      reply.code(401).send({ error: 'Unauthorized - Invalid credentials' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET);

    reply.code(200).send({ token });
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Protected route that requires JWT-based authentication
app.get('/protected', { preHandler: authenticateJWT }, (request, reply) => {
  // If the middleware passed and the user is authenticated, you can access
  // the user information from the request object
  const { username } = request.user;
  reply
    .code(200)
    .send({ message: `Welcome, ${username}! You are authenticated.` });
});

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
