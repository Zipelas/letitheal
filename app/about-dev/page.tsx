import Paragraph from '@/components/Paragraph';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <section className='mx-auto max-w-3xl px-4 py-8'>
        <h1 className='font-bold text-center text-3xl sm:text-4xl mt-10 mb-6 sm:mt-16 sm:mb-8'>
          Om utvecklaren
        </h1>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          Hej! 👋
        </h3>

        <Paragraph className='font-bold'>
          Jag söker jobb som frontendutvecklare.
        </Paragraph>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Jag heter Andreas Fagerlund och bor i Göteborg, men kan tänka mig att
          flytta till Stockholm för rätt tjänst. Jag vill hitta ett jobb där jag
          kan bidra med mina kunskaper, fortsätta utvecklas och vara med på
          resan långsiktigt. I våras avslutade jag en tvåårig utbildning till
          Frontend Developer på Medieinstitutet i Göteborg.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Jag bygger responsiva och användarvänliga webbplatser med HTML, CSS,
          JavaScript, TypeScript, React och Next.js. Jag arbetar även med
          Tailwind CSS, Git/GitHub och integration med REST-API:er.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Jag gillar dessutom kombinationen av design och utveckling. Med Figma,
          wireframes och prototyper arbetar jag med hur en sida både ska se ut
          och fungera. Tillgänglighet ligger mig särskilt varmt om hjärtat:
          tydliga texter och knappar, bra kontraster och gränssnitt där det är
          lätt att hitta rätt.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Utöver frontend har jag erfarenhet av MongoDB och Mongoose samt
          automatiserade tester med Cypress. Det ger mig förståelse för hur
          gränssnitt, data och användarflöden hänger ihop.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Ett exempel är mitt projekt Let it Heal, där jag har arbetat med UX/UI
          och frontendutveckling:
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          <a
            href='https://letitheal.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'>
            👉 https://letitheal.vercel.app/
          </a>
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Som person är jag noggrann, ansvarstagande och gillar ordning, reda
          och struktur – både i koden och i arbetet. Jag tar ansvar för mina
          uppgifter och uppskattar att samarbeta, bolla idéer och lära mig av
          andra. Jag har också med mig arbetslivserfarenhet från andra branscher
          och vet hur mycket ett bra samarbete betyder.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Sport är ett stort intresse. Jag har spelat handboll i över 30 år men
          gillar även att spela pingis. Förutom Blåvitt så ligger Manchester
          United varmt om hjärtat.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Jag uppskattar en arbetsplats där man både hjälper varandra och har
          roligt tillsammans. En gemensam fika eller after work är gärna en del
          av det!
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Söker ditt företag en junior frontendutvecklare, eller känner du någon
          som gör det? Skicka gärna ett privat meddelande. Jag berättar gärna
          mer och skickar mitt CV.
        </p>

        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Tips och delningar uppskattas!
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          /Andreas
        </p>
        <Image
          src='/images/profilbild.jpg'
          alt='Andreas Fagerlund'
          width={500}
          height={500}
          loading='lazy'
          className='mt-4 mx-auto rounded-lg shadow-md'
        />
      </section>
    </>
  );
}
