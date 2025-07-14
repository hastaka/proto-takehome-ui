import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return <section className='flex grow items-center justify-center'>
      <SignIn />;
      </section>
}
