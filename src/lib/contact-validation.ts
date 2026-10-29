export interface ContactValues {
  email: string;
  message: string;
  name: string;
  verify: string;
}

export type ContactField = "email" | "message" | "name";

export function invalidContactFields(values: Partial<ContactValues>): Array<ContactField> {
  const invalid: Array<ContactField> = [];
  if (
    typeof values.email !== "string" ||
    !/^(?:[A-Za-z0-9_'+-]+\.)*[A-Za-z0-9_'+-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/.test(
      values.email,
    ) ||
    values.email.length > 254
  ) {
    invalid.push("email");
  }
  if (typeof values.name !== "string" || values.name.length < 2) {
    invalid.push("name");
  }
  if (typeof values.message !== "string" || values.message.length < 10) {
    invalid.push("message");
  }
  return invalid;
}
