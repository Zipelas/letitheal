import Image from 'next/image';
const page = () => {
  return (
    <section>
      <h1 className='text-tangerine-calligraphy text-color font-bold text-center'>
        Let it Heal
      </h1>
      <Image
        src='/hero-1.png'
        alt='Hero image'
        width={600}
        height={1400}
        className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
      />
      <p className='text-center text-color m-4 px-4'>
        Välkommen till Let it Heal! Här kan du hitta information om healing, med
        fokus på Reiki, en holistisk japansk behandlingsmetod som syftar till
        stressreducering, avslappning och andlig läkning.
      </p>
    </section>
  );
};

export default page;
