import Paragraph from '@/components/Paragraph';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <section className='mx-auto max-w-3xl px-4 py-8'>
        <h1 className='font-bold text-center text-3xl sm:text-4xl mt-10 mb-6 sm:mt-16 sm:mb-8'>
          Andreas Fagerlund – frontendutvecklare
        </h1>
        <Paragraph className='font-bold'>
          Jag är utvecklaren bakom Let it Heal och söker nu jobb som
          frontendutvecklare.
        </Paragraph>
        <Paragraph>
          Jag heter Andreas Fagerlund och bor i Göteborg, men kan tänka mig att
          flytta till Stockholm för rätt tjänst. Jag vill hitta ett jobb där jag
          kan bidra med mina kunskaper, fortsätta utvecklas och vara med på
          resan långsiktigt. Våren 2026 avslutade jag en tvåårig utbildning till
          Frontend Developer på Medieinstitutet i Göteborg.
        </Paragraph>
        <Paragraph className='font-bold'>Mina kunskaper</Paragraph>
        <Paragraph>
          Jag bygger responsiva och användarvänliga webbplatser med HTML, CSS,
          JavaScript, TypeScript, React och Next.js. Jag arbetar även med
          Tailwind CSS, Git/GitHub och integration med REST-API:er.
        </Paragraph>
        <Paragraph>
          Jag gillar dessutom kombinationen av design och utveckling. Med Figma,
          wireframes och prototyper arbetar jag med hur en sida både ska se ut
          och fungera. Tillgänglighet ligger mig särskilt varmt om hjärtat:
          tydliga texter och knappar, bra kontraster och gränssnitt där det är
          lätt att hitta rätt.
        </Paragraph>
        <Paragraph>
          Utöver frontend har jag erfarenhet av MongoDB och Mongoose samt
          automatiserade tester med Cypress. Det ger mig förståelse för hur
          gränssnitt, data och användarflöden hänger ihop.
        </Paragraph>
        <Paragraph className='font-bold'>Mitt arbete med Let it Heal</Paragraph>
        <Paragraph>
          Let it Heal är mitt examensarbete, där jag har arbetat med både
          UX/UI-design och frontendutveckling. Jag har tagit fram designsystem,
          wireframes och prototyper i Figma och utvecklat webbplatsen med
          Next.js, TypeScript och Tailwind CSS samt MongoDB och Mongoose för
          datalagring.
        </Paragraph>
        <Paragraph>
          Projektet innehåller bland annat kontoregistrering, inloggning och
          bokning av healing. Genom arbetet har jag fått omsätta design till
          fungerande gränssnitt, med fokus på responsivitet och
          webbtillgänglighet.
        </Paragraph>
        <Paragraph className='font-bold'>Jag som kollega</Paragraph>
        <Paragraph>
          Som person är jag noggrann, ansvarstagande och gillar ordning, reda
          och struktur – både i koden och i arbetet. Jag tar ansvar för mina
          uppgifter och uppskattar att samarbeta, bolla idéer och lära mig av
          andra. Jag har också med mig arbetslivserfarenhet från andra branscher
          och vet hur mycket ett bra samarbete betyder.
        </Paragraph>
        <Paragraph>
          Sport är ett stort intresse. Jag har spelat handboll i över 30 år men
          gillar även att spela pingis. Förutom Blåvitt så ligger Manchester
          United varmt om hjärtat.
        </Paragraph>
        <Paragraph>
          Jag uppskattar en arbetsplats där man både hjälper varandra och har
          roligt tillsammans. En gemensam fika eller after work är gärna en del
          av det!
        </Paragraph>
        <Paragraph className='font-bold'>
          Söker du en frontendutvecklare?
        </Paragraph>
        <Paragraph>
          Jag söker en junior roll i Göteborg eller Stockholm där jag får bidra,
          ta ansvar och fortsätta utvecklas tillsammans med ett team. Hör gärna
          av dig om du vill veta mer om mig eller prata om en möjlighet hos er.
        </Paragraph>
        <Paragraph>
          Se mitt CV här:{' '}
          <a
            href='/documents/cv.pdf'
            className='text-blue-500 underline'>
            Ladda ner CV
          </a>
        </Paragraph>
        <Paragraph>
          Besök min GitHub för att se exempel på projekt jag har arbetat med:{' '}
          <a
            href='https://github.com/Zipelas'
            className='text-blue-500 underline'
            target='_blank'
            rel='noopener noreferrer'>
            GitHub
          </a>
        </Paragraph>
        <Paragraph>
          Kontakta mig gärna via e-post:{' '}
          <a
            href='mailto:andreasfagerlund@hotmail.com'
            className='text-blue-500 underline'>
            andreasfagerlund@hotmail.com
          </a>
        </Paragraph>
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
