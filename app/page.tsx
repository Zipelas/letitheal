import Image from 'next/image';
const page = () => {
  return (
    <>
      <section>
        <h1 className='text-tangerine-calligraphy text-color font-bold text-center'>
          Let it Heal
        </h1>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-center text-color m-4 px-4'>
          Välkommen till Let it Heal! Här kan du hitta information om healing,
          med fokus på Reiki, en holistisk japansk behandlingsmetod som syftar
          till stressreducering, avslappning och andlig läkning.
        </p>
      </section>

      <section id='onSite'>
        <h2 className='font-bold text-center'>Healing på plats</h2>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-center text-color m-4 px-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ea,
          soluta fugit molestias iusto aliquam id deleniti tempora minus omnis
          adipisci praesentium officiis repudiandae earum cumque pariatur vel!
          Laboriosam, ratione?
        </p>
      </section>
      <section id='online'>
        <h2 className='font-bold text-center'>Healing online</h2>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='hero-1 mx-auto my-4 rounded-lg shadow-lg'
        />
        <p className='text-center text-color m-4 px-4'>
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
