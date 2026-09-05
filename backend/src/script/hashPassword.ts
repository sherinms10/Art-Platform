import bcrypt from "bcrypt";

const hashPassword = async () => {
  const password = "@navafArt14";

  const hash = await bcrypt.hash(password, 10);

  console.log("Password hash:");
  console.log(hash);
};

hashPassword();