import { redirect } from 'next/navigation';

export async function navigate(where: string) {
  console.log(where);
  redirect(where);
}
