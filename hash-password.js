import bcrypt from 'bcrypt';

async function hashPassword() {
  const plainPassword = 'hashed_password';  // Replace with your plain password (e.g., 'hashed_password')
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed password:", hashed);
}

hashPassword();
