export default function Page() {
  return (
    <section className='mx-auto max-w-3xl px-4 py-8'>
      <h1>Om utvecklaren</h1>
      <p>&nbsp;</p>
      <h2>Hej! 👋</h2>
      <p>&nbsp;</p>

      <p className='mb-4'>Jag söker jobb som frontendutvecklare.</p>

      <p className='mb-4'>
        Jag heter Andreas Fagerlund och bor i Göteborg, men kan tänka mig att
        flytta till Stockholm för rätt tjänst. Jag vill hitta ett jobb där jag
        kan bidra med mina kunskaper, fortsätta utvecklas och vara med på resan
        långsiktigt. I våras avslutade jag en tvåårig utbildning till Frontend
        Developer på Medieinstitutet i Göteborg.
      </p>

      <p className='mb-4'>
        Jag bygger responsiva och användarvänliga webbplatser med HTML, CSS,
        JavaScript, TypeScript, React och Next.js. Jag arbetar även med Tailwind
        CSS, Git/GitHub och integration med REST-API:er.
      </p>

      <p className='mb-4'>
        Jag gillar dessutom kombinationen av design och utveckling. Med Figma,
        wireframes och prototyper arbetar jag med hur en sida både ska se ut och
        fungera. Tillgänglighet ligger mig särskilt varmt om hjärtat: tydliga
        texter och knappar, bra kontraster och gränssnitt där det är lätt att
        hitta rätt.
      </p>

      <p className='mb-4'>
        Utöver frontend har jag erfarenhet av MongoDB och Mongoose samt
        automatiserade tester med Cypress. Det ger mig förståelse för hur
        gränssnitt, data och användarflöden hänger ihop.
      </p>

      <p className='mb-4'>
        Ett exempel är mitt projekt Let it Heal, där jag har arbetat med UX/UI
        och frontendutveckling:
      </p>

      <p className='mb-4'>
        <a
          href='https://letitheal.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'>
          👉 https://letitheal.vercel.app/
        </a>
      </p>

      <p className='mb-4'>
        Som person är jag noggrann, ansvarstagande och gillar ordning, reda och
        struktur – både i koden och i arbetet. Jag tar ansvar för mina uppgifter
        och uppskattar att samarbeta, bolla idéer och lära mig av andra. Jag har
        också med mig arbetslivserfarenhet från andra branscher och vet hur
        mycket ett bra samarbete betyder.
      </p>

      <p className='mb-4'>
        Sport är ett stort intresse. Jag har spelat handboll i över 30 år men
        gillar även att spela pingis. Förutom Blåvitt så ligger Manchester
        United varmt om hjärtat.
      </p>

      <p className='mb-4'>
        Jag uppskattar en arbetsplats där man både hjälper varandra och har
        roligt tillsammans. En gemensam fika eller after work är gärna en del av
        det!
      </p>

      <p className='mb-4'>
        Söker ditt företag en junior frontendutvecklare, eller känner du någon
        som gör det? Skicka gärna ett privat meddelande. Jag berättar gärna mer
        och skickar mitt CV.
      </p>

      <p className='mb-4'>Tips och delningar uppskattas!</p>
      <p>/Andreas</p>
      <p>
        <img
          src='/images/profilbild.jpg'
          alt='Andreas Fagerlund'
          loading='lazy'
          className='mt-4 rounded-lg shadow-md mx-auto block'
          align='center'
        />
      </p>
    </section>
  );
}
