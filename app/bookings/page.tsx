export default function BookingsPage() {
  return (
    <div className='fixed inset-0 z-30 flex items-start justify-center backdrop-blur-sm bg-black/20 overflow-y-auto p-4'>
      <section className='relative border-2 border-[#2e7d32] rounded-xl max-w-md w-full mx-auto p-6 bg-(--background) shadow-lg my-8 max-h-[90vh] overflow-y-auto'>
        <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>Boka tid</h1>
        <form className='flex flex-col gap-3'>
          <label className='flex flex-col'>
            <span className='mb-1'>Förnamn</span>
            <input
              name='firstName'
              className='border border-[#2e7d32] rounded-md p-2'
              placeholder='Peter'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-1'>Efternamn</span>
            <input
              name='lastName'
              className='border border-[#2e7d32] rounded-md p-2'
              placeholder='Andersson'
            />
          </label>
          <button
            type='submit'
            className='login-button font-medium'>
            Fortsätt
          </button>
        </form>
      </section>
    </div>
  );
}
