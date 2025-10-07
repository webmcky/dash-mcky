import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        name,
        email,
        password: hash,
      }
    );

    return new Response(JSON.stringify(user), { status: 201 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}