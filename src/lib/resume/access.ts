import { timingSafeEqual } from 'crypto';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function emailsMatch(input: string, owner: string) {
  const left = Buffer.from(input.trim().toLowerCase());
  const right = Buffer.from(owner.trim().toLowerCase());

  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }

  return timingSafeEqual(left, right);
}

export function ownerEmail() {
  const owner = process.env.RESUME_OWNER_EMAIL?.trim();
  return owner || null;
}
