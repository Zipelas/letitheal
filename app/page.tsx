import Image from 'next/image';
const page = () => {
  return (
    <>
      <section>
        <h1 className='text-tangerine-calligraphy text-color text-5xl sm:text-8xl font-bold text-center mt-6'>
          Let it Heal
        </h1>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-sm sm:text-base text-center text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Välkommen till Let it Heal! Här kan du hitta information om healing,
          med fokus på Reiki, en holistisk japansk behandlingsmetod som syftar
          till stressreducering, avslappning och andlig läkning.
        </p>
      </section>

      <section id='onSite'>
        <h2 className='font-bold text-center text-3xl sm:text-4xl'>
          Healing på plats
        </h2>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-sm sm:text-base text-center text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ea,
          soluta fugit molestias iusto aliquam id deleniti tempora minus omnis
          adipisci praesentium officiis repudiandae earum cumque pariatur vel!
          Laboriosam, ratione?
        </p>
      </section>
      <section id='online'>
        <h2 className='font-bold text-center text-3xl sm:text-4xl'>
          Healing online
        </h2>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-sm sm:text-base text-center text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ea,
          soluta fugit molestias iusto aliquam id deleniti tempora minus omnis
          adipisci praesentium officiis repudiandae earum cumque pariatur vel!
          Laboriosam, ratione?
        </p>
      </section>
    </>
  );
};

export default page;
