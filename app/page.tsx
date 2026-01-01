import { getSession } from '@/lib/auth';
import type { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {
  const session: Session | null = await getSession();
  return (
    <>
      <section>
        <h1 className='text-tangerine-calligraphy text-color text-5xl sm:text-8xl font-bold text-center mt-6'>
          Let it Heal
        </h1>
        <Image
          src='/images/banner-cropped.png'
          alt='Hands channeling energy towards a glowing orb, symbolizing healing'
          width={600}
          height={400}
          className='w-[80vw] max-w-3xl sm:w-[95vw] mx-auto my-4 rounded-lg shadow-lg'
        />
        <h2 className='font-bold text-center text-3xl sm:text-4xl mt-10 mb-6 sm:mt-16 sm:mb-8'>
          Välkommen till Let it Heal!
        </h2>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Healing är en alternativ behandlingsform som kan hjälpa till att
          balansera och harmonisera energier i kroppen genom att stärka kroppens
          naturliga läkningsprocess. Detta görs med handpåläggning eller på
          distans.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Healing används till att minska stress och främja mental, fysisk och
          själsligt välmående. Det handlar om att återställa balans, frigöra
          blockeringar och stärka kroppens egna förmåga till återhämtning. Många
          upplever en djup avslappning och att de får en ökad energi efteråt.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Det finns olika healingsmetoder men den som används här på Let it heal
          är Reiki som är en japansk behandlingsmetod.
        </p>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          Vad man kan förvänta sig
        </h3>
        <ul className='text-sm sm:text-base font-medium text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto list-disc list-inside'>
          <li>
            Man kan uppleva en känsla av värme/kyla, lugn och/eller lätthet.
          </li>
          <li>Man hamnar i en djup avslappning, liknande meditation.</li>
          <li>Man kan känna minskad stress, ångest och smärta.</li>
        </ul>
      </section>

      <section id='onSite'>
        <Image
          src='/images/hero-1.png'
          alt='Hero image showing a peaceful healing scene'
          width={600}
          height={400}
          className='w-[95vw] max-w-xl mx-auto my-4 rounded-lg shadow-lg mt-10 mb-6 sm:mt-16 sm:mb-8'
        />
        <h2 className='font-bold text-center text-3xl sm:text-4xl mt-10 mb-6 sm:mt-16 sm:mb-8'>
          Reiki på plats
        </h2>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          Vad är Reiki?
        </h3>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          För 100 år sedan började reikimetoden att användas i Japan, men nu
          finns Reiki utspritt över hela världen. Många länder har integrerat
          Reiki i inom den konventionella vården och i Sverige är det godkänt
          som friskvård.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Reiki är japanska och sammansatt av två ord: rei och ki. Hela ordet
          rei-ki kan t.ex. översättas som ”livsenergi med universellt
          medvetande” eller ”själskraft”. Livsenergin strömmar genom kroppens
          energibanor som kallas meridianer. När energin flödar fritt mår vi
          bra, men när flödet avtar, eller rent av blockeras någonstans,
          försvagas kroppens funktioner och blir det långvarigt kan det fysiska
          och psykiska hälsotillståndet påverkas negativt.
        </p>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          En gåva
        </h3>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Ge dig själv eller någon nära en stund av lugn och avslappning i en
          stillsam miljö. Innan behandlingen har vi ett kort samtal där vi går
          igenom hur du mår och vad du önskar att få ut av behandlingen.
          Behandlingen går till genom handpåläggning där du ligger påklädd på en
          massagebänk. Efter behandlingen så har vi ett ytterligare samtal om
          hur det kändes och om vad som kom upp. Samtidigt får du fylla på med
          vätska vilket är viktigt efteråt.
        </p>
        <div className='m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto mb-6 sm:mb-10'>
          <div className='text-base sm:text-lg font-semibold mb-2'>
            Pris: 899:-
          </div>
          <div className='flex justify-start'>
            {session && (
              <Link
                href='/bookings'
                className='inline-block text-sm sm:text-base bg-[#2e7d32] text-[#f0fff0] px-4 py-2 rounded font-bold hover:bg-[#27642a] transition-colors'>
                BOKA
              </Link>
            )}
          </div>
        </div>
      </section>
      <section id='online'>
        <Image
          src='/images/online.png'
          alt='Person relaxing on a sofa with candles and a fireplace, looking out at a snowy landscape'
          width={600}
          height={400}
          className='w-[95vw] max-w-xl mx-auto my-4 rounded-lg shadow-lg mt-10 mb-6 sm:mt-16 sm:mb-8'
        />
        <h2 className='font-bold text-center text-3xl sm:text-4xl mt-10 mb-6 sm:mt-16 sm:mb-8'>
          Reiki online
        </h2>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Reiki energin kan skickas på avstånd och fördelar med Reiki på distans
          är att man inte behöver gå någonstans. Man kan ta emot Reiki precis
          där man befinner sig. Reiki på distans kan vara lika effektivt som att
          få behandlingen på plats.
        </p>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          Innan och under healingen
        </h3>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Behandlingen är ca 45 minuter. Skapa en lugn och trivsam miljö som t
          ex. på soffan eller i sängen. Använd kuddar och filt om så önskas. För
          att skapa en härlig atmosfär så kan du tända ljus, stänga av
          elektroniska enheter, klä dig i mjuka bekväma kläder och/eller använda
          kristaller. När det är dags att ta emot Reiki ligg bekvämt. Blunda och
          ta flera djupa, långsamma andetag för att slappna av.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Säg högt eller tyst till dig själv &quot;Jag är redo att ta emot
          Reiki-energier&quot;.
          <br />
          Det är allt du behöver göra!
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Det är individuellt hur mottagaren upplever Reiki energierna på
          distans. Majoriteten känner sig väldigt avslappnade och en del kan
          till och med känna stickningar eller en pirrande känsla. Vissa kanske
          börjar gråta eller skratta utan att veta varför. Det är känslomässig
          energi som måste släppas för att du ska läka.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Efter behandlingen kontaktar jag dig med SMS eller e- mail och
          bekräftar att jag är klar.
        </p>
        <h3 className='font-bold text-center text-xl sm:text-2xl mt-6 mb-6 sm:mt-10 sm:mb-10'>
          Efter behandlingen
        </h3>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto'>
          Ta en stund att skriva ner alla tankar som dök upp under din tid, ofta
          kommer de mest gyllene idéerna till dig i tysta stunder. Efter din
          session är det alltid bra att dricka ett glas vatten.
        </p>
        <p className='text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto mb-6 sm:mb-10'>
          Notera allt som kommer upp under de kommande dagarna. Du kanske tänker
          på en viss situation eller person, något som har stört dig som du är
          redo att ta itu med.
        </p>
        <div className='m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto mb-6 sm:mb-10'>
          <div className='text-base sm:text-lg font-semibold mb-2'>
            Pris: 599:-
          </div>
          <div className='flex justify-start'>
            {session && (
              <Link
                href='/bookings'
                className='inline-block text-sm sm:text-base bg-[#2e7d32] text-[#f0fff0] px-4 py-2 rounded font-bold hover:bg-[#27642a] transition-colors'>
                BOKA
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
